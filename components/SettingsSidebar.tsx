"use client";

import { useSettings } from "@/lib/settings-context";
import { useState } from "react";

export default function SettingsSidebar() {
  const { settings, updateSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Settings Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-6 bottom-6 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#f4f1e9] text-[#8b7355] hover:bg-[#fbfaf5] transition-colors z-50"
        title="Settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[60] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 left-0 h-full w-96 bg-white border-r border-[#f4f1e9] z-[70] transition-transform duration-300 transform flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 border-b border-[#f4f1e9]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-[#3d3d3d]">Settings</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-[#3d3d3d]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="space-y-10">
            {/* Arabic Font Selection */}
            <div>
              <label className="block text-sm font-bold text-[#8b7355] uppercase tracking-widest mb-4">
                Arabic Font
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "font-amiri", label: "Amiri (Serif)" },
                  { id: "font-noto-arabic", label: "Noto Sans" },
                ].map((font) => (
                  <button
                    key={font.id}
                    onClick={() => updateSettings({ arabicFont: font.id })}
                    className={`px-4 py-3 rounded-xl border text-left transition-all ${
                      settings.arabicFont === font.id
                        ? "bg-[#f4f1e9] border-[#8b7355] text-[#8b7355]"
                        : "bg-white border-[#f4f1e9] text-zinc-500 hover:border-[#8b7355]/30"
                    }`}
                  >
                    <span className={font.id}>{font.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Arabic Font Size */}
            <div>
              <label className="block text-sm font-bold text-[#8b7355] uppercase tracking-widest mb-4">
                Arabic Font Size ({settings.arabicFontSize}px)
              </label>
              <input
                type="range"
                min="24"
                max="64"
                step="2"
                value={settings.arabicFontSize}
                onChange={(e) =>
                  updateSettings({ arabicFontSize: parseInt(e.target.value) })
                }
                className="w-full accent-[#8b7355]"
              />
            </div>

            {/* Translation Font Size */}
            <div>
              <label className="block text-sm font-bold text-[#8b7355] uppercase tracking-widest mb-4">
                Translation Font Size ({settings.translationFontSize}px)
              </label>
              <input
                type="range"
                min="14"
                max="32"
                step="1"
                value={settings.translationFontSize}
                onChange={(e) =>
                  updateSettings({ translationFontSize: parseInt(e.target.value) })
                }
                className="w-full accent-[#8b7355]"
              />
            </div>

            {/* Translation Selection */}
            <div>
              <label className="block text-sm font-bold text-[#8b7355] uppercase tracking-widest mb-4">
                Translation
              </label>
              <div className="grid grid-cols-1 gap-2 pr-2">
                {[
                  { id: "en.asad", label: "English (Asad)" },
                  { id: "bn.bengali", label: "Bengali (Official)" },
                  { id: "tr.diyanet", label: "Turkish (Diyanet)" },
                  { id: "fr.hamidullah", label: "French (Hamidullah)" },
                  { id: "hi.farooq", label: "Hindi (Farooq)" },
                  { id: "ur.jalandhry", label: "Urdu (Jalandhry)" },
                ].map((trans) => (
                  <button
                    key={trans.id}
                    onClick={() => updateSettings({ translation: trans.id })}
                    className={`px-4 py-3 rounded-xl border text-left transition-all ${
                      settings.translation === trans.id
                        ? "bg-[#f4f1e9] border-[#8b7355] text-[#8b7355]"
                        : "bg-white border-[#f4f1e9] text-zinc-500 hover:border-[#8b7355]/30"
                    }`}
                  >
                    {trans.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reciter Selection */}
            <div>
              <label className="block text-sm font-bold text-[#8b7355] uppercase tracking-widest mb-4">
                Reciter
              </label>
              <div className="grid grid-cols-1 gap-2 pr-2">
                {[
                  { id: "ar.alafasy", label: "Mishary Rashid Alafasy" },
                  { id: "ar.abdulsamad", label: "Abdul Basit Abdul Samad" },
                  { id: "ar.abdullahbasfar", label: "Abdullah Basfar" },
                  { id: "ar.abdurrahmaansudais", label: "Abdurrahman Al-Sudais" },
                  { id: "ar.shaatree", label: "Abu Bakr Al-Shatri" },
                  { id: "ar.hanirifai", label: "Hani Ar-Rifai" },
                  { id: "ar.husary", label: "Mahmoud Khalil Al-Husary" },
                  { id: "ar.minshawi", label: "Mohamed Siddiq Al-Minshawi" },
                ].map((reciter) => (
                  <button
                    key={reciter.id}
                    onClick={() => updateSettings({ reciter: reciter.id })}
                    className={`px-4 py-3 rounded-xl border text-left transition-all ${
                      settings.reciter === reciter.id
                        ? "bg-[#f4f1e9] border-[#8b7355] text-[#8b7355]"
                        : "bg-white border-[#f4f1e9] text-zinc-500 hover:border-[#8b7355]/30"
                    }`}
                  >
                    {reciter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
