"use client";

import { SearchResult, Surah } from "@/types/quran";
import { useSettings } from "@/lib/settings-context";
import { searchAyahs } from "@/lib/quran";
import { useState, useEffect } from "react";
import Link from "next/link";
import GlobalSearch from "@/components/GlobalSearch";
import IslamicDecor from "./IslamicDecor";

interface SearchContentProps {
  initialResults: SearchResult;
  keyword: string;
  matchedSurahs: Surah[];
}

export default function SearchContent({ initialResults, keyword, matchedSurahs }: SearchContentProps) {
  const { settings } = useSettings();
  const [results, setResults] = useState<SearchResult>(initialResults);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if current edition matches selected setting
    const currentEdition = results.matches[0]?.edition?.identifier;
    if (settings.translation !== currentEdition) {
      setIsLoading(true);
      searchAyahs(keyword, settings.translation)
        .then(setResults)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [settings.translation, keyword, results.matches]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfaf5]">
      <header className="py-12 px-6 border-b border-[#f4f1e9] bg-white sticky top-0 z-30 overflow-hidden">
        <IslamicDecor />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <Link href="/" className="text-[#8b7355] font-bold uppercase tracking-widest text-sm hover:underline flex items-center gap-2">
            ← Home
          </Link>
          <div className="flex-1 max-w-lg">
            <GlobalSearch />
          </div>
          <div className="text-sm text-zinc-400 font-bold uppercase tracking-widest">
            {matchedSurahs.length > 0 ? `${matchedSurahs.length} Surahs, ` : ""}{results.count} Ayahs
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full py-16 px-6">
        <h1 className="text-3xl font-serif text-[#3d3d3d] mb-12 border-b border-[#f4f1e9] pb-6">
          Results for "{keyword}"
        </h1>

        {/* Surah Matches Section */}
        {matchedSurahs.length > 0 && (
          <div className="mb-20">
            <h2 className="text-sm font-bold text-[#8b7355] uppercase tracking-[0.2em] mb-8">Matching Surahs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedSurahs.map(surah => (
                <Link
                  key={surah.number}
                  href={`/surah/${surah.number}`}
                  className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#f4f1e9] hover:border-[#8b7355]/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#fbfaf5] text-[#8b7355] font-bold text-xs">
                      {surah.number}
                    </span>
                    <span className="font-bold text-[#3d3d3d] group-hover:text-[#8b7355] transition-colors">
                      {surah.englishName}
                    </span>
                  </div>
                  <span className="font-amiri text-xl text-[#3d3d3d] group-hover:text-[#8b7355] transition-colors">
                    {surah.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Ayah Matches Section */}
        <div className="flex flex-col gap-16">
          {results.count > 0 && (
            <h2 className="text-sm font-bold text-[#8b7355] uppercase tracking-[0.2em]">Matching Ayahs</h2>
          )}
          
          {results.matches.map((match) => (
            <div key={`${match.surah.number}-${match.numberInSurah}`} className="group">
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between">
                  <Link
                    href={`/surah/${match.surah.number}`}
                    className="flex items-center gap-3 text-[#8b7355] hover:underline font-bold uppercase tracking-widest text-xs"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f4f1e9]">
                      {match.surah.number}
                    </span>
                    {match.surah.englishName}
                  </Link>
                  <span className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
                    Ayah {match.numberInSurah}
                  </span>
                </div>
                
                <div className="pl-11">
                  <p 
                    className={`text-zinc-600 leading-relaxed italic mb-6 opacity-90 ${isLoading ? 'animate-pulse' : ''}`}
                    style={{ fontSize: `${settings.translationFontSize}px` }}
                  >
                    {match.text}
                  </p>
                  <Link
                    href={`/surah/${match.surah.number}`}
                    className="text-[10px] font-bold text-[#8b7355] uppercase tracking-[0.2em] hover:text-[#7a654a] transition-colors border border-[#f4f1e9] px-4 py-2 rounded-full"
                  >
                    View in Surah →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {results.count === 0 && matchedSurahs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#f4f1e9]">
              <p className="text-zinc-400 italic text-lg mb-4">No results found matching your search.</p>
              <p className="text-zinc-300 text-sm">Try searching for something else like "mercy" or "gratitude".</p>
            </div>
          )}
        </div>
      </main>

      <footer className="py-12 text-center border-t border-[#f4f1e9] bg-white mt-auto relative z-10">
        <p className="text-[#8b7355] text-sm font-bold tracking-widest uppercase">
          Developed by Siyam Mahdi
        </p>
      </footer>
    </div>
  );
}
