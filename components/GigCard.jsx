import Image from "next/image";

function formatDate(iso) {
  if (!iso) return "Date TBA";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  const hasTime = iso.length > 10;
  if (!hasTime) return null;
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function GigCard({ gig }) {
  const time = formatTime(gig.date);
  const location = [gig.city, gig.country].filter(Boolean).join(", ");

  return (
    <article className="group relative flex flex-col h-full rounded-2xl bg-ink-card border border-white/10 hover:border-transparent overflow-hidden transition-all duration-300">
      {/* gradient border on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          padding: "1px",
          background:
            "linear-gradient(90deg, #ec4899, #a855f7, #3b82f6)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Flyer slot — aspect-[3/4] keeps the poster feel */}
      <div className="relative aspect-[3/4] bg-black overflow-hidden">
        {gig.flyer ? (
          <Image
            src={gig.flyer}
            alt={`${gig.title} flyer`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center glow-gold"
          >
            <span className="font-display text-5xl text-grad">DLM</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-5">
        <p className="eyebrow">
          {formatDate(gig.date)}
          {time && <span className="text-paper-mute"> · {time}</span>}
        </p>
        <h3 className="mt-2 font-display text-2xl md:text-3xl leading-tight">
          {gig.title}
        </h3>
        {(gig.venue || location) && (
          <p className="mt-2 text-sm text-paper-mute">
            {gig.venue}
            {gig.venue && location && <span> — </span>}
            {location}
          </p>
        )}
        {gig.notes && (
          <p className="mt-3 text-sm text-paper-mute line-clamp-3">
            {gig.notes}
          </p>
        )}

        {gig.ticketUrl && (
          <a
            href={gig.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 link-gold text-sm font-semibold uppercase tracking-widest self-start"
          >
            Tickets →
          </a>
        )}
      </div>
    </article>
  );
}
