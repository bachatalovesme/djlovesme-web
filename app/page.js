import Link from "next/link";
import { getUpcomingGigs } from "@/lib/notion";
import GigCard from "@/components/GigCard";

export const revalidate = 300; // 5 min ISR

export default async function Home() {
  const upcoming = await getUpcomingGigs({ limit: 3 });

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        {/* ambient warm glow behind hero */}
        <div
          className="glow-gold absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-32 md:pb-36">
          <p className="eyebrow">DJ · Producer · Selector</p>
          <h1 className="mt-6 font-display text-6xl md:text-9xl leading-[0.9]">
            Music,<br className="md:hidden" /> with{" "}
            <span className="text-grad">love</span>.
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-paper-mute">
            I'm Daniel — on the decks as{" "}
            <span className="text-paper font-semibold">DJ Loves Me</span>. Sets
            that move rooms, nights that feel like somewhere you want to be.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm uppercase tracking-widest">
            <Link
              href="/gigs"
              className="btn-grad inline-flex items-center rounded-full px-6 py-3 font-semibold"
            >
              See upcoming gigs →
            </Link>
            <Link href="/about" className="link-gold font-semibold py-3">
              About DJ Loves Me
            </Link>
          </div>
        </div>
      </section>

      {/* ─── UPCOMING GIGS ─── */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow">Next up</p>
              <h2 className="mt-2 font-display text-4xl md:text-6xl">
                Upcoming gigs
              </h2>
            </div>
            <Link
              href="/gigs"
              className="link-gold text-sm uppercase tracking-widest font-semibold"
            >
              All gigs →
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <p className="text-paper-mute max-w-md">
              No gigs announced right now. Check back soon, or get in touch to
              book a date.
            </p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-3">
              {upcoming.map((gig) => (
                <li key={gig.id}>
                  <GigCard gig={gig} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ─── BOOKING CTA ─── */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="eyebrow">Bookings</p>
            <h2 className="mt-2 font-display text-4xl md:text-6xl max-w-xl leading-[0.95]">
              Have a night that needs a{" "}
              <span className="text-grad">soundtrack</span>?
            </h2>
          </div>
          <a
            href="mailto:bachatalovesme@gmail.com"
            className="btn-grad inline-flex items-center rounded-full px-6 py-3 font-semibold text-sm uppercase tracking-widest self-start"
          >
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
}
