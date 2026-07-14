import {AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Subject, Subscription, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {AdminMainPageBackgroundService} from "../../../services/admin/admin-main-page-background.service";
import {DialogConfirmComponent} from "../../../shared/dialog-confirm/dialog-confirm.component";
import {AdminMainPageBackgroundDto} from "../../../models/admin-main-page-background-dto";

@Component({
  selector: 'app-admin-panel-slider',
  templateUrl: './admin-panel-slider.component.html',
  styleUrl: './admin-panel-slider.component.scss'
})
export class AdminPanelSliderComponent implements OnInit, AfterViewInit, OnDestroy {
  mainPageBackgrounds: AdminMainPageBackgroundDto[] = [];
  selectedRowIndex: any;
  selectedRow?: AdminMainPageBackgroundDto;
  protected dataSourceWithPageSize = new MatTableDataSource(this.mainPageBackgrounds);
  protected displayedColumns = ['id', 'title', 'isActive', 'displayOrder', 'createdAt', 'mainImage'];
  protected pageSize = 10;
  protected pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private subscription = new Subscription();
  private destroy$ = new Subject<void>();
  private _snackBar = inject(MatSnackBar);
  protected isLoading: boolean = true;

  constructor(private dialog: MatDialog, private backgroundService: AdminMainPageBackgroundService) {
  }

  ngOnInit() {
    this.subscription.add(
      this.backgroundService.getAll().pipe(takeUntil(this.destroy$)).subscribe(res => {
        this.mainPageBackgrounds = res;
        this.dataSourceWithPageSize.data = this.mainPageBackgrounds;
        this.isLoading = false;
      })
    )
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSourceWithPageSize.paginator = this.paginator;
    } else {
      console.error('Paginator is not initialized.');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  protected openDialog() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {message: 'Czy na pewno chcesz usunąć ten element?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBackground();
      }
    });
  }

  protected highlightRow(row: AdminMainPageBackgroundDto) {
    if (this.selectedRowIndex == row.id) {
      this.selectedRowIndex = 0;
      this.selectedRow = undefined;
    } else {
      this.selectedRowIndex = row.id;
      this.selectedRow = row;
    }
  }

  private deleteBackground() {
    if (!!this.selectedRow?.id) {
      this.subscription.add(
        this.backgroundService.delete(this.selectedRow.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.ngOnInit();
          }, resp => {
            this._snackBar.open(`Błąd podczas usunięcie: ${resp.error}`);
          })
      );
    }
  }
}
