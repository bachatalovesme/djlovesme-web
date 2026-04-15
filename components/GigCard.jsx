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
    <article className="group flex flex-col h-full border border-foreground/10 hover:border-red transition-colors overflow-hidden bg-paper-soft/40">
      {/* Flyer slot — aspect-[3/4] keeps the editorial poster feel */}
      <div className="relative aspect-[3/4] bg-teal-900/90 overflow-hidden">
        {gig.flyer ? (
          <Image
            src={gig.flyer}
            alt={`${gig.title} flyer`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-paper/80 font-display text-4xl italic">
            DLM<span className="text-red">.</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-5">
        <p className="eyebrow text-red">
          {formatDate(gig.date)}
          {time && <span className="opacity-60"> · {time}</span>}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
          {gig.title}
        </h3>
        {(gig.venue || location) && (
          <p className="mt-2 text-sm opacity-80">
            {gig.venue}
            {gig.venue && location && <span className="opacity-50"> — </span>}
            {location}
          </p>
        )}
        {gig.notes && (
          <p className="mt-3 text-sm opacity-75 line-clamp-3">{gig.notes}</p>
        )}

        {gig.ticketUrl && (
          <a
            href={gig.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 link-red text-sm font-medium self-start"
          >
            Tickets →
          </a>
        )}
      </div>
    </article>
  );
}
