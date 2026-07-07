import {NewsCategory} from "./enums/news-category.enum";

export interface News {
  id?: number;
  title?: string;
  subtitle?: string;
  mainImage?: string;
  creationDate: Date;
  content?: string;
  category?: NewsCategory;
}
