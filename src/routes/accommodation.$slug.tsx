import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CheckCircle2, MapPin, ShieldAlert } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { findAccommodation } from "@/lib/accommodation";

export const Route = createFileRoute("/accommodation/$slug")({
  beforeLoad: ({ params }) => {
    if (!findAccommodation(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const stay = findAccommodation(params.slug);
    const title = stay ? `${stay.name} | Maasai Mara Stay Guide` : "Stay details | The Mara Field Guide";
    const description = stay
      ? `${stay.name}: location, setting and source-linked information for planning a Maasai Mara stay.`
      : "Explore Maasai Mara camps and lodges by their actual location.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AccommodationDetailPage,
});

function AccommodationDetailPage() {
  const { slug } = Route.useParams();
  const stay = findAccommodation(slug);
  if (!stay) return null;

  const locationLabel = stay.locationKind === "reserve"
    ? "Inside the national reserve"
    : stay.locationKind === "private-conservancy"
      ? "Inside a private conservancy"
      : stay.locationKind === "community-conservancy"
        ? "Inside a community conservancy"
        : "Outside the reserve";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${stay.name} ${stay.location}`)}`;

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mara-container pt-6">
        <Button asChild variant="ghost" size="sm" className="-ml-3"><a href="/accommodation"><ArrowLeft aria-hidden="true" /> All stays</a></Button>
      </div>
      <section className="mara-container grid gap-8 py-5 pb-14 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
        <div>
          <div className="relative aspect-[1.35] overflow-hidden bg-muted">
            <img src={stay.image} alt={`Illustrative Maasai Mara setting for ${stay.name}`} width={1024} height={768} fetchPriority="high" className="size-full object-cover" />
            <span className="absolute bottom-3 left-3 bg-background/95 px-3 py-2 text-xs text-foreground">Illustrative image · not a property photograph</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Property-specific photographs are not yet verified for this listing.</p>
        </div>

        <div className="pt-1 lg:pt-3">
          <p className="mara-eyebrow text-primary">{stay.type} · Maasai Mara</p>
          <h1 className="mt-3 text-4xl leading-tight text-foreground md:text-5xl">{stay.name}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{stay.summary}</p>
          {stay.features && stay.features.length > 0 && <div className="mt-4 flex flex-wrap gap-2" aria-label="Features confirmed by the source">{stay.features.map((feature) => <span key={feature} className="border border-border bg-card px-3 py-1.5 text-xs text-foreground">{feature}</span>)}</div>}

          <div className="mt-6 grid grid-cols-2 border-y border-border">
            <div className="border-r border-border py-4 pr-4"><p className="mara-eyebrow text-muted-foreground">Setting</p><p className="mt-1 text-sm font-medium text-foreground">{locationLabel}</p></div>
            <div className="py-4 pl-4"><p className="mara-eyebrow text-muted-foreground">Price category</p><p className="mt-1 text-sm font-medium text-foreground">{stay.category ?? "Not verified"}</p></div>
            <div className="border-r border-t border-border py-4 pr-4"><p className="mara-eyebrow text-muted-foreground">Nearest gate</p><p className="mt-1 text-sm font-medium text-foreground">{stay.nearestGate ?? "Not verified"}</p></div>
            <div className="border-t border-border py-4 pl-4"><p className="mara-eyebrow text-muted-foreground">Stay type</p><p className="mt-1 text-sm font-medium text-foreground">{stay.type}</p></div>
          </div>

          <p className="mt-4 flex items-start gap-2 text-sm leading-5 text-muted-foreground"><MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />{stay.accessNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="default" className="rounded-none"><a href={stay.officialUrl ?? stay.sourceUrl} target="_blank" rel="noreferrer">{stay.officialUrl ? "Visit property website" : "Open listing source"}<ArrowUpRight aria-hidden="true" /></a></Button>
            <Button asChild variant="outline" className="rounded-none"><a href={mapUrl} target="_blank" rel="noreferrer">View general area <MapPin aria-hidden="true" /></a></Button>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">The map opens a general name-and-area search, not a verified property pin.</p>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mara-container grid gap-10 py-10 md:grid-cols-[1fr_1fr] md:py-14">
          <div>
            <p className="mara-eyebrow text-primary">What we could confirm</p>
            <h2 className="mt-2 text-3xl text-foreground">Property notes</h2>
            <ul className="mt-5 space-y-4">
              {stay.facts.map((fact) => <li key={fact} className="flex gap-3 text-sm leading-6 text-foreground"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />{fact}</li>)}
              {stay.facts.length === 0 && <li className="text-sm text-muted-foreground">No property details have been verified yet.</li>}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2"><ShieldAlert className="size-4 text-accent-foreground" aria-hidden="true" /><p className="mara-eyebrow text-foreground">Details still to confirm</p></div>
            <h2 className="mt-2 text-3xl text-foreground">Before you book</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">The following details are not confirmed in the sources checked for this guide. Contact the property directly for current information.</p>
            <ul className="mt-4 grid gap-x-5 gap-y-2 text-sm text-foreground sm:grid-cols-2">
              {["Current rates & inclusions", "Room or tent options", "Facilities & pool", "Wi-Fi & electricity", "Family and child policies", "Meal plans and activities", "Exact map pin, transfer time & route", "Availability and booking terms"].map((item) => <li key={item} className="border-b border-border py-2">{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="mara-container py-10">
        <div><p className="mara-eyebrow text-primary">Source checked</p><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Location and confirmed notes above are based on the source linked here. The source may not be the property’s own website; confirm current details directly before booking.</p><a href={stay.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4">{stay.sourceLabel}<ArrowUpRight aria-hidden="true" className="size-4" /></a></div>
      </section>
    </main>
  );
}