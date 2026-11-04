function Brand({ footer = false }) {
  return (
    <a href="#home" className={`inline-flex items-center gap-3 ${footer ? "flex-col items-start gap-1" : ""}`}>
      {/* A lightweight temporary feather mark. Replace this with the official logo SVG when available. */}
      <svg viewBox="0 0 54 54" className="h-11 w-11 shrink-0" aria-hidden="true">
        <path d="M24 45C8 34 8 20 22 7c2 12 7 22 2 38Z" fill="#F5B800"/>
        <path d="M27 44C17 27 22 13 38 4c-1 14-3 27-11 40Z" fill="#E94426"/>
        <path d="M29 44C26 25 35 13 49 10c-4 15-9 26-20 34Z" fill="#168C58"/>
        <path d="M22 44C8 39 3 29 8 17c8 8 14 16 14 27Z" fill="#F2D21B"/>
        <path d="M17 46c9-7 17-10 29-11" fill="none" stroke="#E7A900" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <span>
        <span className="block text-[23px] font-black leading-none tracking-tight text-white">
          CALIFEST<span className="text-[#FFC400]">TV</span>
        </span>
        <span className="mt-1 block text-[8px] font-semibold tracking-[0.22em] text-gray-300">
          CULTURE · PEOPLE · FESTIVALS
        </span>
      </span>
    </a>
  )
}

export default Brand
