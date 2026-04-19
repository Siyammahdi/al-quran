"use client";

import { SurahDetail, Ayah } from "@/types/quran";
import { useSettings } from "@/lib/settings-context";
import { getSurahDetail } from "@/lib/quran";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import IslamicDecor from "./IslamicDecor";

interface SurahContentProps {
  surah: SurahDetail;
  initialTranslation: SurahDetail;
  initialAudio: SurahDetail;
}

export default function SurahContent({ surah, initialTranslation, initialAudio }: SurahContentProps) {
  const { settings } = useSettings();
  const [translation, setTranslation] = useState<SurahDetail>(initialTranslation);
  const [audioData, setAudioData] = useState<SurahDetail>(initialAudio);
  const [isLoading, setIsLoading] = useState(false);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isAutoPlayingRef = useRef(false);

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.ontimeupdate = null;
      }
    };
  }, []);

  useEffect(() => {
    // Update translation if setting changes
    if (settings.translation !== translation.edition.identifier) {
      setIsLoading(true);
      getSurahDetail(surah.number, settings.translation)
        .then((data) => {
          if (data && data.ayahs) {
            setTranslation(data);
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [settings.translation, surah.number, translation.edition.identifier]);

  useEffect(() => {
    // Update audio if reciter changes
    if (settings.reciter !== audioData.edition.identifier) {
      getSurahDetail(surah.number, settings.reciter)
        .then((data) => {
          if (data && data.ayahs) {
            setAudioData(data);
          }
        })
        .catch(console.error);
    }
  }, [settings.reciter, surah.number]);

  const playAyah = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.ontimeupdate = null;
    }
    const audioUrl = audioData.ayahs[index].audio;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setPlayingAyah(index);
    setProgress(0);

    audio.ontimeupdate = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(p || 0);
    };

    audio.play();

    audio.onended = () => {
      setPlayingAyah(null);
      setProgress(0);
      if (isAutoPlayingRef.current && index < surah.ayahs.length - 1) {
        playAyah(index + 1);
      } else {
        setIsAutoPlaying(false);
        isAutoPlayingRef.current = false;
      }
    };
  };

  const togglePlayAll = () => {
    if (isAutoPlayingRef.current) {
      setIsAutoPlaying(false);
      isAutoPlayingRef.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.ontimeupdate = null;
      }
      setPlayingAyah(null);
      setProgress(0);
    } else {
      setIsAutoPlaying(true);
      isAutoPlayingRef.current = true;
      playAyah(0);
    }
  };

  const toggleAyah = (index: number) => {
    if (playingAyah === index) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.ontimeupdate = null;
      }
      setPlayingAyah(null);
      setProgress(0);
      setIsAutoPlaying(false);
      isAutoPlayingRef.current = false;
    } else {
      setIsAutoPlaying(false);
      isAutoPlayingRef.current = false;
      playAyah(index);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfaf5]">
      <header className="py-12 px-6 text-center border-b border-[#f4f1e9] bg-white sticky top-0 z-30 overflow-hidden">
        <IslamicDecor />
        <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">
          <Link
            href="/"
            className="text-sm font-bold text-[#8b7355] hover:text-[#7a654a] transition-colors flex items-center gap-2 group uppercase tracking-widest"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-amiri text-[#3d3d3d] mb-1">{surah.name}</h1>
            <p className="text-[#8b7355] italic text-sm font-medium">
              {surah.englishName} — {surah.englishNameTranslation}
            </p>
          </div>
          <button
            onClick={togglePlayAll}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
              isAutoPlaying 
                ? "bg-[#8b7355] text-white" 
                : "bg-[#f4f1e9] text-[#8b7355] hover:bg-[#8b7355] hover:text-white"
            }`}
            title={isAutoPlaying ? "Stop Audio" : "Listen to Surah"}
          >
            {isAutoPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full py-20 px-6">
        {surah.number !== 9 && (
          <div className="text-center mb-24 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#f4f1e9] -z-10"></div>
            <p className={`text-[#3d3d3d] bg-[#fbfaf5] inline-block px-12 relative z-10 ${settings.arabicFont}`} style={{ fontSize: `${settings.arabicFontSize + 8}px` }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        )}

        <div className="flex flex-col gap-16">
          {surah.ayahs.map((ayah, index) => {
            let ayahText = ayah.text;
            const bismillah = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
            if (surah.number !== 1 && surah.number !== 9 && index === 0 && ayahText.startsWith(bismillah)) {
              ayahText = ayahText.replace(bismillah, "").trim();
            }

            return (
              <div
                key={ayah.number}
                className={`group relative pb-16 border-b border-[#f4f1e9] last:border-0 transition-colors ${
                  playingAyah === index ? "bg-[#f4f1e9]/30 rounded-3xl px-8 -mx-8 mt-4" : ""
                }`}
              >
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col md:flex-row items-end md:items-start justify-between gap-8 pt-8 relative">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#f4f1e9] text-[#8b7355] text-xs font-bold border border-[#f4f1e9]">
                        {ayah.numberInSurah}
                      </div>

                      <button
                        onClick={() => toggleAyah(index)}
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-all shadow-sm ${
                          playingAyah === index
                            ? "bg-[#8b7355] text-white"
                            : "bg-white text-[#8b7355] border border-[#f4f1e9] hover:bg-[#f4f1e9]"
                        }`}
                        title="Listen to Ayah"
                      >
                        {playingAyah === index ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        )}
                      </button>
                    </div>

                    <div className="flex-1 flex flex-col gap-6">
                      <p 
                        className={`text-right text-[#3d3d3d] tracking-wide antialiased leading-[2.8] ${settings.arabicFont}`}
                        style={{ fontSize: `${settings.arabicFontSize}px` }}
                      >
                        {ayahText}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pl-0 md:pl-20">
                    <p 
                      className={`text-[#3d3d3d] leading-relaxed antialiased opacity-90 ${isLoading ? 'animate-pulse' : ''}`}
                      style={{ fontSize: `${settings.translationFontSize}px` }}
                    >
                      {translation.ayahs[index].text}
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-2 font-bold uppercase tracking-widest italic">
                      — {translation.edition.name}
                    </p>
                  </div>
                </div>

                {/* Audio Progress Bar - Absolutely Positioned at bottom */}
                {playingAyah === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f4f1e9] overflow-hidden">
                    <div 
                      className="h-full bg-[#8b7355] transition-all duration-300 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="py-20 text-center border-t border-[#f4f1e9] bg-white mt-12 relative z-10">
        <div className="flex justify-center items-center gap-12 text-sm font-bold text-[#8b7355] uppercase tracking-[0.2em]">
          {surah.number > 1 && (
            <Link href={`/surah/${surah.number - 1}`} className="hover:text-[#7a654a] transition-colors flex items-center gap-3 group">
              <span className="transition-transform group-hover:-translate-x-1">←</span> Previous
            </Link>
          )}
          <div className="w-2 h-2 rounded-full bg-[#f4f1e9]"></div>
          {surah.number < 114 && (
            <Link href={`/surah/${surah.number + 1}`} className="hover:text-[#7a654a] transition-colors flex items-center gap-3 group">
              Next <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>
        <p className="text-[#8b7355] text-sm font-bold tracking-widest uppercase mt-12">
          Developed by Siyam Mahdi
        </p>
      </footer>
    </div>
  );
}
