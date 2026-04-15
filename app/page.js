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
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-28 md:pb-32">
          <p className="eyebrow text-red">DJ · Producer · Selector</p>
          <h1 className="mt-6 font-display text-5xl md:text-8xl font-semibold leading-[0.95]">
            Music, with <span className="italic">love</span>
            <span className="text-red">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed opacity-85">
            I'm Daniel — known on the decks as{" "}
            <span className="font-display italic">DJ Loves Me</span>. I play
            sets that move rooms, and I build nights that feel like somewhere
            you want to be.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm">
            <Link
              href="/gigs"
              className="inline-flex items-center rounded-full bg-teal-900 text-paper px-5 py-3 font-medium hover:bg-red transition-colors"
            >
              See upcoming gigs →
            </Link>
            <Link href="/about" className="link-red font-medium py-3">
              About DJ Loves Me
            </Link>
          </div>
        </div>
      </section>

      {/* ─── UPCOMING GIGS ─── */}
      <section className="border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow text-red">Next up</p>
              <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold">
                Upcoming gigs
              </h2>
            </div>
            <Link href="/gigs" className="link-red text-sm">
              All gigs →
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <p className="opacity-70 max-w-md">
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
      <section className="border-t border-foreground/10 bg-paper-soft/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="eyebrow text-red">Bookings</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-semibold max-w-xl">
              Have a night that needs a soundtrack
              <span className="text-red">?</span>
            </h2>
          </div>
          <a
            href="mailto:bachatalovesme@gmail.com"
            className="inline-flex items-center rounded-full bg-teal-900 text-paper px-6 py-3 font-medium hover:bg-red transition-colors self-start"
          >
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
}
