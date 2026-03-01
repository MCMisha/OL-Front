import { Component } from '@angular/core';
import {NewsStripItem} from "../../models/news-strip-item";

@Component({
  selector: 'app-recent-news',
  templateUrl: './recent-news.component.html',
  styleUrl: './recent-news.component.scss'
})
export class RecentNewsComponent {
  headerTitle = '_AKTUALNOŚCI';
  moreLink = '/news';

  items: NewsStripItem[] = [
    {
      title: 'OFERTA PRACY',
      date: new Date('2025-11-31'),
      excerpt:
        'Dyrekcja Opery Lubelskiej ogłasza przesłuchania do zespołu orkiestry na stanowisko muzyk instrumentalista – specjalność – trąbka...',
      link: '/news/oferta-pracy'
    },
    {
      title: 'ZDROWYCH, POGODNYCH ŚWIĄT!',
      date: new Date('2025-11-31'),
      excerpt:
        'Drodzy Państwo, niech Święta Wielkanocne napełnią Wszystkich siłą oraz radością, a serca przepełni Wiara, Nadzieja i Miłość...',
      link: '/news/zyczenia'
    }
  ];

  // dd miesiąca yyyy по-польски, как на макете
  formatDatePl(d: Date): string {
    return d.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
