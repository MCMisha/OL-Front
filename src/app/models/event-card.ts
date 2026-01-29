export interface EventCard {
  id: number;
  title: string;
  date: string;   // "2026-01-30" или уже форматированная строка
  time?: string;  // "18:00"
  place?: string; // "Sala operowa CSK"
  buyUrl?: string;
}
