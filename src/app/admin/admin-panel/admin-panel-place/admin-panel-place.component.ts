import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminPlaceService} from "../../../services/admin/admin-place.service";
import {Subject, Subscription, takeUntil} from 'rxjs';
import {Place} from "../../../models/place";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DialogConfirmComponent} from "../../../shared/dialog-confirm/dialog-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-panel-place',
  templateUrl: './admin-panel-place.component.html',
  styleUrl: './admin-panel-place.component.scss'
})
export class AdminPanelPlaceComponent implements OnInit, OnDestroy {
  places: Place[] = [];
  selectedRowIndex: any;
  selectedRow?: Place;
  pageSize = 5;
  pageIndex = 0;
  displayedColumns = ['id', 'name'];
  dataSourceWithPageSize = new MatTableDataSource(this.places);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private subscription = new Subscription();
  private destroy$ = new Subject<void>();

  constructor(private dialog: MatDialog, private adminPlaceService: AdminPlaceService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.adminPlaceService.getPlaces().pipe(takeUntil(this.destroy$)).subscribe(
        (places) => {
          this.places = places;
          this.dataSourceWithPageSize.data = this.places;
        }
      )
    )
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
        //this.deleteGenre();
        console.log("TODO: usunąć miejsce");
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
