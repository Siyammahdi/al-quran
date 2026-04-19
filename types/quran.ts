export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  audio: string;
  audioSecondary: string[];
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
  edition: Edition;
}

export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}

export interface SearchResult {
  count: number;
  matches: SearchMatch[];
}

export interface SearchMatch {
  number: number;
  text: string;
  edition: Edition;
  surah: Surah;
  numberInSurah: number;
}

export interface QuranResponse<T> {
  code: number;
  status: string;
  data: T;
}
