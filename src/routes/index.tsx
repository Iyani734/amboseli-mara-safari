import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import { StayCard } from "@/components/accommodation-ui";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { accommodations } from "@/lib/accommodation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Explore Maasai Mara | The Mara Field Guide" },
      { name: "description", content: "Find your place in the Maasai Mara: explore stays by their real location, meet the landscape, and plan a more thoughtful safari." },
      { property: "og:title", content: "Explore Maasai Mara | The Mara Field Guide" },
      { property: "og:description", content: "A considered guide to Maasai Mara stays, landscapes and safari planning." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = [accommodations[0], accommodations[4], accommodations[7]].filter((stay) => stay !== undefined);

  return (
    <main>
      <SiteHeader />
      <section className="relative isolate min-h-[650px] overflow-hidden bg-primary md:min-h-[720px]" aria-labelledby="home-title">
        <img src="/images/maasai-mara-dawn.jpg" alt="Wildebeest and zebra crossing the open Maasai Mara plains at sunrise" width={1808} height={1104} fetchPriority="high" className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/55" aria-hidden="true" />
        <div className="mara-container relative flex min-h-[650px] flex-col justify-center pb-24 pt-20 md:min-h-[720px]">
          <p className="mara-eyebrow text-primary-foreground/85">Kenya · The Mara ecosystem</p>
          <h1 id="home-title" className="mt-5 max-w-4xl text-balance text-6xl leading-[1.02] text-primary-foreground sm:text-7xl md:text-8xl">The Maasai<br className="hidden sm:block" /> Mara, considered.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/90 md:text-lg">A field guide to the places, stays and wild landscapes that make every Mara journey its own.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="secondary" size="lg" className="rounded-none">
              <Link to="/accommodation">Explore places to stay <ArrowUpRight aria-hidden="true" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none border-primary-foreground/70 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground">
              <a href="#landscape">Discover the Mara <ArrowDown aria-hidden="true" /></a>
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 border-t border-primary-foreground/25 py-5 text-primary-foreground md:grid-cols-4">
            <div className="border-r border-primary-foreground/25 pr-5"><p className="mara-eyebrow text-primary-foreground/70">The setting</p><p className="mt-1 text-sm">Reserve & wider ecosystem</p></div>
            <div className="border-primary-foreground/25 pl-5 md:border-r md:pr-5"><p className="mara-eyebrow text-primary-foreground/70">A place to begin</p><p className="mt-1 text-sm">Find your kind of stay</p></div>
            <div className="hidden border-r border-primary-foreground/25 px-5 md:block"><p className="mara-eyebrow text-primary-foreground/70">The landscape</p><p className="mt-1 text-sm">Plains, rivers & conservancies</p></div>
            <div className="hidden pl-5 md:block"><p className="mara-eyebrow text-primary-foreground/70">Plan with care</p><p className="mt-1 text-sm">Location before itinerary</p></div>
          </div>
        </div>
      </section>

      <section id="landscape" className="mara-container grid gap-12 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28">
        <div>
          <p className="mara-eyebrow text-primary">More than a reserve</p>
          <h2 className="mt-4 max-w-md text-4xl leading-tight text-foreground md:text-5xl">One Mara.<br />Many ways to experience it.</h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-lg leading-8 text-foreground/85">The Maasai Mara is a connected landscape of national reserve, community and private conservancies, rivers and open grassland. Where you stay shapes how you enter it, which experiences are available, and how much of the day is spent on safari.</p>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">We make those distinctions visible. Each property is grouped by its stated location, and details that still need confirmation are left open rather than guessed.</p>
          <Link to="/accommodation" className="mt-7 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-semibold text-primary">Start with the stays <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60 py-20 md:py-24" aria-labelledby="stays-title">
        <div className="mara-container">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="mara-eyebrow text-primary">A place to stay</p><h2 id="stays-title" className="mt-3 text-4xl text-foreground md:text-5xl">Find your Mara</h2></div>
            <Button asChild variant="outline" className="rounded-none"><Link to="/accommodation">Browse the directory <ArrowUpRight aria-hidden="true" /></Link></Button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featured.map((stay) => <StayCard key={stay.slug} stay={stay} />)}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6">
            <span className="mara-eyebrow mr-2 text-muted-foreground">Explore by setting</span>
            <a href="/accommodation#directory" className="border border-border bg-background px-4 py-2 text-sm hover:border-primary">Inside the reserve</a>
            <a href="/accommodation#directory" className="border border-border bg-background px-4 py-2 text-sm hover:border-primary">Private conservancies</a>
            <a href="/accommodation#directory" className="border border-border bg-background px-4 py-2 text-sm hover:border-primary">Near the gates</a>
          </div>
        </div>
      </section>

      <section className="mara-container grid gap-10 py-20 md:grid-cols-[1fr_1fr] md:items-center md:py-24">
        <div className="relative aspect-[1.2] overflow-hidden bg-muted">
          <img src="/images/mara-camp.jpg" alt="Canvas tents and a campfire clearing beneath an acacia tree" width={1024} height={768} loading="lazy" className="size-full object-cover" />
          <span className="absolute bottom-4 left-4 bg-background/95 px-3 py-2 text-xs text-foreground">A connected landscape</span>
        </div>
        <div className="max-w-xl">
          <p className="mara-eyebrow text-primary">Start with the map in mind</p>
          <h2 className="mt-3 text-4xl leading-tight text-foreground md:text-5xl">A gate can change the whole journey.</h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">Sekenani, Talek, Oloolaimutia, Musiara, Sand River and Oloololo each open onto a different part of the Mara. Match the access point to where you plan to stay, then confirm routes and conditions before you travel.</p>
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-y border-border py-5 sm:grid-cols-3">
            {["Sekenani", "Talek", "Oloolaimutia", "Musiara", "Sand River", "Oloololo"].map((gate) => <span key={gate} className="flex items-center gap-2 text-sm text-foreground"><MapPin className="size-3.5 text-primary" aria-hidden="true" />{gate}</span>)}
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">Gate access and operating details can change. Confirm current information with reserve or conservancy management before departure.</p>
        </div>
      </section>

      <section id="migration" className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-20">
        <div className="mara-container grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div><p className="mara-eyebrow text-primary-foreground/70">The Great Migration</p><h2 className="mt-3 text-4xl leading-tight md:text-5xl">A living rhythm,<br />never a schedule.</h2></div>
          <div><p className="max-w-2xl leading-7 text-primary-foreground/85">The herds move with the rains across the Serengeti–Mara ecosystem. Their arrival, river crossings and departure vary from year to year; no single month guarantees a crossing.</p><a href="https://www.maratriangle.org/" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 border-b border-primary-foreground/45 pb-1 text-sm font-semibold">Learn from Mara Conservancy <ArrowUpRight className="size-4" aria-hidden="true" /></a></div>
        </div>
      </section>

      <footer className="mara-container flex flex-wrap items-center justify-between gap-5 py-8 text-xs text-muted-foreground">
        <span>THE MARA FIELD GUIDE · Kenya</span>
        <span>Place-led information, with details still to confirm clearly marked.</span>
      </footer>
    </main>
  );
}