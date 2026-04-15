import { getUpcomingGigs, getPastGigs } from "@/lib/notion";
import GigCard from "@/components/GigCard";

export const metadata = { title: "Gigs" };
export const revalidate = 300;

export default async function GigsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingGigs({ limit: 50 }),
    getPastGigs({ limit: 50 }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="eyebrow text-red">Calendar</p>
      <h1 className="mt-2 font-display text-5xl md:text-7xl font-semibold leading-[0.95]">
        Gigs<span className="text-red">.</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg opacity-85">
        Upcoming nights, past highlights. For bookings:{" "}
        <a className="link-red" href="mailto:bachatalovesme@gmail.com">
          bachatalovesme@gmail.com
        </a>
        .
      </p>

      {/* ─── UPCOMING ─── */}
      <section className="mt-14">
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">
          Upcoming
        </h2>
        {upcoming.length === 0 ? (
          <p className="opacity-70">
            Nothing announced right now. Check back soon.
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
      </section>

      {/* ─── PAST ─── */}
      {past.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">
            Past
          </h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {past.map((gig) => (
              <li key={gig.id}>
                <GigCard gig={gig} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
