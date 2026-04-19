import { getSurahWithTranslation } from "@/lib/quran";
import SurahContent from "@/components/SurahContent";

interface PageProps {
  params: Promise<{ number: string }>;
}

export default async function SurahPage({ params }: PageProps) {
  const { number } = await params;
  const { surah, translation, audio } = await getSurahWithTranslation(parseInt(number));

  return <SurahContent surah={surah} initialTranslation={translation} initialAudio={audio} />;
}
