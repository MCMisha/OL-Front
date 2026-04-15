export interface UpcomingEvent {
  eventId: number;
  startAt: string;        // DateTime приходит ISO строкой
  performanceId: number;
  title: string;
  genre: string;
  place: string;
  mainImage: string | null;
  buyLink?: string;
  isActive: boolean;
}
