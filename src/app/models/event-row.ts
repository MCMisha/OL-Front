export interface EventRow {
  id: number | null;
  date: Date | null;     // только дата
  time: string;          // "HH:mm"
  buyLink: string;
  isActive: boolean;
}
