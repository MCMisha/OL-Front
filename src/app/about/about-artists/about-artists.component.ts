import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artist } from '../../models/artist';
import { ArtistCategory } from '../../models/enums/artist-category.enum';
import { ArtistCategoryLabels } from '../../models/enums/artist-category-labels';
import { ArtistService } from '../../services/artist.service';
import { HelperService } from '../../shared/services/helper.service';
import {ActivatedRoute} from "@angular/router";

type ArtistFilterCategory = ArtistCategory | 'all';

@Component({
  selector: 'app-about-artists',
  templateUrl: './about-artists.component.html',
  styleUrls: ['./about-artists.component.scss']
})
export class AboutArtistsComponent implements OnInit, OnDestroy {
  isLoading = true;

  artists: Artist[] = [];
  filteredArtists: Artist[] = [];

  selectedCategory: ArtistFilterCategory = 'all';

  private subscription = new Subscription();

  categories: { label: string; value: ArtistFilterCategory }[] = [
    { label: 'WSZYSCY', value: 'all' },
    ...Object.values(ArtistCategory)
      .filter((value): value is ArtistCategory => typeof value === 'number')
      .map(value => ({
        value,
        label: ArtistCategoryLabels[value].toUpperCase()
      }))
  ];

  constructor(
    private artistsService: ArtistService,
    private helperService: HelperService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParamMap.subscribe(params => {
        const categoryParam = params.get('category');

        if (!categoryParam) {
          this.selectedCategory = 'all';
          this.applyFilter();
          return;
        }

        const category = Number(categoryParam);

        if (Object.values(ArtistCategory).includes(category as ArtistCategory)) {
          this.selectedCategory = category as ArtistCategory;
          this.applyFilter();
        }
      })
    );

    this.loadArtists();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadArtists(): void {
    this.isLoading = true;

    this.subscription.add(
      this.artistsService.getAll().subscribe({
        next: (artists) => {
          this.artists = artists;
          this.applyFilter();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      })
    );
  }

  selectCategory(category: ArtistFilterCategory): void {
    this.selectedCategory = category;
    this.applyFilter();
  }

  private applyFilter(): void {
    this.filteredArtists =
      this.selectedCategory === 'all'
        ? this.artists
        : this.artists.filter(artist => artist.category === this.selectedCategory);
  }

  getImage(photo?: string): string {
    if (!photo) {
      return 'assets/images/artist-placeholder.jpg';
    }

    if (photo.startsWith('data:image') || photo.startsWith('assets/')) {
      return photo;
    }

    return `data:image/webp;base64,${photo}`;
  }

  protected getCategoryClass(category: ArtistCategory): string {
    return this.helperService.getCategoryNgClass(category);
  }
}
