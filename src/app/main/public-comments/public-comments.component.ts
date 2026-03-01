import { Component } from '@angular/core';
import {CommentVm} from "../../models/comment-vm";

@Component({
  selector: 'app-public-comments',
  templateUrl: './public-comments.component.html',
  styleUrl: './public-comments.component.scss'
})
export class PublicCommentsComponent {
  reviews: CommentVm[] = [
    {
      name: 'Katarzyna',
      title: 'ZEMSTA NIETOPERZA',
      text: '„Magiczny wieczór! Świetna oprawa muzyczna, doskonałe głosy i wspaniała scenografia. Na pewno wrócimy!”',
      date: '31 listopada 2025',
      avatarUrl: 'assets/mock/avatar-1.jpg',
      rating: 4
    },
    {
      name: 'Mateusz',
      title: 'PHANTOM',
      text: '„Dziękuję za to miejsce. Lublin zasługuje na taką operę — z klasą, pasją i otwartością.”',
      date: '12 grudnia 2025',
      avatarUrl: 'assets/mock/avatar-2.jpg',
      rating: 5
    },
    {
      name: 'Aleks',
      title: 'HALKA',
      text: '„Opera Lubelska zasługuje na najwyższe noty — absolutnie powalają!”',
      date: '31 listopada 2025',
      avatarUrl: 'assets/mock/avatar-3.jpg',
      rating: 4
    }
  ];

  stars(n: number) {
    return Array.from({ length: 5 }, (_, i) => i < n);
  }
}
