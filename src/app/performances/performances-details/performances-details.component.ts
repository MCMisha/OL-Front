import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { PerformancesService } from "../../services/performances.service";
import { PerformanceCastService } from "../../services/performance-cast.service";
import { PerformanceInfoService } from "../../services/performance-info.service";
import { TicketPriceService } from "../../services/ticket-price.service";
import {TicketPriceGroup} from "../../models/ticket-price-group";
import {TicketType} from "../../models/enums/ticket-type.enum"; // <-- добавь

@Component({
  selector: 'app-performances-details',
  templateUrl: './performances-details.component.html',
  styleUrl: './performances-details.component.scss'
})
export class PerformancesDetailsComponent implements OnInit, OnDestroy {
  performance: any;
  implementers: any;
  isLoading = true;
  implementersView: { role: string; names: string[] }[] = [];

  // OBSADA (mapped)
  cast: { artistId: number; artistName: string; role: string }[] = [];

  // CENY
  ticketPriceGroups: TicketPriceGroup[] = [];

  sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PerformancesService,
    private castService: PerformanceCastService,
    private performanceInfoService: PerformanceInfoService,
    private ticketPriceService: TicketPriceService // <-- добавь
  ) {}

  ngOnInit() {
    this.sub.add(
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get("id"));
        if (id) {
          this.loadPerformance(id);
          this.loadImplementers(id);
          this.loadCast(id);
          this.loadTicketPrices(id);
        }
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

  private loadImplementers(id: number) {
    this.sub.add(
      this.performanceInfoService.getImplementers(id).subscribe((res: any[]) => {
        this.implementers = res;

        // универсальный мэппинг: под разные форматы
        const rows = (res ?? []).map(x => {
          const role =
            x.role ??
            x.implementerRole ??
            x.type ??
            x.name ?? // если роль приходит как name
            '';

          const fullName =x.firstName + ' ' + x.lastName;
          return { role: String(role), name: String(fullName).trim() };
        });

        const map = new Map<string, string[]>();
        rows.forEach(r => {
          if (!r.role) return;
          if (!map.has(r.role)) map.set(r.role, []);
          if (r.name) map.get(r.role)!.push(r.name);
        });

        this.implementersView = Array.from(map.entries())
          .map(([role, names]) => ({
            role,
            names: Array.from(new Set(names)) // уберём дубли
          }));
      })
    );
  }

  private loadCast(id: number) {
    this.sub.add(
      this.castService.getCast(id).subscribe(items => {
        this.cast = (items ?? []).map(x => ({
          artistId: x.artistId,
          artistName: `${x.artist?.firstName ?? ''} ${x.artist?.lastName ?? ''}`.trim(),
          role: x.role
        }));
      })
    );
  }

  private loadTicketPrices(id: number) {
    this.sub.add(
      this.ticketPriceService.getByPerformance(id).subscribe(res => {
        this.ticketPriceGroups = (res ?? []).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      })
    );
  }

  goBack() {
    this.router.navigate(['/performances']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  protected readonly TicketType = TicketType;
}
