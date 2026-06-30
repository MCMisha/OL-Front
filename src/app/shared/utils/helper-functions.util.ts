import moment from "moment/moment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HelperFunctionsUtil {
  public isSelling(selectedEvent: any) {
    return moment(selectedEvent.startAt) > moment() && !!selectedEvent.buyLink && selectedEvent.isActive;
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
