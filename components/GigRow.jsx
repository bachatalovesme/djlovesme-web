import Image from "next/image";

function formatDate(iso) {
  if (!iso) return { day: "—", month: "TBA", year: "" };
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
    year: d.toLocaleDateString("en-GB", { year: "numeric" }),
  };
}

function formatTime(iso) {
  if (!iso || iso.length <= 10) return null;
  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

/**
 * GigRow — horizontal row layout with big index + date block + title + rotated flyer.
 * Replaces the old grid-of-cards pattern for a more distinctive editorial feel.
 */
export default function GigRow({ gig, index = 1 }) {
  const { day, month, year } = formatDate(gig.date);
  const time = formatTime(gig.date);
  const location = [gig.city, gig.country].filter(Boolean).join(", ");
  const rotation = index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]";

  return (
    <li className="group relative grid grid-cols-12 gap-4 md:gap-8 py-6 md:py-10 items-center hover:bg-white/[0.02] transition-colors">
      {/* Index */}
      <div className="col-span-2 md:col-span-1 font-mono text-paper-mute text-xs md:text-sm tracking-widest">
        {String(index).padStart(2, "0")}
      </div>

      {/* Date block */}
      <div className="col-span-4 md:col-span-2 font-display leading-none">
        <div className="text-4xl md:text-6xl text-grad">{day}</div>
        <div className="mt-1 text-sm md:text-base tracking-widest text-paper-mute font-mono uppercase">
          {month} {year}
        </div>
      </div>

      {/* Title + venue */}
      <div className="col-span-6 md:col-span-6">
        <h3 className="font-display text-2xl md:text-4xl leading-tight">
          {gig.title}
        </h3>
        {(gig.venue || location) && (
          <p className="mt-2 font-serif text-base md:text-lg text-paper-mute">
            <span className="text-paper">{gig.venue}</span>
            {gig.venue && location && <span> · </span>}
            {location}
            {time && (
              <span className="ml-2 font-mono text-xs uppercase">
                {time}
              </span>
            )}
          </p>
        )}
        {gig.ticketUrl && (
          <a
            href={gig.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block link-gold text-xs uppercase tracking-[0.22em] font-mono"
          >
            Tickets →
          </a>
        )}
      </div>

      {/* Flyer (rotated, reveals on hover) */}
      <div className="hidden md:block md:col-span-3">
        <div
          className={`relative aspect-[3/4] w-32 ml-auto overflow-hidden rounded-sm bg-ink-card ${rotation} group-hover:rotate-0 transition-transform duration-500 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.35)]`}
        >
          {gig.flyer ? (
            <Image
              src={gig.flyer}
              alt={`${gig.title} flyer`}
              fill
              className="object-cover"
              sizes="128px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-2xl text-grad">DLM</span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
