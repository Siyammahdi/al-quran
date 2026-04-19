import { QuranResponse, Surah, SurahDetail, SearchResult } from "../types/quran";

const API_BASE_URL = "https://api.alquran.cloud/v1";

export async function getSurahs(): Promise<Surah[]> {
  const response = await fetch(`${API_BASE_URL}/surah`);
  const result: QuranResponse<Surah[]> = await response.json();
  return result.data;
}

export async function getSurahDetail(
  surahNumber: number,
  edition: string = "ar.alafasy"
): Promise<SurahDetail> {
  const response = await fetch(`${API_BASE_URL}/surah/${surahNumber}/${edition}`);
  const result: QuranResponse<SurahDetail> = await response.json();
  return result.data;
}

export async function getSurahWithTranslation(
  surahNumber: number,
  translationEdition: string = "en.asad",
  audioEdition: string = "ar.alafasy"
): Promise<{ surah: SurahDetail; translation: SurahDetail; audio: SurahDetail }> {
  const [surahRes, transRes, audioRes] = await Promise.all([
    fetch(`${API_BASE_URL}/surah/${surahNumber}/quran-uthmani`),
    fetch(`${API_BASE_URL}/surah/${surahNumber}/${translationEdition}`),
    fetch(`${API_BASE_URL}/surah/${surahNumber}/${audioEdition}`),
  ]);

  const surah: QuranResponse<SurahDetail> = await surahRes.json();
  const translation: QuranResponse<SurahDetail> = await transRes.json();
  const audio: QuranResponse<SurahDetail> = await audioRes.json();

  return {
    surah: surah.data,
    translation: translation.data,
    audio: audio.data,
  };
}

export async function searchAyahs(
  keyword: string,
  edition: string = "en.asad"
): Promise<SearchResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/search/${encodeURIComponent(keyword)}/all/${edition}`);
    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }
    const result: QuranResponse<SearchResult> = await response.json();
    return result.data || { count: 0, matches: [] };
  } catch (error) {
    console.error("Search API error:", error);
    return { count: 0, matches: [] };
  }
}
