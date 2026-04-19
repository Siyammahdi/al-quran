"use client";

export default function IslamicDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
      {/* Top Left Pattern */}
      <div className="absolute top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M100 0 L120 40 L160 40 L140 80 L160 120 L120 120 L100 160 L80 120 L40 120 L60 80 L40 40 L80 40 Z"
            className="text-[#8b7355]"
          />
        </svg>
      </div>

      {/* Bottom Right Pattern */}
      <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/2 translate-y-1/2">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M100 0 L120 40 L160 40 L140 80 L160 120 L120 120 L100 160 L80 120 L40 120 L60 80 L40 40 L80 40 Z"
            className="text-[#8b7355]"
          />
        </svg>
      </div>

      {/* Center Pattern (very faint) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.2]">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic" patternUnits="userSpaceOnUse" width="20" height="20">
              <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#8b7355]" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#islamic)" />
        </svg>
      </div>
    </div>
  );
}
