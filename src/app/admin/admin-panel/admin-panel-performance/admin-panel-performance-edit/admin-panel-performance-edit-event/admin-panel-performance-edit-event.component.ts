import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminPerformanceService} from "../../../../../services/admin/admin-performance.service";
import {Subscription} from "rxjs";
import {AdminPerformanceEventService} from "../../../../../services/admin/admin-performance-event.service";
import {EventRow} from "../../../../../models/event-row";

@Component({
  selector: 'app-admin-panel-performance-edit-events',
  templateUrl: './admin-panel-performance-edit-event.component.html',
  styleUrl: './admin-panel-performance-edit-event.component.scss'
})
export class AdminPanelPerformanceEditEventComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  private perfEventService = inject(AdminPerformanceEventService);
  private perfService = inject(AdminPerformanceService);

  sub = new Subscription();
  isLoading = false;

  performanceId = 0;
  performanceName = '';

  form = this.fb.group({
    events: this.fb.array<FormGroup>([])
  });

  get eventsFA(): FormArray<FormGroup> {
    return this.form.get('events') as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    this.performanceId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    if (!this.performanceId) {
      this.snack.open('Brak performanceId w URL', 'Zamknij', { duration: 4000 });
      this.back();
      return;
    }

    this.loadPerformanceName();
    this.loadEvents();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  back(): void {
    // подстрой под свою навигацию
    this.router.navigate(['../../..'], { relativeTo: this.route });
  }

  addRow(patch?: Partial<EventRow>): void {
    const g = this.fb.group({
      id: [patch?.id ?? null],
      date: [patch?.date ?? null, Validators.required],
      time: [patch?.time ?? '', [Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)]],
      buyLink: [patch?.buyLink ?? ''],
      isActive: [patch?.isActive ?? true]
    });

    this.eventsFA.push(g);
  }

  removeRow(index: number): void {
    this.eventsFA.removeAt(index);
  }

  hasDuplicateDateTimes(): boolean {
    const keys = new Set<string>();
    for (const ctrl of this.eventsFA.controls) {
      const d: Date | null = ctrl.get('date')?.value ?? null;
      const t: string = ctrl.get('time')?.value ?? '';
      if (!d || !t) continue;

      const key = `${this.formatDateKey(d)}_${t}`;
      if (keys.has(key)) return true;
      keys.add(key);
    }
    return false;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snack.open('Uzupełnij wymagane pola', 'Zamknij', { duration: 4000 });
      return;
    }

    if (this.hasDuplicateDateTimes()) {
      this.snack.open('Masz duplikaty daty/godziny – usuń powtórzenia', 'Zamknij', { duration: 5000 });
      return;
    }

    const payload = this.eventsFA.controls.map(ctrl => ({
      startAt: this.combineLocalDateAndTimeToUtcIso(
        ctrl.get('date')!.value,
        ctrl.get('time')!.value
      ),
      buyLink: ctrl.get('buyLink')!.value,
      isActive: ctrl.get('isActive')!.value
    }));

    this.isLoading = true;

    this.sub.add(
      this.perfEventService.replaceEvents(this.performanceId, payload).subscribe({
        next: () => {
          this.snack.open('Zapisano terminy', 'Zamknij', { duration: 3000 });
          this.isLoading = false;
          this.loadEvents();
        },
        error: (err) => {
          console.error('SAVE EVENTS ERROR', err);
          const status = err?.status ?? '??';
          const text =
            err?.error?.errors ? JSON.stringify(err.error.errors) :
              err?.error?.title ? err.error.title :
                (typeof err?.error === 'string' ? err.error : 'Błąd zapisu');

          this.snack.open(`Błąd (${status}): ${text}`, 'Zamknij', { duration: 8000 });
          this.isLoading = false;
        }
      })
    );
  }

  private loadPerformanceName(): void {
    this.sub.add(
      this.perfService.getPerformanceById(this.performanceId).subscribe({
        next: (p: any) => this.performanceName = p?.title ?? '',
        error: () => this.performanceName = ''
      })
    );
  }

  private loadEvents(): void {
    this.isLoading = true;

    this.sub.add(
      this.perfEventService.getEventsByPerformance(this.performanceId).subscribe({
        next: (events: any[]) => {
          this.eventsFA.clear();

          // ожидаем от API startAt (ISO) + buyLink + isActive + id
          // сортируем по времени
          (events ?? [])
            .slice()
            .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
            .forEach(e => {
              const dt = new Date(e.startAt);
              this.addRow({
                id: e.id ?? null,
                date: this.toLocalDateOnly(dt),
                time: this.toLocalTimeHHmm(dt),
                buyLink: e.buyLink ?? '',
                isActive: e.isActive ?? true
              });
            });

          this.isLoading = false;
        },
        error: () => {
          this.eventsFA.clear();
          this.isLoading = false;
        }
      })
    );
  }

  // helpers

  private toLocalDateOnly(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  private toLocalTimeHHmm(d: Date): string {
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  private formatDateKey(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private combineLocalDateAndTimeToUtcIso(date: Date, time: string): string {
    const [hh, mm] = time.split(':').map(x => Number(x));
    const local = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hh, mm, 0, 0);
    return local.toISOString(); // -> UTC "...Z"
  }
}
