import { ArtistCategory } from './artist-category.enum';

export const ArtistCategoryLabels: Record<ArtistCategory, string> = {
  [ArtistCategory.Solista]: 'Soliści',
  [ArtistCategory.Dyrygent]: 'Dyrygenci',
  [ArtistCategory.ZespolOrkiestry]: 'Orkiestra',

  [ArtistCategory.SkrzypceI]: 'Skrzypce I',
  [ArtistCategory.SkrzypceII]: 'Skrzypce II',
  [ArtistCategory.Altowki]: 'Altówki',
  [ArtistCategory.Wiolonczele]: 'Wiolonczele',
  [ArtistCategory.Kontrabasy]: 'Kontrabasy',

  [ArtistCategory.Flety]: 'Flety',
  [ArtistCategory.Oboje]: 'Oboje',
  [ArtistCategory.Klarnety]: 'Klarnety',
  [ArtistCategory.Fagoty]: 'Fagoty',

  [ArtistCategory.Trabki]: 'Trąbki',
  [ArtistCategory.Waltornie]: 'Waltornie',
  [ArtistCategory.Puzony]: 'Puzony',

  [ArtistCategory.Perkusja]: 'Perkusja',
  [ArtistCategory.Gitara]: 'Gitara',
  [ArtistCategory.Akordeon]: 'Akordeon',
  [ArtistCategory.Harfa]: 'Harfa',

  [ArtistCategory.ZespolChoru]: 'Zespół chóru',
  [ArtistCategory.ZespolBaletu]: 'Zespół baletu',
};
