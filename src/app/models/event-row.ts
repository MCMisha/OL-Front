export interface EventRow {
  id: number | null;
  date: Date | null;
  time: string;          // "HH:mm"
  buyLink: string;
  isActive: boolean;
}
