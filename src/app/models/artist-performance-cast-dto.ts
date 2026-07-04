import {ArtistCategory} from "./enums/artist-category.enum";

export interface ArtistPerformanceCastDto {
  id: number;
  artistId: number;
  startAt: Date;
  firstName: string;
  lastName: string;
  photo: string | undefined;
  role: string;
  category: ArtistCategory;
}
