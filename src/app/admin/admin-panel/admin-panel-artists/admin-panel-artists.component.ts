import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription, takeUntil} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../../shared/dialog-confirm/dialog-confirm.component";
import {AdminArtistService} from "../../../services/admin/admin-artist.service";
import {Artist} from "../../../models/artist";
import {MatPaginator} from "@angular/material/paginator";
import {ArtistCategoryLabels} from "../../../models/enums/artist-category-labels";
import {ArtistCategory} from "../../../models/enums/artist-category.enum";

@Component({
  selector: 'app-admin-panel-artists',
  templateUrl: './admin-panel-artists.component.html',
  styleUrl: './admin-panel-artists.component.scss'
})
export class AdminPanelArtistsComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading: boolean = true;
  selectedRow?: Artist;
  selectedRowIndex?: number;
  displayedColumns = ['id', 'firstName', 'lastName', 'category', 'photo'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  artists: Artist[] = [];
  subscription = new Subscription();
  private destroy$ = new Subject<void>();
  protected readonly ArtistCategoryLabels = ArtistCategoryLabels;
  dataSourceWithPageSize = new MatTableDataSource(this.artists);
  pageSize = 5;
  pageIndex = 0;

  constructor(
    private artistService: AdminArtistService,
    protected dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.artistService.getArtists().subscribe(artists => {
        this.artists = artists;
        this.dataSourceWithPageSize.data = this.artists;
        this.isLoading = false;
      })
    );
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSourceWithPageSize.paginator = this.paginator;
    } else {
      console.error('Paginator is not initialized.');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: {message: 'Czy na pewno chcesz usunąć ten element?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteNews();
      }
    });
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

  deleteNews() {
    if (!!this.selectedRow) {
      this.artistService.deleteArtist(this.selectedRow.id!).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.selectedRowIndex = -1;
        this.selectedRow = undefined;
        this.ngOnInit();
      });
    }
  }

  getCategoryLabel(cat: number): string {
    return ArtistCategoryLabels[cat as ArtistCategory];
  }

}
