import {Performance} from "./performance";

export interface PremiereVm {
  performanceId: number;
  category: string;
  title: string;
  labelLeft: string;
  date: Date | undefined;
  imageUrl: string;
  moreUrl?: string;
}

export function mapPremiereToVm(dto: Performance): PremiereVm {
  return {
    performanceId: dto.id ?? 0,
    category: mapGenreToCategory(dto.genre ?? 1),
    title: dto.title ?? "",
    labelLeft: 'Premiera',
    date: dto.premiereDate ?? undefined,
    imageUrl: dto.mainImage ? `data:image/jpeg;base64,${dto.mainImage}` : "",
    moreUrl: `/repertuar/${dto.id}`
  };
}

function mapGenreToCategory(genre: number): string {
  switch (genre) {
    case 1:
      return 'OPERA';
    case 2:
      return 'KONCERT';
    case 3:
      return 'BALET';
    default:
      return 'WYDARZENIE';
  }
}
