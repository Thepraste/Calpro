import { useState } from "react"
import { Menu, X } from "lucide-react"
import Brand from "./Brand"

const links = [
  { label: "Home", href: "#home" },
  { label: "Live TV", href: "#live" },
  { label: "Programme Schedule", href: "#schedule" },
  { label: "About", href: "#about" },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#FFC400]/15 bg-[#080808]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-16">
        <Brand />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative py-6 text-sm font-medium transition hover:text-[#FFC400] ${
                index === 0 ? "text-white after:absolute after:bottom-3 after:left-0 after:h-[3px] after:w-full after:bg-[#FFC400]" : "text-gray-200"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-md border border-white/15 p-2 text-white lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="border-t border-white/10 bg-[#080808] px-5 py-3 lg:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-white/5 py-3 text-sm text-gray-200 transition hover:text-[#FFC400]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Navbar
