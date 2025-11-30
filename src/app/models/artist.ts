import {ArtistCategory} from "./enums/artist-category.enum";

export interface Artist {
  id: number;
  firstName: string;
  lastName: string;
  category: ArtistCategory;
  photo?: string;
  description?: string;
}
