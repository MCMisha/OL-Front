import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PerformancesService} from "../../services/performances.service";
import {PerformanceCastService} from "../../services/performance-cast.service";
import {PerformanceInfoService} from "../../services/performance-info.service";
import {TicketPriceService} from "../../services/ticket-price.service";
import {TicketPriceGroup} from "../../models/ticket-price-group";
import {TicketType} from "../../models/enums/ticket-type.enum";
import {PerformanceEvent} from "../../models/performance-event";
import {PerformanceEventService} from "../../services/performance-event.service";
import {HelperFunctionsUtil} from "../../shared/utils/helper-functions.util";
import {Performance} from "../../models/performance";
import {PerformancePhotoService} from "../../services/performance-photo.service";
import {PerformancePhoto} from "../../models/performance-photo";
import {Implementer} from "../../models/implementer";
import {ArtistPerformanceCastDto} from "../../models/artist-performance-cast-dto"; // <-- добавь

@Component({
  selector: 'app-performances-details',
  templateUrl: './performances-details.component.html',
  styleUrl: './performances-details.component.scss'
})
export class PerformancesDetailsComponent implements OnInit, OnDestroy {
  performance: Performance | any;
  implementers: Implementer[] = [];
  isLoading = true;
  implementersView: {
    role: string;
    people: {
      fullName: string;
      photoSrc: string | null;
      isDirector: boolean;
    }[];
  }[] = [];
  events: PerformanceEvent[] = [];
  galleryImages: PerformancePhoto[] = [];
  actsLabel = '';
  minutesLabel = '';
  directorLabel = '';
  // OBSADA (mapped)
  cast: ArtistPerformanceCastDto[] = [];
  filteredCast: ArtistPerformanceCastDto[] = [];
  selectedDate: Date | undefined;
  // CENY
  ticketPriceGroups: TicketPriceGroup[] = [];

  sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PerformancesService,
    private castService: PerformanceCastService,
    private performanceEventService: PerformanceEventService,
    private performanceInfoService: PerformanceInfoService,
    private performancePhotoService: PerformancePhotoService,
    private ticketPriceService: TicketPriceService,
    private helperFunctions: HelperFunctionsUtil
  ) {
  }

  ngOnInit() {
    this.sub.add(
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get("id"));
        if (id) {
          this.loadPerformance(id);
          this.loadCast(id);
          this.loadImplementers(id);
          this.loadPerformanceEvents(id);
          this.loadTicketPrices(id);
          this.loadPerformancePhotos(id);
        }
      })
    );
  }

  loadPerformance(id: number) {
    this.sub.add(
      this.service.getPerformanceById(id).subscribe(res => {
        this.performance = res;
        this.actsLabel = `${this.helperFunctions.toRomanNumber(this.performance.breaksCount + 1)} akty`;
        this.minutesLabel = `${this.helperFunctions.fromTimeToMinute(this.performance.duration)} min`;
        this.isLoading = false;
      })
    );
  }

  private loadImplementers(id: number): void {
    this.sub.add(
      this.performanceInfoService.getImplementers(id).subscribe((res: any[]) => {
        this.implementers = (res ?? []).map(x => ({
          ...x,
          fullName: `${x.firstName ?? ''} ${x.lastName ?? ''}`.trim(),
          photoSrc: this.getPhotoSrc(x.photo)
        }));

        const map = new Map<string, {
          role: string;
          people: Map<string, {
            fullName: string;
            photoSrc: string | null;
            isDirector: boolean;
          }>;
        }>();

        this.directorLabel = '';

        this.implementers.forEach(x => {
          const rawRole =
            x.role ?? '';

          const role = String(rawRole)
            .replace(':', '')
            .trim();

          const key = role.toLowerCase();
          const fullName = `${x.firstName} ${x.lastName}`;

          if (x.isDirector && fullName) {
            this.directorLabel = `Reż. ${fullName}`;
          }

          if (!role || !fullName) {
            return;
          }

          if (!map.has(key)) {
            map.set(key, {
              role,
              people: new Map()
            });
          }

          map.get(key)!.people.set(fullName.toLowerCase(), {
            fullName,
            photoSrc: x.photo ?? '',
            isDirector: x.isDirector
          });
        });

        this.implementersView = Array.from(map.values()).map(item => ({
          role: item.role,
          people: Array.from(item.people.values())
        }));
      })
    );
  }

  private loadCast(id: number) {
    this.sub.add(
      this.castService.getCast(id).subscribe(items => {
        this.cast = items ?? [];
        this.filteredCast = this.cast.filter(ap => ap.startAt === this.selectedDate);
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

  loadPerformanceEvents(id: number) {
    this.sub.add(
      this.performanceEventService.getNearestFiveForPerformance(id).subscribe(res => {
        this.events = res;
        if (this.events.length > 0) {
          this.selectedDate = this.events[0].startAt;
        }
      })
    )
  }

  loadPerformancePhotos(id: number) {
    this.sub.add(
      this.performancePhotoService.getPerformancePhoto(id).subscribe(res => {
        this.galleryImages = res;
      })
    )
  }

  getPhotoSrc(photo: string | null | undefined): string | null {
    if (!photo) {
      return null;
    }

    if (photo.startsWith('data:')) {
      return photo;
    }

    return `data:image/jpeg';base64,${photo}`;
  }

  protected changeSelectedDate(startAt: Date) {
    this.selectedDate = startAt;
    this.filteredCast = this.cast.filter(ap => ap.startAt == this.selectedDate);
  }
}
