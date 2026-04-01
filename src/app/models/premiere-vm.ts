import {Performance} from "./performance";

export interface PremiereVm {
  category: string;
  title: string;
  labelLeft: string;
  date: string;
  imageUrl: string;
  moreUrl?: string;
}

export function mapPremiereToVm(dto: Performance): PremiereVm {
  return {
    category: mapGenreToCategory(dto.genre ?? 1),
    title: dto.title ?? "",
    labelLeft: 'Premiera',
    date: formatDate(dto.premiereDate ?? ""),
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

function formatDate(date: string): string {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}.${month}.${year}`;
}
