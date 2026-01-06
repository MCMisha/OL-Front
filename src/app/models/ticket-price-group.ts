import {TicketPrice} from "./ticket-price";

export interface TicketPriceGroup {
  name: string;
  sortOrder: number;
  prices: TicketPrice[];
}
