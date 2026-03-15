export interface Comment {
  id?: number | undefined;
  photo: string;
  firstName: string;
  stars: number;
  performanceId: number;
  comment: string;
  datePublished: string;
  isShowing: boolean;
}
