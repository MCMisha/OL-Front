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
  @ViewChild('viewport', { static: true }) viewportRef!: ElementRef<HTMLElement>;
  private isDragging = false;
  private startX = 0;
  private startScrollLeft = 0;
  private hasMoved = false;
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
    const el = this.viewportRef.nativeElement;
    const step = el.clientWidth * 0.7;

    el.scrollBy({
      left: dir === 'next' ? step : -step,
      behavior: 'smooth'
    });
  }

  onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }

    const el = this.viewportRef.nativeElement;

    this.isDragging = true;
    this.hasMoved = false;
    this.startX = event.clientX;
    this.startScrollLeft = el.scrollLeft;

    el.classList.add('dragging');
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) {
      return;
    }

    const el = this.viewportRef.nativeElement;
    const dx = event.clientX - this.startX;

    if (Math.abs(dx) > 5) {
      this.hasMoved = true;
      event.preventDefault();
    }

    el.scrollLeft = this.startScrollLeft - dx * 1.7;
  }

  onPointerUp(): void {
    if (!this.isDragging) {
      return;
    }

    const el = this.viewportRef.nativeElement;

    this.isDragging = false;
    el.classList.remove('dragging');
  }

  private getPhotoUrl(photo: string | number[] | null | undefined): string {

    if (!photo) {
      return 'assets/artists/placeholder.png';
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

  protected onCardClick($event: MouseEvent) {
    if (this.hasMoved) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }
}
