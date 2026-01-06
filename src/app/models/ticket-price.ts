import {TicketType} from "./enums/ticket-type.enum";

export interface TicketPrice {
  type: TicketType;
  amount: number;
}
