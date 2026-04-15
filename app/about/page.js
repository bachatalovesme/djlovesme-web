import { getAbout } from "@/lib/notion";

export const metadata = { title: "About" };
export const revalidate = 600;

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="relative overflow-hidden">
      <div
        className="mesh-blob mesh-blob-pink"
        style={{ width: "500px", height: "500px", top: "-180px", left: "-180px" }}
        aria-hidden="true"
      />
      <div
        className="mesh-blob mesh-blob-gold"
        style={{ width: "360px", height: "360px", top: "30%", right: "10%" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 md:py-28">
        <p className="eyebrow rise rise-1">· About</p>
        <h1 className="mt-3 font-display text-6xl md:text-[9rem] leading-[0.85] rise rise-2">
          <span className="text-grad">
            {about.headline || "DJ Loves Me"}
          </span>
          <span className="font-serif italic normal-case text-paper">.</span>
        </h1>

        <div className="mt-12 font-serif text-2xl md:text-3xl leading-relaxed text-paper whitespace-pre-line rise rise-3">
          {about.body}
        </div>

        <div className="mt-20 border-t border-white/10 pt-8 font-mono text-xs uppercase tracking-[0.22em] text-paper-mute rise rise-4">
          <p>
            Bookings, press and everything else:{" "}
            <a className="link-gold" href="mailto:bachatalovesme@gmail.com">
              bachatalovesme@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
