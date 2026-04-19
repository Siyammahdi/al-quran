import { searchAyahs, getSurahs } from "@/lib/quran";
import Link from "next/link";
import GlobalSearch from "@/components/GlobalSearch";
import SearchContent from "@/components/SearchContent";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q: keyword } = await searchParams;

  if (!keyword) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-serif text-[#3d3d3d] mb-4 tracking-tight">Search Ayahs</h1>
        <div className="w-full max-w-lg">
          <GlobalSearch />
        </div>
        <Link href="/" className="mt-8 text-[#8b7355] font-bold uppercase tracking-widest text-sm hover:underline">
          Go back to home
        </Link>
      </div>
    );
  }

  const [results, surahs] = await Promise.all([
    searchAyahs(keyword),
    getSurahs(),
  ]);

  const matchedSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(keyword.toLowerCase()) ||
    s.number.toString() === keyword
  );

  return <SearchContent initialResults={results} keyword={keyword} matchedSurahs={matchedSurahs} />;
}
