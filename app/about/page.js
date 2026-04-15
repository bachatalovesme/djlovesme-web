import { getAbout } from "@/lib/notion";

export const metadata = { title: "About" };
export const revalidate = 600;

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="eyebrow text-red">About</p>
      <h1 className="mt-2 font-display text-5xl md:text-7xl font-semibold leading-[0.95]">
        {about.headline || "DJ Loves Me"}
        <span className="text-red">.</span>
      </h1>
      <div className="mt-10 font-display text-xl md:text-2xl leading-relaxed opacity-90 whitespace-pre-line">
        {about.body}
      </div>

      <div className="mt-16 border-t border-foreground/10 pt-8 text-sm opacity-80">
        <p>
          Bookings, press and everything else:{" "}
          <a className="link-red" href="mailto:bachatalovesme@gmail.com">
            bachatalovesme@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
