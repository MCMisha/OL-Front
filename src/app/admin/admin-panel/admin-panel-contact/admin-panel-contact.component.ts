import {Component, OnDestroy, OnInit} from '@angular/core';
import {SectionList} from "../../../models/section-list";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../../shared/dialog-confirm/dialog-confirm.component";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {AdminContactService} from "../../../services/admin/admin-contact.service";

@Component({
  selector: 'app-admin-panel-contact',
  templateUrl: './admin-panel-contact.component.html',
  styleUrl: './admin-panel-contact.component.scss'
})
export class AdminPanelContactComponent implements OnInit, OnDestroy {
  sections: SectionList[] = [];
  subscription = new Subscription();

  constructor(
    private service: AdminContactService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.service.getContactSectionList().subscribe(x => this.sections = x)
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
    this.service.deleteContactSection(id).subscribe(() => {
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

  protected setAsMain(id: number) {
    this.subscription.add(this.service.updateMain(id).subscribe(_ => this.ngOnInit()));
  }
}
