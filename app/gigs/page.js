import { getUpcomingGigs, getPastGigs } from "@/lib/notion";
import GigRow from "@/components/GigRow";

export const metadata = { title: "Gigs" };
export const revalidate = 300;

export default async function GigsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingGigs({ limit: 50 }),
    getPastGigs({ limit: 50 }),
  ]);

  return (
    <div className="relative overflow-hidden">
      <div
        className="mesh-blob mesh-blob-purple"
        style={{ width: "600px", height: "600px", top: "-200px", right: "-200px" }}
        aria-hidden="true"
      />
      <div
        className="mesh-blob mesh-blob-blue"
        style={{ width: "500px", height: "500px", top: "40%", left: "-180px" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className="eyebrow rise rise-1">· Calendar</p>
        <h1 className="mt-3 font-display text-7xl md:text-[11rem] leading-[0.85] rise rise-2">
          <span className="text-grad">Gigs</span>
          <span className="font-serif italic normal-case text-paper">.</span>
        </h1>
        <p className="mt-8 max-w-xl font-serif text-xl text-paper-mute rise rise-3">
          Upcoming nights, past highlights. For bookings:{" "}
          <a className="link-gold" href="mailto:bachatalovesme@gmail.com">
            bachatalovesme@gmail.com
          </a>
          .
        </p>

        <section className="mt-16">
          <h2 className="eyebrow mb-6">· Upcoming</h2>
          {upcoming.length === 0 ? (
            <p className="font-serif text-lg text-paper-mute">
              Nothing announced right now. Check back soon.
            </p>
          ) : (
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {upcoming.map((gig, i) => (
                <GigRow key={gig.id} gig={gig} index={i + 1} />
              ))}
            </ol>
          )}
        </section>

        {past.length > 0 && (
          <section className="mt-24">
            <h2 className="eyebrow mb-6">· Past</h2>
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {past.map((gig, i) => (
                <GigRow key={gig.id} gig={gig} index={i + 1} />
              ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
}
