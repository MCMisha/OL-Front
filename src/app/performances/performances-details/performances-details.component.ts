import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PerformancesService} from "../../services/performances.service";

@Component({
  selector: 'app-performances-details',
  templateUrl: './performances-details.component.html',
  styleUrl: './performances-details.component.scss'
})
export class PerformancesDetailsComponent implements OnInit, OnDestroy {
  performance: any;
  isLoading = true;
  sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PerformancesService
  ) {}

  ngOnInit() {
    this.sub.add(
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get("id"));
        if (id) this.loadPerformance(id);
      })
    );
  }

  loadPerformance(id: number) {
    this.sub.add(
      this.service.getPerformanceById(id).subscribe(res => {
        this.performance = res;
        this.isLoading = false;
      })
    );
  }

  goBack() {
    this.router.navigate(['/performances']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
