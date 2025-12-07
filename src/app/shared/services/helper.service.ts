import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getCategoryNgClass(category: number): string {
    switch (category) {

      // Role
      case 1:
      case 2:
      case 3:
        return 'cat-role';

      // Smyczki
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        return 'cat-smyczki';

      // Drewniane
      case 20:
      case 21:
      case 22:
      case 23:
        return 'cat-drewniane';

      // Blaszane
      case 30:
      case 31:
      case 32:
        return 'cat-blaszane';

      // Inne
      case 40:
      case 41:
      case 42:
      case 43:
        return 'cat-inne';

      // Chór / Balet
      case 50:
      case 51:
        return 'cat-zespoly';

      default:
        return 'cat-default';
    }
  }
}
