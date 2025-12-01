import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  editorData: any = "hello";
  menuOpen = false;

  menu = [
    { label: 'Inauguracja sezonu 2018/2019', link: 'inauguracja' },
    { label: 'Dyrekcja', link: 'dyrekcja' },
    { label: 'Artyści', link: 'artists' },
    { label: 'Misja Opery', link: 'misja' },
    { label: 'Mecenasi', link: 'mecenasi' },
    { label: 'Sponsorzy, Partnerzy', link: 'partnerzy' },

  ];

}
