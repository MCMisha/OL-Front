import {Component, OnDestroy, OnInit} from '@angular/core';
import {Artist} from "../../models/artist";
import {ArtistCategory} from "../../models/enums/artist-category.enum";
import {ArtistCategoryLabels} from "../../models/enums/artist-category-labels";
import {ArtistService} from "../../services/artist.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-about-artists',
  templateUrl: './about-artists.component.html',
  styleUrls: ['./about-artists.component.scss']
})
export class AboutArtistsComponent implements OnInit, OnDestroy {

  artists: Artist[] = [];
  filteredArtists: Artist[] = [];

  selectedCategory: ArtistCategory | string = 'all';
  subscription = new Subscription();
  // экспортируем labels в HTML
  ArtistCategoryLabels = ArtistCategoryLabels;

  // генерируем категории автоматически
  categories = [
    {label: 'Wszyscy', value: 'all'},
    ...Object.values(ArtistCategory)
      .filter(v => typeof v === 'number')
      .map((value) => ({
        value: value as ArtistCategory,
        label: ArtistCategoryLabels[value as ArtistCategory]
      }))
  ];

  constructor(private artistsService: ArtistService) {
  }

  ngOnInit(): void {
    this.loadArtists();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadArtists(): void {
    this.subscription.add(
      this.artistsService.getAll().subscribe({
        next: (data) => {
          this.artists = data;
          this.filteredArtists = data;
        },
        error: (err) => console.error(err)
      })
    );
  }

  selectCategory(cat: ArtistCategory | string): void {
    this.selectedCategory = cat;

    this.filteredArtists =
      cat === 'all'
        ? this.artists
        : this.artists.filter(a => a.category === cat);
  }

  getImage(photo: string | undefined): string {
    return `data:image/webp;base64,${photo}`;
  }
}

