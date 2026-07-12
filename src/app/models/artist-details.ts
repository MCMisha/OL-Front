import {EventInfo} from "./event-info";
import {ArtistCategory} from "./enums/artist-category.enum";

export interface ArtistDetails {
  id: number;
  fullName: string;
  photo?: string;
  category: ArtistCategory;
  description: string;
  artistPhotos: string[];
  artistEvents: EventInfo[];
}
