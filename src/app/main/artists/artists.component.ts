import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArtistService } from '../../services/artist.service';

interface ArtistCard {
  id: number;
  name: string;
  photoUrl: string;
  description?: string | null;
  category: number | string;
}

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss'
})
export class ArtistsComponent implements OnInit {

  @ViewChild('track', { static: true }) track!: ElementRef<HTMLElement>;

  artists: ArtistCard[] = [];
  isLoading = false;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(): void {
    this.isLoading = true;

    this.artistService.getAll().subscribe({
      next: (data) => {
        this.artists = data.map(a => ({
          id: a.id,
          name: `${a.firstName} ${a.lastName}`,
          photoUrl: this.getPhotoUrl(a.photo),
          description: a.description,
          category: a.category
        }));

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading artists', err);
        this.isLoading = false;
      }
    });
  }

  scroll(dir: 'prev' | 'next'): void {
    const el = this.track.nativeElement;
    const step = el.clientWidth * 0.7;

    el.scrollBy({
      left: dir === 'next' ? step : -step,
      behavior: 'smooth'
    });
  }

  onWheel(e: WheelEvent): void {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();

      this.track.nativeElement.scrollBy({
        left: e.deltaY,
        behavior: 'auto'
      });
    }
  }

  private getPhotoUrl(photo: string | number[] | null | undefined): string {

    if (!photo) {
      return 'assets/mock/artists/placeholder.jpg';
    }

    if (typeof photo === 'string') {
      if (photo.startsWith('data:image')) {
        return photo;
      }

      return `data:image/jpeg;base64,${photo}`;
    }

    if (Array.isArray(photo)) {
      const binary = photo.map(b => String.fromCharCode(b)).join('');
      const base64 = btoa(binary);

      return `data:image/jpeg;base64,${base64}`;
    }

    return 'assets/mock/artists/placeholder.jpg';
  }
}
