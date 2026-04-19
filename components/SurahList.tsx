"use client";

import Link from "next/link";
import { Surah } from "@/types/quran";

interface SurahListProps {
  initialSurahs: Surah[];
}

export default function SurahList({ initialSurahs }: SurahListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initialSurahs.map((surah) => (
        <Link
          key={surah.number}
          href={`/surah/${surah.number}`}
          className="group flex items-center justify-between p-6 rounded-2xl bg-white border border-[#f4f1e9] hover:border-[#8b7355]/30 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#fbfaf5] text-[#8b7355] font-medium text-sm border border-[#f4f1e9]">
              {surah.number}
            </div>
            <div>
              <h2 className="font-semibold text-[#3d3d3d] group-hover:text-[#8b7355] transition-colors">
                {surah.englishName}
              </h2>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">
                {surah.revelationType} • {surah.numberOfAyahs} Ayahs
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-amiri text-2xl text-[#3d3d3d] group-hover:text-[#8b7355] transition-colors">
              {surah.name}
            </span>
            <p className="text-[10px] text-zinc-400 mt-1 italic">
              {surah.englishNameTranslation}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
