
import Brand from "./Brand"

const quickLinks = [
  ["Home", "#home"],
  ["Live TV", "#live"],
  ["Programme Schedule", "#schedule"],
  ["About", "#about"],
]

function Footer() {
  return (
    <footer className="bg-[#080808] text-white">

      {/* MAIN FOOTER CONTENT */}
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-10 sm:px-8 md:grid-cols-3 lg:px-16">

        {/* BRAND */}
        <div className="flex items-center border-b border-white/20 pb-8 md:border-b-0 md:border-r md:pb-0">
          <Brand footer />
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="mb-4 text-sm font-extrabold">
            Quick Links
          </h3>

          <ul className="space-y-2">
            {quickLinks.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm text-gray-300 transition hover:text-[#FFC400]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="mb-4 text-sm font-extrabold">
            Follow Us
          </h3>

          {/* 
            IMPORTANT:
            These are temporary social labels, not official logos.
            We can replace them with proper SVG brand icons later.
          */}
          <div className="flex items-center gap-3">

            <a
              href="#"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-xs font-black text-white hover:opacity-80"
            >
              YT
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-black text-white hover:opacity-80"
            >
              f
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-600 text-xs font-black text-white hover:opacity-80"
            >
              IG
            </a>

            <a
              href="#"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#202020] text-lg font-black text-white hover:opacity-80"
            >
              ♪
            </a>

          </div>

          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-300">
            Follow us for updates, highlights and exclusive content.
          </p>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-5 py-4 text-xs text-gray-300 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-16">

          <p>
            © {new Date().getFullYear()} Califest TV. All Rights Reserved.
          </p>

          <p className="font-bold italic text-[#FFC400]">
            Culture Beyond Boundaries.
          </p>

        </div>
      </div>

      {/* AFRICAN-INSPIRED DECORATIVE FOOTER STRIP */}
      <div
        className="h-4 w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #e31b23 0 5px, #080808 5px 10px, #ffc400 10px 15px, #080808 15px 20px, #17864b 20px 25px, #080808 25px 30px)",
        }}
      />

    </footer>
  )
}

export default Footer
