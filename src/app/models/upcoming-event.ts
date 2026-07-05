export interface UpcomingEvent {
  eventId: number;
  startAt: string;
  performanceId: number;
  title: string;
  genre: string;
  place: string;
  mainImage: string | null;
  buyLink?: string;
  isActive: boolean;
}
