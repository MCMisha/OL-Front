import { Component } from '@angular/core';
import {PremiereVm} from "../../models/premiere-vm";

@Component({
  selector: 'app-newest-premiers',
  templateUrl: './newest-premiers.component.html',
  styleUrl: './newest-premiers.component.scss'
})
export class NewestPremiersComponent {
  items: PremiereVm[] = [
    {
      category: 'KONCERT',
      title: 'SYLWESTROWY',
      labelLeft: 'Premiera',
      date: '31.12.2025',
      imageUrl: 'assets/mock/premiere-1.jpg',
      moreUrl: '#'
    },
    {
      category: 'OPERA',
      title: 'HALKA',
      labelLeft: 'Premiera',
      date: '24.09.2025',
      imageUrl: 'assets/mock/premiere-2.jpg',
      moreUrl: '#'
    },
    {
      category: 'OPERA',
      title: 'TOSCA',
      labelLeft: 'Premiera',
      date: '21.01.2024',
      imageUrl: 'assets/mock/premiere-3.jpg',
      moreUrl: '#'
    }
  ];
}
