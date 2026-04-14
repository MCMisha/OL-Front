export interface HeroSlide {
  id: number;
  title: string;
  subtitle?: string;      // "Operetka" / "Musical"
  dateRange?: string;     // "10.12 — 11.12"
  backgroundUrl: string;  // картинка фона
  buyUrl?: string;
  detailsLink?: any[] | null;
}
