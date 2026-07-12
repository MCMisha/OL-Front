import moment from "moment/moment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HelperFunctionsUtil {
  public isSelling(selectedEvent: any) {
    return moment(selectedEvent.startAt) > moment() && !!selectedEvent.buyLink && selectedEvent.isActive;
  }
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
  public toRomanNumber(num: number) {
    let result: string = '';
    let decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X','IX','V','IV','I'];

    for (let i = 0; i < decimal.length; i++) {
      while(num%decimal[i] < num) {
        result += roman[i];
        num -= decimal[i];
      }
    }

    return result;
  }

  public fromTimeToMinute(time: string): number {
    let timeParts = time.split(':');
    return parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
  }
}
