function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[480px] overflow-hidden bg-[#13090b]">
      {/* Full-bleed carnival image with a dark left-side overlay for readable text. */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-[center_35%]"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJD2crFXKZbGexrBi8VFmrxoyzmFpXRfIIX-kevqPSGQ&s=10')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#100609] via-[#17080c]/90 to-[#17080c]/10" />
      <div className="absolute inset-0 -z-10 bg-black/15" />

      {/* Subtle African-inspired pattern on the left edge. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-0 hidden w-16 opacity-20 sm:block"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent 0 9px, #b58a32 10px 12px, transparent 13px 22px)" }}
      />

      <div className="relative mx-auto flex min-h-[480px] w-full max-w-[1440px] items-center px-5 py-16 sm:px-8 lg:px-20">
        <div className="max-w-[540px]">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[#FFC400] sm:text-base">
            Welcome to Califest TV
          </p>

          <h1 className="text-[clamp(3.1rem,7vw,5.5rem)] font-black leading-[0.91] tracking-[-0.045em] text-white">
            Culture.
            <br />
            Colour.
            <br />
            <span className="text-[#FFC400]">Celebration.</span>
          </h1>

          <p className="mt-5 max-w-[470px] text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
            Experience Carnival Calabar, African culture, festivals and the people who bring our heritage to life.
            Your window into African creativity and celebration.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <a
              href="#live"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#FFC400] px-7 py-3 text-sm font-extrabold text-black transition hover:bg-yellow-300"
            >
              <span className="text-lg">▶</span>
              WATCH LIVE
            </a>
            <a
              href="#schedule"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#FFC400] px-7 py-3 text-sm font-extrabold text-white transition hover:bg-[#FFC400] hover:text-black"
            >
              EXPLORE PROGRAMMES
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
