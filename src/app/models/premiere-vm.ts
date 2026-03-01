export interface PremiereVm {
  category: string;   // KONCERT / OPERA
  title: string;      // SYLWESTROWY / HALKA / TOSCA
  labelLeft: string;  // Premiera
  date: string;       // 31.12.2025
  imageUrl: string;   // url или assets/...
  moreUrl?: string;
}
