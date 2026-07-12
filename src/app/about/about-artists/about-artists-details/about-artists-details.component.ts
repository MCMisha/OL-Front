import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {ArtistService} from '../../../services/artist.service';
import {ActivatedRoute} from '@angular/router';
import {ArtistCategory} from '../../../models/enums/artist-category.enum';
import {ArtistCategoryLabels} from '../../../models/enums/artist-category-labels';
import {ArtistPhotoService} from '../../../services/artist-photo.service';
import {ArtistPhoto} from '../../../models/artist-photo';
import {ArtistDetails} from "../../../models/artist-details";
import {HelperFunctionsUtil} from "../../../shared/utils/helper-functions.util";

@Component({
  selector: 'app-about-artists-details',
  templateUrl: './about-artists-details.component.html',
  styleUrl: './about-artists-details.component.scss'
})
export class AboutArtistsDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('viewport') viewport?: ElementRef<HTMLDivElement>;
  @ViewChild('galleryTrack') galleryTrack?: ElementRef<HTMLDivElement>;

  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;

  artist!: ArtistDetails;
  artistPhotos: ArtistPhoto[] = [];

  isLoading = true;
  subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private artistPhotoService: ArtistPhotoService,
    protected helperFunctions: HelperFunctionsUtil) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.isLoading = false;
      return;
    }

    this.subscription.add(
      forkJoin({
        artist: this.artistService.getById(id),
        artistPhotos: this.artistPhotoService.getArtistPhotos(id)
      }).subscribe({
        next: result => {
          this.artist = result.artist;
          this.artistPhotos = result.artistPhotos;
          this.isLoading = false;
        },
        error: err => {
          console.error(err);
          this.isLoading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  scrollGallery(direction: 'left' | 'right'): void {
    if (!this.galleryTrack) {
      return;
    }

    const scrollAmount = 340;

    this.galleryTrack.nativeElement.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  onPointerDown(event: PointerEvent): void {
    if (!this.viewport) {
      return;
    }

    this.isDragging = true;
    this.startX = event.clientX;
    this.scrollLeft = this.viewport.nativeElement.scrollLeft;

    this.viewport.nativeElement.setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging || !this.viewport) {
      return;
    }

    const walk = event.clientX - this.startX;
    this.viewport.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.viewport) {
      return;
    }

    this.isDragging = false;

    if (this.viewport.nativeElement.hasPointerCapture(event.pointerId)) {
      this.viewport.nativeElement.releasePointerCapture(event.pointerId);
    }
  }

  getImage(photo?: string): string {
    if (!photo) {
      return 'assets/images/artist-placeholder.jpg';
    }

    if (photo.startsWith('data:image') || photo.startsWith('assets/')) {
      return photo;
    }

    return `data:image/jpeg;base64,${photo}`;
  }

  getBackgroundImage(photo?: string): string {
    return photo
      ? `url("${this.getImage(photo)}")`
      : 'none';
  }

  getCategoryLabel(cat: number): string {
    return ArtistCategoryLabels[cat as ArtistCategory];
  }

  trackByPhotoId(index: number, photo: ArtistPhoto): number {
    return photo.id;
  }
}
