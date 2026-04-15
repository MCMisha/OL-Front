import moment from "moment/moment";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class HelperFunctionsUtil {
  public isSelling(selectedEvent: any) {
    return moment(selectedEvent.startAt) > moment() && !!selectedEvent.buyLink && selectedEvent.isActive;
  }
}
