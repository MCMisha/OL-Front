import {Component, ElementRef, ViewChild} from '@angular/core';
import {ArtistCard} from "../../models/artist-card";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss'
})
export class ArtistsComponent {
  @ViewChild('track', { static: true }) track!: ElementRef<HTMLElement>;

  // мок-данные
  artists: ArtistCard[] = [
    { id: 1, name: 'Anna Nowak', photoUrl: 'assets/mock/artists/a1.jpg' },
    { id: 2, name: 'Jan Kowalski', photoUrl: 'assets/mock/artists/a2.jpg' },
    { id: 3, name: 'Katarzyna Zielińska', photoUrl: 'assets/mock/artists/a3.jpg' },
    { id: 4, name: 'Mateusz Wójcik', photoUrl: 'assets/mock/artists/a4.jpg' },
    { id: 5, name: 'Aleksandra Mazur', photoUrl: 'assets/mock/artists/a5.jpg' },
    { id: 6, name: 'Piotr Lewandowski', photoUrl: 'assets/mock/artists/a6.jpg' },
  ];

  scroll(dir: 'prev' | 'next') {
    const el = this.track.nativeElement;
    const step = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
  }

  onWheel(e: WheelEvent) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      this.track.nativeElement.scrollBy({ left: e.deltaY, behavior: 'auto' });
    }
  }
}
