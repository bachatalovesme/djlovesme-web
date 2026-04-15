import { getAbout } from "@/lib/notion";

export const metadata = { title: "About" };
export const revalidate = 600;

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="eyebrow">About</p>
      <h1 className="mt-2 font-display text-6xl md:text-8xl leading-[0.9]">
        <span className="text-grad">
          {about.headline || "DJ Loves Me"}
        </span>
        .
      </h1>
      <div className="mt-10 text-xl md:text-2xl leading-relaxed text-paper whitespace-pre-line">
        {about.body}
      </div>

      <div className="mt-16 border-t border-white/10 pt-8 text-sm text-paper-mute">
        <p>
          Bookings, press and everything else:{" "}
          <a className="link-gold text-paper" href="mailto:bachatalovesme@gmail.com">
            bachatalovesme@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
