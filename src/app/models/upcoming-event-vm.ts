export interface UpcomingEventVm {
  eventId: number;
  performanceId: number;
  startAt: Date;
  title: string;
  genre: string;
  place: string;
  imageUrl: string | null;
  buyLink?: string;
  isActive: boolean;
}
