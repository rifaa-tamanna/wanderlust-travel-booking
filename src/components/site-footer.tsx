import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const columns = [
  {
    heading: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Destinations", href: "#destinations" },
      { label: "My Bookings", href: "#bookings" },
      { label: "My Profile", href: "#profile" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "#help" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125M7.119 20.452H3.554V9h3.565zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-6 md:px-6">
        {/* Brand */}
        <h2 className="font-display text-5xl font-bold md:text-[72px] md:leading-none">
          Wanderlast
        </h2>
        <p className="mt-4 text-sm text-white/80">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        {/* Link columns */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-medium tracking-[0.08em] uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-xs text-white/70">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-4 flex w-full max-w-72 items-center bg-[#2e2e2e]">
              <input
                type="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/60"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-4 py-3 text-white transition-colors hover:text-[#00a6c0]"
              >
                <ArrowUpRight className="size-4" strokeWidth={2} />
              </button>
            </form>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-medium tracking-[0.08em] uppercase">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/85 transition-colors hover:text-[#00a6c0]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium tracking-[0.08em] uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              <li>
                <a
                  href="tel:+17869011622"
                  className="transition-colors hover:text-[#00a6c0]"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderland.com"
                  className="transition-colors hover:text-[#00a6c0]"
                >
                  info@wanderland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center">
          <p className="text-xs text-white/70">
            © 2026 Wanderlast. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" aria-label="X (Twitter)" className="text-white transition-opacity hover:opacity-70">
              <XIcon className="size-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-white transition-opacity hover:opacity-70">
              <LinkedInIcon className="size-4" />
            </a>
            <a href="#" aria-label="Instagram" className="text-white transition-opacity hover:opacity-70">
              <InstagramIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
