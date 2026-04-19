import { getSurahs } from "@/lib/quran";
import SurahList from "@/components/SurahList";
import GlobalSearch from "@/components/GlobalSearch";
import IslamicDecor from "@/components/IslamicDecor";

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfaf5]">
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <IslamicDecor />
        
        {/* Header & Search Area */}
        <div className="pt-32 pb-16 px-6 text-center bg-[#f4f1e9] relative z-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-6xl text-[#3d3d3d] mb-4 tracking-tight">Al-Quran</h1>
            <p className="text-[#8b7355] italic text-xl mb-12 font-medium">Seek knowledge, find peace</p>
            <GlobalSearch />
          </div>
        </div>

        {/* Surah List Area */}
        <div className="max-w-7xl mx-auto w-full pb-24 px-2 -mt-8 relative z-10 pt-12">
          <div className="bg-[#fbfaf5] rounded-[2rem] p-2 md:p-6 ">
            <div className="mb-10 flex items-center justify-between border-b border-[#f4f1e9] pb-6">
              <h2 className="text-2xl font-serif text-[#3d3d3d]">Browse Surahs</h2>
              <div className="text-sm text-zinc-400 font-medium uppercase tracking-widest">114 Chapters</div>
            </div>
            <SurahList initialSurahs={surahs} />
          </div>
        </div>
      </main>

      <footer className="py-16 text-center border-t border-[#f4f1e9] bg-white relative z-20">
        <p className="text-[#8b7355] text-sm font-bold tracking-widest uppercase">
          Developed by Siyam Mahdi
        </p>
      </footer>
    </div>
  );
}
