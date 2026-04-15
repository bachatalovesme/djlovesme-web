import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
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
    <header className="border-b border-foreground/10">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-xl md:text-2xl font-semibold tracking-tight"
        >
          DJ Loves Me<span className="text-red">.</span>
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 text-sm">
          <Link href="/gigs" className="link-red">
            Gigs
          </Link>
          <Link href="/about" className="link-red">
            About
          </Link>
          <a
            href="mailto:bachatalovesme@gmail.com"
            className="inline-flex items-center rounded-full bg-teal-900 text-paper px-4 py-2 text-sm font-medium hover:bg-red transition-colors"
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
    <footer className="mt-24 border-t border-foreground/10">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between text-sm">
        <div>
          <p className="font-display text-2xl">
            DJ Loves Me<span className="text-red">.</span>
          </p>
          <p className="mt-1 opacity-70">
            © {new Date().getFullYear()} — all rights reserved.
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-1 opacity-80">
          <a className="link-red" href="mailto:bachatalovesme@gmail.com">
            bachatalovesme@gmail.com
          </a>
          <span className="opacity-60">Bookings & press</span>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
