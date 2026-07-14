import {Performance} from "./performance";

export interface MainPageBackground {
  id: number;
  performanceId: number,
  mainImage: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  performance?: Performance;
}
