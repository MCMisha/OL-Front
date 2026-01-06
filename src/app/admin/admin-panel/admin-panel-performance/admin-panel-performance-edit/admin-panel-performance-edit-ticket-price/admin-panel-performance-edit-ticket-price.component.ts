import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, switchMap } from 'rxjs';
import { AdminTicketPriceService } from '../../../../../services/admin/admin-ticket-price.service';
import { TicketType } from "../../../../../models/enums/ticket-type.enum";
import {TicketPrice} from "../../../../../models/ticket-price";
import {TicketPriceGroup} from "../../../../../models/ticket-price-group";
import {AdminPerformanceService} from "../../../../../services/admin/admin-performance.service";

@Component({
  selector: 'app-admin-panel-performance-edit-ticket-price',
  templateUrl: './admin-panel-performance-edit-ticket-price.component.html',
  styleUrl: './admin-panel-performance-edit-ticket-price.component.scss'
})
export class AdminPanelPerformanceEditTicketPriceComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  performanceName!: string;
  performanceId!: number;
  isLoading = false;

  private sub = new Subscription();

  readonly ticketTypeOptions: { value: TicketType; label: string }[] = [
    { value: TicketType.Normal, label: 'Normalny' },
    { value: TicketType.Discount, label: 'Ulgowy' }
  ];

  form = this.fb.group({
    groups: this.fb.array<FormGroup>([])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminTicketPriceService: AdminTicketPriceService,
    private adminPerformanceService: AdminPerformanceService
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.route.paramMap
        .pipe(
          switchMap(params => {
            this.performanceId = Number(params.get('id'));
            this.isLoading = true;
            return this.adminTicketPriceService.getByPerformance(this.performanceId);
          })
        )
        .subscribe({
          next: (groups) => {
            this.setGroups(groups ?? []);
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            this.snack.open(`Błąd podczas pobierania cen: ${err?.error ?? err}`, 'Zamknij', { duration: 6000 });
          }
        })
    );
    this.loadPerformanceName();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get groupsFA(): FormArray<FormGroup> {
    return this.form.get('groups') as FormArray<FormGroup>;
  }

  pricesFA(groupIndex: number): FormArray<FormGroup> {
    return this.groupsFA.at(groupIndex).get('prices') as FormArray<FormGroup>;
  }

  loadPerformanceName() {
    this.sub.add(
      this.adminPerformanceService.getPerformanceById(this.performanceId).subscribe(p => {
        this.performanceName = p.title!;
      })
    );
  }

  // ---------- form builders ----------
  private buildPriceRow(type: TicketType = TicketType.Normal, amount: number | null = null): FormGroup {
    return this.fb.group({
      type: [type, Validators.required],
      amount: [amount, [Validators.required, Validators.min(0)]]
    });
  }

  private buildGroupRow(name = '', sortOrder = 1, prices: TicketPrice[] = []): FormGroup {
    const pricesFA = this.fb.array<FormGroup>([]);
    if (prices.length === 0) {
      pricesFA.push(this.buildPriceRow(TicketType.Normal, null));
    } else {
      prices.forEach(p => pricesFA.push(this.buildPriceRow(p.type, p.amount)));
    }

    return this.fb.group({
      name: [name, [Validators.required, Validators.maxLength(120)]],
      sortOrder: [sortOrder, [Validators.required, Validators.min(1)]],
      prices: pricesFA
    });
  }

  private setGroups(groups: TicketPriceGroup[]): void {
    this.groupsFA.clear();
    const sorted = [...groups].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

    if (sorted.length === 0) {
      this.groupsFA.push(this.buildGroupRow('Sektor I', 1, [
        { type: TicketType.Normal, amount: 0 },
        { type: TicketType.Discount, amount: 0 }
      ]));
      return;
    }

    sorted.forEach(g => this.groupsFA.push(this.buildGroupRow(g.name, g.sortOrder, g.prices)));
  }

  addGroup(): void {
    const nextOrder = this.groupsFA.length + 1;
    this.groupsFA.push(this.buildGroupRow(`Sektor ${nextOrder}`, nextOrder, [
      { type: TicketType.Normal, amount: 0 },
      { type: TicketType.Discount, amount: 0 }
    ]));
  }

  removeGroup(index: number): void {
    this.groupsFA.removeAt(index);
    this.recalculateSortOrders();
  }

  private recalculateSortOrders(): void {
    for (let i = 0; i < this.groupsFA.length; i++) {
      this.groupsFA.at(i).get('sortOrder')?.setValue(i + 1);
    }
  }

  // ---------- actions: prices ----------
  addPriceRow(groupIndex: number): void {
    const fa = this.pricesFA(groupIndex);

    // выбираем тип, которого ещё нет (чтобы было удобно)
    const used = new Set<number>(fa.controls.map(c => Number(c.get('type')?.value)));
    const candidate = this.ticketTypeOptions.find(o => !used.has(o.value))?.value;

    fa.push(this.buildPriceRow(candidate ?? TicketType.Normal, 0));
  }

  removePriceRow(groupIndex: number, priceIndex: number): void {
    this.pricesFA(groupIndex).removeAt(priceIndex);
  }

  // ---------- validation helpers ----------
  hasDuplicateTypes(groupIndex: number): boolean {
    const fa = this.pricesFA(groupIndex);
    const types = fa.controls.map(c => Number(c.get('type')?.value));
    return new Set(types).size !== types.length;
  }

  // ---------- save ----------
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snack.open('Formularz zawiera błędy. Popraw pola i spróbuj ponownie.', 'Zamknij', { duration: 6000 });
      return;
    }

    // проверка дублей типов в каждой группе
    for (let i = 0; i < this.groupsFA.length; i++) {
      if (this.hasDuplicateTypes(i)) {
        this.snack.open('W jednej grupie nie można dodać dwóch cen o tym samym typie (np. dwa razy "Normalny").', 'Zamknij', { duration: 7000 });
        return;
      }
    }

    const payload = this.toDto();
    this.isLoading = true;

    this.sub.add(
      this.adminTicketPriceService.update(this.performanceId, payload).subscribe({
        next: () => {
          this.isLoading = false;
          this.snack.open('Zapisano ceny biletów.', 'OK', { duration: 3500 });
        },
        error: (err) => {
          this.isLoading = false;
          this.snack.open(`Błąd podczas zapisu: ${err?.error ?? err}`, 'Zamknij', { duration: 7000 });
        }
      })
    );
  }

  private toDto(): TicketPriceGroup[] {
    const groups = this.groupsFA.controls.map((g, idx) => {
      const name = String(g.get('name')?.value ?? '').trim();
      const sortOrder = Number(g.get('sortOrder')?.value ?? (idx + 1));

      const pricesFa = g.get('prices') as FormArray<FormGroup>;
      const prices: TicketPrice[] = pricesFa.controls.map(p => ({
        type: Number(p.get('type')?.value) as TicketType,
        amount: Number(p.get('amount')?.value)
      }));

      return { name, sortOrder, prices };
    });

    return groups.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route }); // вернёт на /edit
  }
}
