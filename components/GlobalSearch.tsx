"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSurahs } from "@/lib/quran";
import { Surah } from "@/types/quran";

export default function GlobalSearch() {
  const [keyword, setKeyword] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch Surahs for suggestions and quick navigation
    getSurahs().then(setSurahs).catch(console.error);

    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = keyword.trim().toLowerCase();
    if (!query) return;

    // 1. Check if it's a Surah number (1-114)
    const surahNumber = parseInt(query);
    if (!isNaN(surahNumber) && surahNumber >= 1 && surahNumber <= 114) {
      router.push(`/surah/${surahNumber}`);
      setShowSuggestions(false);
      return;
    }

    // 2. Check if it's an exact Surah name (English)
    const exactSurah = surahs.find(s => 
      s.englishName.toLowerCase() === query || 
      s.englishName.toLowerCase().replace(/[^a-z0-9]/g, '') === query.replace(/[^a-z0-9]/g, '')
    );
    if (exactSurah) {
      router.push(`/surah/${exactSurah.number}`);
      setShowSuggestions(false);
      return;
    }

    // 3. Otherwise, go to the Ayah search page
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
    setShowSuggestions(false);
  };

  const handleSurahClick = (number: number) => {
    router.push(`/surah/${number}`);
    setKeyword("");
    setShowSuggestions(false);
  };

  const handleKeywordClick = (word: string) => {
    setKeyword(word);
    router.push(`/search?q=${encodeURIComponent(word)}`);
    setShowSuggestions(false);
  };

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(keyword.toLowerCase()) ||
    s.number.toString() === keyword
  ).slice(0, 5);

  const keywords = ["Mercy", "Patience", "Gratitude", "Paradise", "Prayer", "Fast", "Zakat"]
    .filter(k => k.toLowerCase().includes(keyword.toLowerCase()))
    .slice(0, 3);

  return (
    <div ref={wrapperRef} className="relative max-w-lg mx-auto w-full">
      <form onSubmit={handleSearch} className="relative group">
        <input
          type="text"
          placeholder="Search Surah or Ayahs..."
          value={keyword}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full px-8 py-5 rounded-full bg-white border border-[#f4f1e9] focus:outline-none focus:border-[#8b7355] transition-all text-[#3d3d3d] placeholder:text-zinc-400 text-lg"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#8b7355] text-white hover:bg-[#7a654a] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (keyword.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#f4f1e9] rounded-2xl overflow-hidden z-[99999] shadow-2xl shadow-[#8b7355]/20">
          {/* Surah Matches */}
          {filteredSurahs.length > 0 && (
            <div className="border-b border-[#f4f1e9]">
              <div className="p-3 bg-[#fbfaf5]">
                <span className="text-[10px] font-bold text-[#8b7355] uppercase tracking-[0.2em]">Surahs</span>
              </div>
              {filteredSurahs.map((surah) => (
                <button
                  key={surah.number}
                  onClick={() => handleSurahClick(surah.number)}
                  className="w-full text-left px-6 py-3 hover:bg-[#fbfaf5] text-[#3d3d3d] text-sm transition-colors border-b border-[#fbfaf5] last:border-0 flex items-center justify-between"
                >
                  <span className="font-medium">{surah.number}. {surah.englishName}</span>
                  <span className="font-amiri text-lg">{surah.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Topic Matches */}
          {keywords.length > 0 && (
            <div>
              <div className="p-3 bg-[#fbfaf5]">
                <span className="text-[10px] font-bold text-[#8b7355] uppercase tracking-[0.2em]">Ayah Search</span>
              </div>
              {keywords.map((word) => (
                <button
                  key={word}
                  onClick={() => handleKeywordClick(word)}
                  className="w-full text-left px-6 py-3 hover:bg-[#fbfaf5] text-[#3d3d3d] text-sm transition-colors border-b border-[#fbfaf5] last:border-0"
                >
                  Search for "{word}" in Ayahs
                </button>
              ))}
            </div>
          )}

          {filteredSurahs.length === 0 && keywords.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-zinc-400 text-sm italic">Press Enter to search for "{keyword}" in Ayahs</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
