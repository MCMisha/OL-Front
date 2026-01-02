import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {forkJoin, Subscription, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminPerformanceInfoService} from "../../../../../services/admin/admin-performance-info.service";
import {Implementer} from "../../../../../models/implementer";
import {AdminPerformanceService} from "../../../../../services/admin/admin-performance.service";

@Component({
  selector: 'app-admin-performance-edit-implementers',
  templateUrl: './admin-panel-performance-edit-implementers.component.html',
  styleUrls: ['./admin-panel-performance-edit-implementers.component.scss']
})
export class AdminPanelPerformanceEditImplementersComponent implements OnInit, OnDestroy {
  performanceId!: number;
  isLoading = true;
  form = this.fb.group({
    implementers: this.fb.array<FormGroup>([])
  });
  performanceName = '';
  private subscription = new Subscription();

  get implementersFA() {
    return this.form.get('implementers') as FormArray<FormGroup>;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private adminPerformanceInfoService: AdminPerformanceInfoService,
    private adminPerformanceService: AdminPerformanceService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.subscribe(pm => {
        this.performanceId = Number(pm.get('id'));
        this.load();
        this.loadPerformanceName();
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  load() {
    this.adminPerformanceInfoService.getImplementers(this.performanceId).subscribe(items => {
      this.implementersFA.clear();
      items.forEach(i => this.implementersFA.push(this.createRow(i)));
    });
  }

  loadPerformanceName() {
    this.adminPerformanceService.getPerformanceById(this.performanceId).subscribe(p => {
      this.performanceName = p.title!;
    });
  }

  createRow(i?: Implementer) {
    return this.fb.group({
      id: [i?.id ?? 0],
      firstName: [i?.firstName ?? '', Validators.required],
      lastName: [i?.lastName ?? '', Validators.required],
      role: [i?.role ?? '', Validators.required]
    });
  }

  addRow() {
    this.implementersFA.push(this.createRow());
  }

  removeRow(index: number) {
    const row = this.implementersFA.at(index);
    const id = row.get('id')?.value;
    if (!id) {
      this.implementersFA.removeAt(index);
      return;
    }
    this.isLoading = true;
    this.adminPerformanceInfoService.deleteImplementer(this.performanceId, id).subscribe(() => {
      this.implementersFA.removeAt(index);
      this.load();
      this.isLoading = false;
    });
  }

  saveNewOnly() {
    const newOnes = this.implementersFA.controls
      .map(c => c.value as any)
      .filter(x => !x.id);

    if (!newOnes.length) return;

    this.isLoading = true;
    this.adminPerformanceInfoService.addImplementers(this.performanceId, {implementers: newOnes}).subscribe(_ => {
      this.load();
      this.isLoading = false;
    });
  }

  saveRow(i: number) {
    const row = this.implementersFA.at(i);
    if (row.invalid) {
      row.markAllAsTouched();
      return;
    }

    const id = row.get('id')?.value as number | null;
    const payload = row.value as any;

    if (!id) return;
    this.isLoading = true;
    this.adminPerformanceInfoService.updateImplementer(this.performanceId, id, payload).subscribe(updated => {
      row.patchValue(updated, { emitEvent: false });
      row.markAsPristine();
      this.isLoading = false;
    });
  }

  saveAllExisting() {
    const updates = this.implementersFA.controls
      .filter(c => !!c.get('id')?.value && c.dirty); // только существующие и изменённые

    if (!updates.length) return;
    this.isLoading = true;
    forkJoin(
      updates.map(c => {
        const id = c.get('id')!.value;
        return this.adminPerformanceInfoService.updateImplementer(this.performanceId, id, c.value as any)
          .pipe(tap(updated => {
            c.patchValue(updated, { emitEvent: false });
            c.markAsPristine();
          }));
      })
    ).subscribe(_ => {
      this.isLoading = false;
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route }); // вернёт на /edit
  }
}
