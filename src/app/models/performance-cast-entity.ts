import {ArtistShort} from "./artist-short";

export interface PerformanceCastEntity {
  performanceId: number;
  artistId: number;
  role: string;
  artist: ArtistShort;
}
