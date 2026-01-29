export interface AdminPerformanceEventRowDto {
  id: number;
  performanceId: number;
  startAt: string;   // ISO string, лучше с Z (UTC)
  buyLink: string;
  isActive: boolean;
}
