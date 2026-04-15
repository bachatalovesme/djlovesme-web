import Link from "next/link";
import { getUpcomingGigs } from "@/lib/notion";
import GigRow from "@/components/GigRow";

export const revalidate = 300;

export default async function Home() {
  const upcoming = await getUpcomingGigs({ limit: 4 });

  return (
    <div className="relative">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        {/* ambient mesh blobs */}
        <div
          className="mesh-blob mesh-blob-pink pulse-slow"
          style={{ width: "520px", height: "520px", top: "-140px", left: "-140px" }}
          aria-hidden="true"
        />
        <div
          className="mesh-blob mesh-blob-blue pulse-slow"
          style={{ width: "620px", height: "620px", bottom: "-220px", right: "-180px", animationDelay: "2s" }}
          aria-hidden="true"
        />
        <div
          className="mesh-blob mesh-blob-gold"
          style={{ width: "400px", height: "400px", top: "40%", left: "55%" }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full grid md:grid-cols-12 gap-8 items-end">
          {/* Left — giant asymmetric headline */}
          <div className="md:col-span-8">
            <p className="eyebrow rise rise-1">
              · 001 / DJ · PRODUCER · SELECTOR
            </p>
            <h1 className="mt-6 font-display leading-[0.82]">
              <span className="rise rise-2 block text-7xl md:text-[10rem]">
                Music,
              </span>
              <span className="rise rise-3 block text-8xl md:text-[13rem] -mt-2 md:-mt-6 pl-[8vw] md:pl-[14vw]">
                with{" "}
                <span
                  className="font-serif italic normal-case text-grad neon"
                  style={{ fontStyle: "italic", textTransform: "none" }}
                >
                  love
                </span>
                <span className="text-grad">.</span>
              </span>
            </h1>
          </div>

          {/* Right — intimate confessional column */}
          <div className="md:col-span-4 rise rise-4">
            <p className="font-serif text-xl md:text-2xl leading-snug text-paper">
              I'm <span className="italic">Daniel</span> — on the decks as DJ
              Loves Me. Sets that move rooms, nights that feel like somewhere
              you want to be.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4 text-xs uppercase tracking-[0.22em] font-mono">
              <Link
                href="/gigs"
                className="btn-grad inline-flex items-center rounded-full px-6 py-3 font-semibold"
              >
                Upcoming gigs →
              </Link>
              <Link href="/about" className="link-gold py-3">
                About
              </Link>
            </div>
          </div>
        </div>

        {/* bottom gradient hairline fading into page */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bar-grad opacity-60 rise rise-5"
          aria-hidden="true"
        />
      </section>

      {/* ─── GIGS · vertical indexed list ─── */}
      <section className="relative border-t border-white/10 overflow-hidden">
        <div
          className="mesh-blob mesh-blob-purple"
          style={{ width: "500px", height: "500px", top: "10%", right: "-180px" }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <p className="eyebrow">· Next up</p>
              <h2 className="mt-3 font-display text-5xl md:text-8xl leading-[0.9]">
                Upcoming{" "}
                <span className="font-serif italic normal-case text-grad">
                  nights
                </span>
              </h2>
            </div>
            <Link
              href="/gigs"
              className="hidden md:inline-flex link-gold text-xs uppercase tracking-[0.22em] font-mono"
            >
              All gigs →
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <p className="text-paper-mute max-w-md font-serif text-lg">
              Nothing announced right now. Check back soon — or get in touch to
              book a date.
            </p>
          ) : (
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {upcoming.map((gig, i) => (
                <GigRow key={gig.id} gig={gig} index={i + 1} />
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* ─── BOOKING CTA ─── */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div
          className="mesh-blob mesh-blob-pink"
          style={{ width: "400px", height: "400px", top: "-100px", left: "20%" }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow">· 03 / Bookings</p>
            <h2 className="mt-3 font-display text-5xl md:text-8xl leading-[0.88] max-w-3xl">
              Have a night that needs a{" "}
              <span className="font-serif italic normal-case text-grad neon">
                soundtrack
              </span>
              ?
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <a
              href="mailto:bachatalovesme@gmail.com"
              className="btn-grad inline-flex items-center rounded-full px-8 py-4 font-semibold text-sm uppercase tracking-[0.22em] font-mono"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
