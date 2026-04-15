import { Bebas_Neue, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "DJ Loves Me",
    template: "%s · DJ Loves Me",
  },
  description:
    "DJ Loves Me — sets, gigs and flyers. Book, follow or just listen.",
  openGraph: {
    title: "DJ Loves Me",
    description: "Sets, gigs and flyers.",
    type: "website",
  },
};

function Header() {
  return (
    <header className="relative">
      {/* gradient hairline at the very top */}
      <div className="bar-grad h-[2px] w-full" aria-hidden="true" />
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-5">
        <Link href="/" aria-label="DJ Loves Me — home" className="block">
          {/* Swap /logo.png for /logo.svg when available. The image sits on black so it blends with the page ground. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt="DJ Loves Me"
            className="h-10 w-auto md:h-12"
          />
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 text-sm uppercase tracking-widest">
          <Link href="/gigs" className="link-gold font-semibold">
            Gigs
          </Link>
          <Link href="/about" className="link-gold font-semibold">
            About
          </Link>
          <a
            href="mailto:bachatalovesme@gmail.com"
            className="btn-grad inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold"
          >
            Book
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between text-sm">
        <div>
          <p className="font-display text-3xl">
            DJ <span className="text-grad">LOVES ME</span>
          </p>
          <p className="mt-1 text-paper-mute">
            © {new Date().getFullYear()} — all rights reserved.
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-1 text-paper-mute">
          <a className="link-gold text-paper" href="mailto:bachatalovesme@gmail.com">
            bachatalovesme@gmail.com
          </a>
          <span>Bookings &amp; press</span>
        </div>
      </div>
      <div className="bar-grad h-[2px] w-full" aria-hidden="true" />
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
