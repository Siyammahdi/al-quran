export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fbfaf5] items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-[#f4f1e9] border-t-[#8b7355] animate-spin mb-6 shadow-sm"></div>
      <p className="text-[#8b7355] font-serif italic text-lg animate-pulse tracking-wide">Seeking peace...</p>
    </div>
  );
}
