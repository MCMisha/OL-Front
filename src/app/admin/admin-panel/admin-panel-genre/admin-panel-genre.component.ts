import {AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminGenreService} from "../../../services/admin/admin-genre.service";
import {Genre} from "../../../models/genre";
import {Subject, Subscription, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../../shared/dialog-confirm/dialog-confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-panel-genre',
  templateUrl: './admin-panel-genre.component.html',
  styleUrls: ['./admin-panel-genre.component.scss']
})
export class AdminPanelGenreComponent implements OnInit, AfterViewInit, OnDestroy {
  genres: Genre[] = [];
  displayedColumns = ['id', 'name'];
  pageSize = 5;
  pageIndex = 0;
  paginatedGenres: Genre[] = [];
  selectedRowIndex: any;
  selectedRow?: Genre;
  dataSourceWithPageSize = new MatTableDataSource(this.genres);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private subscription = new Subscription();
  private destroy$ = new Subject<void>();
  private _snackBar = inject(MatSnackBar);

  constructor(
    private genreService: AdminGenreService,
    protected dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.genreService.getGenres().pipe(takeUntil(this.destroy$)).subscribe(genres => {
      this.genres = genres;
      this.dataSourceWithPageSize.data = this.genres;
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSourceWithPageSize.paginator = this.paginator;
    } else {
      console.error('Paginator is not initialized.');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  highlightRow(row: any) {
    if (this.selectedRowIndex == row.id) {
      this.selectedRowIndex = 0;
      this.selectedRow = undefined;
    } else {
      this.selectedRowIndex = row.id;
      this.selectedRow = row;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {message: 'Czy na pewno chcesz usunąć ten element?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteGenre();
      }
    });
  }

  deleteGenre() {
    if (!!this.selectedRow) {
      this.subscription.add(
        this.genreService.deleteGenre(this.selectedRow.id).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.ngOnInit();
        }, resp => {
          this._snackBar.open(`Bląd podczas logowania: ${resp.error}`,'Zamknij', { duration: 5000 });

        })
      );
    }
  }
}
