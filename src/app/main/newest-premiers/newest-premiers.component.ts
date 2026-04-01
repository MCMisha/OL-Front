import {Component, OnDestroy, OnInit} from '@angular/core';
import {mapPremiereToVm, PremiereVm} from "../../models/premiere-vm";
import {PerformancesService} from "../../services/performances.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-newest-premiers',
  templateUrl: './newest-premiers.component.html',
  styleUrl: './newest-premiers.component.scss'
})
export class NewestPremiersComponent implements OnInit, OnDestroy {
  items: PremiereVm[] = [];
  subscription = new Subscription();
  constructor(private premiereService: PerformancesService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.premiereService.getNewestPremieres().subscribe(
        (data) => {
          this.items = data.map(mapPremiereToVm);
        },
        (err) => {
          console.error('Błąd podczas pobierania premier', err);
        }
      )
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
