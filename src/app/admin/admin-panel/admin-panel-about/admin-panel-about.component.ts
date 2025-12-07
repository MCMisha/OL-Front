import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminAboutService} from "../../../services/admin/admin-about.service";
import {Subscription} from "rxjs";
import {AboutSectionList} from "../../../models/about-section-list";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {DialogConfirmComponent} from "../../../shared/dialog-confirm/dialog-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-panel-about',
  templateUrl: './admin-panel-about.component.html',
  styleUrl: './admin-panel-about.component.scss'
})
export class AdminPanelAboutComponent implements OnInit, OnDestroy {
  sections: AboutSectionList[] = [];
  subscription = new Subscription();

  constructor(
    private service: AdminAboutService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.service.getAboutSectionList().subscribe(x => this.sections = x)
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {message: 'Czy na pewno chcesz usunąć ten element?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
    });
  }

  private delete(id: number) {
    this.service.deleteAboutSection(id).subscribe(() => {
      this.sections = this.sections.filter(s => s.id !== id);
      this.ngOnInit();
    });
  }

  protected drop($event: CdkDragDrop<any[]>) {
    moveItemInArray(this.sections, $event.previousIndex, $event.currentIndex);

    const payload = this.sections.map((s, i) => ({
      id: s.id,
      order: i
    }));

    this.service.updateOrder(payload).subscribe(() => {
      this.ngOnInit();
    });
  }
}
