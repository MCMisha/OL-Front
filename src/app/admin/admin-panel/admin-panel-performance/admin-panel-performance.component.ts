import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Genre} from "../../../models/genre";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Subject, Subscription, takeUntil} from "rxjs";
import {GenreService} from "../../../services/genre.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../../shared/dialog-confirm/dialog-confirm.component";
import {Performance} from "../../../models/performance";
import {AdminPlaceService} from "../../../services/admin/admin-place.service";
import {Place} from "../../../models/place";
import { AdminPerformanceService } from '../../../services/admin/admin-performance.service';

@Component({
  selector: 'app-admin-panel-performance',
  templateUrl: './admin-panel-performance.component.html',
  styleUrl: './admin-panel-performance.component.scss'
})
export class AdminPanelPerformanceComponent implements OnInit, AfterViewInit, OnDestroy {
  performances: Performance[] = [];
  genres: Genre[] = [];
  places: Place[] = [];
  displayedColumns = ['id', 'title', 'genre', 'place', 'duration', 'breaksCount'];
  pageSize = 5;
  pageIndex = 0;
  paginatedPerfomance: Performance[] = [];
  selectedRowIndex: any;
  selectedRow?: Performance;
  dataSourceWithPageSize = new MatTableDataSource(this.performances);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private subscription = new Subscription();
  private destroy$ = new Subject<void>();
  protected isLoading: boolean = true;

  constructor(
    private performancesService: AdminPerformanceService,
    private placeService: AdminPlaceService,
    private genreService: GenreService,
    protected dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.performancesService.getPerformances().pipe(takeUntil(this.destroy$)).subscribe(performances => {
      this.performances = performances;
      this.dataSourceWithPageSize.data = this.performances;
    });

    this.genreService.getGenres().pipe(takeUntil(this.destroy$)).subscribe(genres => {
      this.genres = genres;
    });

    this.placeService.getPlaces().pipe(takeUntil(this.destroy$)).subscribe(places => {
      this.places = places;
      this.isLoading = false;
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

  getGenreNameById(id: number) {
    const matchingGenre = this.genres.find(g => g.id === id)?.name;
    return matchingGenre ?? '';
  }

  getPlaceNameById(id: number) {
    const matchingPlace = this.places.find(p => p.id === id)?.name;
    return matchingPlace ?? '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      data: { message: 'Czy na pewno chcesz usunąć ten element?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteGenre();
      }
    });
  }

  deleteGenre() {
    if (!!this.selectedRow) {
      this.performancesService.deletePerformance(this.selectedRow.id!).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.selectedRowIndex = -1;
        this.selectedRow = undefined;
        this.ngOnInit();
      });
    }
  }

}
