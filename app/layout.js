import { Bebas_Neue, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "DJ Loves Me",
    template: "%s · DJ Loves Me",
  },
  description:
    "DJ Loves Me — late nights, warm rooms, sensual sets. Bookings worldwide.",
  openGraph: {
    title: "DJ Loves Me",
    description: "Late nights, warm rooms, sensual sets.",
    type: "website",
  },
};

function Header() {
  return (
    <header className="relative z-30">
      <div className="bar-grad h-[1px] w-full" aria-hidden="true" />
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5">
        <Link href="/" aria-label="DJ Loves Me — home" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="DJ Loves Me"
            className="h-10 w-auto md:h-12"
          />
        </Link>
        <nav className="flex items-center gap-6 md:gap-10 text-xs md:text-sm uppercase tracking-[0.22em] font-mono">
          <Link href="/gigs" className="link-gold">
            Gigs
          </Link>
          <Link href="/about" className="link-gold">
            About
          </Link>
          <a
            href="mailto:bachatalovesme@gmail.com"
            className="btn-grad inline-flex items-center rounded-full px-5 py-2 font-semibold tracking-[0.2em]"
          >
            Book
          </a>
        </nav>
      </div>
    </header>
  );
}

function MarqueeFooter() {
  const phrases = [
    "DJ LOVES ME",
    "★",
    "LATE NIGHTS · WARM ROOMS",
    "★",
    "BOOKINGS WORLDWIDE",
    "★",
    "BACHATA · HOUSE · AFTERS",
    "★",
  ];
  // Duplicate content so the keyframe can translateX(-50%) seamlessly
  const content = [...phrases, ...phrases];
  return (
    <div className="relative overflow-hidden py-6 border-y border-white/10 bg-ink">
      <div className="marquee">
        {content.map((p, i) => (
          <span
            key={i}
            className="font-display text-4xl md:text-6xl mx-8 whitespace-nowrap"
          >
            {p === "★" ? (
              <span className="text-grad">★</span>
            ) : (
              <span className={i % 4 === 0 ? "text-grad" : "text-paper"}>
                {p}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative mt-24">
      <MarqueeFooter />
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between text-sm font-mono">
        <div>
          <p className="font-display text-3xl">
            DJ <span className="text-grad">LOVES ME</span>
          </p>
          <p className="mt-2 text-paper-mute text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-1 text-xs tracking-widest uppercase">
          <a className="link-gold" href="mailto:bachatalovesme@gmail.com">
            bachatalovesme@gmail.com
          </a>
          <span className="text-paper-mute">Bookings &amp; press</span>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${instrument.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper relative">
        <Header />
        <main className="flex-1 relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
