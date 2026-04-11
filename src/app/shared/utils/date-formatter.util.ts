import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterUtil {
  public getMonthLabelPl(date: Date): string {
    const m = date.toLocaleDateString('pl-PL', { month: 'long' });

    return m.toUpperCase();
  }
}
