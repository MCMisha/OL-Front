import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArtistOption} from "../../../../../models/artist-option";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminPerformanceCastService} from "../../../../../services/admin/admin-performance-cast.service";
import {Subscription} from "rxjs";
import {AdminArtistService} from "../../../../../services/admin/admin-artist.service";
import {switchMap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CastRowView} from "../../../../../models/cast-row-view";
import {AdminPerformanceService} from "../../../../../services/admin/admin-performance.service";

@Component({
  selector: 'app-admin-panel-performance-edit-artist',
  templateUrl: './admin-panel-performance-edit-artist.component.html',
  styleUrl: './admin-panel-performance-edit-artist.component.scss'
})
export class AdminPanelPerformanceEditArtistComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);
  performanceName!: string;
  performanceId!: number;
  isLoading = false;

  artists: ArtistOption[] = [];

  private sub = new Subscription();

  form = this.fb.group({
    cast: this.fb.array<FormGroup>([])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private castService: AdminPerformanceCastService,
    private adminPerformanceService: AdminPerformanceService,
    private artistsService: AdminArtistService
  ) {
  }

  ngOnInit(): void {
    this.sub.add(
      this.route.paramMap
        .pipe(
          switchMap(params => {
            this.performanceId = Number(params.get('id')); // если param другой — поменяй тут
            this.isLoading = true;

            return this.artistsService.getArtists().pipe(
              switchMap((artists) => {
                this.artists = (artists ?? []).map((a: any) => ({
                  id: a.id,
                  fullName: a.fullName ?? a.name ?? `${a.firstName ?? ''} ${a.lastName ?? ''}`.trim()
                }));
                return this.castService.getCast(this.performanceId);
              })
            );
          })
        )
        .subscribe({
          next: (cast) => {
            this.setCast(cast ?? []);
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            this.snack.open(`Błąd podczas pobierania obsady: ${err?.error ?? err}`, 'Zamknij', {duration: 7000});
          }
        })
    );
    this.loadPerformanceName();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get castFA(): FormArray<FormGroup> {
    return this.form.get('cast') as FormArray<FormGroup>;
  }

  private buildRow(artistId: number | null = null, role: string = '', existing = true): FormGroup {
    return this.fb.group({
      artistId: [{value: artistId, disabled: existing}, Validators.required],
      role: [{value: role, disabled: existing}, [Validators.required, Validators.maxLength(120)]],
      existing: [existing]
    });
  }

  private setCast(cast: CastRowView[]): void {
    this.castFA.clear();

    if (cast.length === 0) {
      this.castFA.push(this.buildRow(null, '', false));
      return;
    }

    cast.forEach(row => this.castFA.push(this.buildRow(row.artistId, row.role, true)));
  }

  loadPerformanceName() {
    this.sub.add(
      this.adminPerformanceService.getPerformanceById(this.performanceId).subscribe(p => {
        this.performanceName = p.title!;
      })
    );
  }

  private load(): void {
    this.isLoading = true;

    this.sub.add(
      this.castService.getCast(this.performanceId).subscribe({
        next: (cast) => {
          this.setCast(cast ?? []);
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.snack.open(`Błąd odświeżania: ${err?.error ?? err}`, 'Zamknij', {duration: 7000});
        }
      })
    );
  }

  addRow(): void {
    this.castFA.push(this.buildRow(null, '', false));
  }

  removeRow(index: number): void {
    const row = this.castFA.at(index);
    const artistId = row.get('artistId')?.value;
    const existing = row.get('existing')?.value === true;

    if (!existing || !artistId) {
      this.castFA.removeAt(index);
      return;
    }

    this.isLoading = true;
    this.sub.add(
      this.castService.deleteCast(this.performanceId, Number(artistId)).subscribe({
        next: () => {
          this.castFA.removeAt(index);
          this.isLoading = false;
          this.snack.open('Usunięto pozycję obsady.', 'OK', {duration: 3000});
        },
        error: (err) => {
          this.isLoading = false;
          this.snack.open(`Błąd usuwania: ${err?.error ?? err}`, 'Zamknij', {duration: 7000});
        }
      })
    );
  }

  saveNew(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snack.open('Popraw błędy w formularzu.', 'Zamknij', {duration: 6000});
      return;
    }

    const payload = this.castFA.controls
      .filter(c => c.get('existing')?.value === false)
      .map(c => ({
        artistId: Number(c.get('artistId')?.value),
        role: String(c.get('role')?.value ?? '').trim()
      }));

    if (payload.length === 0) {
      this.snack.open('Nie ma nowych pozycji do zapisania.', 'OK', {duration: 3000});
      return;
    }

    const existingIds = new Set<number>(
      this.castFA.controls
        .filter(c => c.get('existing')?.value === true)
        .map(c => Number(c.get('artistId')?.value))
    );
    for (const p of payload) {
      if (existingIds.has(p.artistId)) {
        this.snack.open('Ten artysta jest już dodany do obsady.', 'Zamknij', {duration: 6000});
        return;
      }
    }

    this.isLoading = true;
    this.sub.add(
      this.castService.addCast(this.performanceId, payload).subscribe({
        next: () => {
          this.castFA.controls.forEach(c => {
            if (c.get('existing')?.value === false) c.get('existing')?.setValue(true);
          });

          this.snack.open('Zapisano obsadę.', 'OK', {duration: 3500});
          this.load();
        },
        error: (err) => {
          this.isLoading = false;
          this.snack.open(`Błąd zapisu: ${err?.error ?? err}`, 'Zamknij', {duration: 7000});
        }
      })
    );
  }

  displayArtistName(id: number): string {
    return this.artists.find(a => a.id === id)?.fullName ?? `#${id}`;
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route }); // вернёт на /edit
  }
}
