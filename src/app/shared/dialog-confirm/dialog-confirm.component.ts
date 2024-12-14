import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html'
})
export class DialogConfirmComponent {

  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

  onNoClick(): void {
    this.dialogRef.close(false); // Возвращаем false, если пользователь нажал "Nie"
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Возвращаем true, если пользователь нажал "Tak"
  }

}
