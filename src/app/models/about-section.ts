export interface AboutSection{
  id: number;
  title: string;
  slug: string;
  order: number;
  isVisible: boolean;
  contentHtml: string;
  createdAt: Date;
  updatedAt: Date;
}
