import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";

import { CompareTray, StayCard } from "@/components/accommodation-ui";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { accommodations, filterAccommodations, type Accommodation, type LocationKind, type PriceCategory } from "@/lib/accommodation";

export const Route = createFileRoute("/accommodation/")({
  head: () => ({
    meta: [
      { title: "Maasai Mara Camps & Lodges | The Mara Field Guide" },
      { name: "description", content: "Search Maasai Mara camps, lodges and tented stays by price category, type, nearby gate and their actual reserve or conservancy location." },
      { property: "og:title", content: "Maasai Mara Camps & Lodges | The Mara Field Guide" },
      { property: "og:description", content: "Compare Mara stays by their real location, accommodation style and sourced details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccommodationPage,
});

const locationOptions: { label: string; value: LocationKind | "All" }[] = [
  { label: "All locations", value: "All" },
  { label: "Inside the reserve", value: "reserve" },
  { label: "Private conservancies", value: "private-conservancy" },
  { label: "Community conservancies", value: "community-conservancy" },
  { label: "Outside the reserve", value: "outside-reserve" },
  { label: "Near a gate or town", value: "nearby-access-area" },
];
const categoryOptions: (PriceCategory | "All")[] = ["All", "Luxury", "Mid-range", "Budget"];
const gates = ["All", "Sekenani Gate", "Talek Gate", "Oloolaimutia Gate", "Musiara Gate", "Sand River Gate", "Oloololo Gate"];
const features = ["All", ...new Set(accommodations.flatMap((stay) => stay.features ?? []))];

function AccommodationPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PriceCategory | "All">("All");
  const [locationKind, setLocationKind] = useState<LocationKind | "All">("All");
  const [gate, setGate] = useState("All");
  const [feature, setFeature] = useState("All");
  const [type, setType] = useState("All");
  const [shortlist, setShortlist] = useState<Accommodation[]>([]);
  const filtered = useMemo(() => filterAccommodations(accommodations, { query, category, locationKind, gate, feature }), [query, category, locationKind, gate, feature]);
  const results = filtered.filter((stay) => type === "All" || stay.type === type);
  const types = ["All", ...new Set(accommodations.map((stay) => stay.type))];

  function toggleCompare(stay: Accommodation) {
    setShortlist((current) => {
      if (current.some((item) => item.slug === stay.slug)) return current.filter((item) => item.slug !== stay.slug);
      if (current.length >= 3) return current;
      return [...current, stay];
    });
  }

  function clearFilters() {
    setQuery(""); setCategory("All"); setLocationKind("All"); setGate("All"); setFeature("All"); setType("All");
  }

  return (
    <main className="min-h-screen pb-28">
      <SiteHeader />
      <section className="relative isolate overflow-hidden bg-primary py-14 text-primary-foreground md:py-20">
        <img src="/images/maasai-mara-dawn.jpg" alt="Open savannah of the Maasai Mara at sunrise" width={1808} height={1104} className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-primary/70" aria-hidden="true" />
        <div className="mara-container relative">
          <p className="mara-eyebrow text-primary-foreground/75">The accommodation guide</p>
          <h1 className="mt-3 max-w-3xl text-5xl leading-tight md:text-7xl">Stay closer to<br className="hidden md:block" /> the Mara you came for.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-primary-foreground/85 md:text-lg">Explore camps and lodges by where they actually sit: inside the reserve, within a conservancy, or near the gates. Prices and facilities are shown only when a source supports them.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-primary-foreground/85">
            <span className="border border-primary-foreground/30 px-3 py-2">Reserve & conservancy locations</span><span className="border border-primary-foreground/30 px-3 py-2">Gate-area stays</span><span className="border border-primary-foreground/30 px-3 py-2">Source-linked details</span>
          </div>
        </div>
      </section>

      <section className="mara-container py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border-b border-border pb-7 lg:border-b-0 lg:border-r lg:pr-8">
            <p className="mara-eyebrow text-primary">First, choose your setting</p>
            <h2 className="mt-3 text-3xl leading-tight text-foreground">The location is part of the experience.</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">Reserve, conservancy and gate-area stays are not interchangeable. Check the property’s setting, entry route and access arrangements before booking.</p>
            <a href="https://www.maratriangle.org/camps-lodges-2" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Mara Triangle camp guidance <ArrowUpRight aria-hidden="true" className="size-4" /></a>
          </div>
          <div>
            <div className="flex items-center justify-between gap-3"><div><p className="mara-eyebrow text-primary">Browse the directory</p><h2 className="mt-2 text-3xl text-foreground">Find your kind of stay</h2></div><SlidersHorizontal className="size-5 text-primary" aria-hidden="true" /></div>
            <div id="directory" className="mt-5 grid gap-4 sm:grid-cols-2">
              {locationOptions.slice(1).map((option) => (
                <Button type="button" key={option.value} variant={locationKind === option.value ? "default" : "outline"} onClick={() => setLocationKind(option.value)} aria-pressed={locationKind === option.value} className="h-auto min-h-24 w-full flex-col items-start whitespace-normal rounded-none p-4 text-left shadow-none">
                  <span className="mara-eyebrow opacity-75">{option.value === "reserve" ? "In the reserve" : option.value === "private-conservancy" ? "Privately managed land" : option.value === "community-conservancy" ? "Community-led conservation" : option.value === "nearby-access-area" ? "Gate and access areas" : "Outside the boundary"}</span><span className="mt-2 block text-lg font-medium">{option.label}</span>
                </Button>
              ))}
              <a href="https://maraconservancies.org/mara-conservancies-map/" target="_blank" rel="noreferrer" className="flex items-center justify-between border border-border bg-card p-4 text-foreground transition-colors hover:border-primary"><span><span className="mara-eyebrow text-muted-foreground">Explore the ecosystem</span><span className="mt-2 block text-lg font-medium">Conservancy map</span></span><ArrowUpRight className="size-5 text-primary" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50 py-8" aria-label="Accommodation search filters">
        <div className="mara-container">
          <div className="grid gap-4 lg:grid-cols-[minmax(210px,1.3fr)_1fr_1.3fr_1fr_1fr_1fr]">
            <label className="relative block"><span className="sr-only">Search accommodation</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search camps, area, type…" className="h-11 rounded-none bg-background pl-10" /></label>
            <label className="flex flex-col gap-1"><span className="mara-eyebrow text-muted-foreground">Price tier</span><select value={category} onChange={(event) => setCategory(event.target.value as PriceCategory | "All")} className="h-10 border border-input bg-background px-3 text-sm text-foreground"><option value="All">All tiers</option>{categoryOptions.slice(1).map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
            <label className="flex flex-col gap-1"><span className="mara-eyebrow text-muted-foreground">Location</span><select value={locationKind} onChange={(event) => setLocationKind(event.target.value as LocationKind | "All")} className="h-10 border border-input bg-background px-3 text-sm text-foreground">{locationOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
            <label className="flex flex-col gap-1"><span className="mara-eyebrow text-muted-foreground">Nearest gate</span><select value={gate} onChange={(event) => setGate(event.target.value)} className="h-10 border border-input bg-background px-3 text-sm text-foreground">{gates.map((value) => <option key={value} value={value}>{value === "All" ? "Any gate" : value}</option>)}</select></label>
            <label className="flex flex-col gap-1"><span className="mara-eyebrow text-muted-foreground">Verified feature</span><select value={feature} onChange={(event) => setFeature(event.target.value)} className="h-10 border border-input bg-background px-3 text-sm text-foreground">{features.map((value) => <option key={value} value={value}>{value === "All" ? "Any feature" : value}</option>)}</select></label>
            <label className="flex flex-col gap-1"><span className="mara-eyebrow text-muted-foreground">Stay type</span><select value={type} onChange={(event) => setType(event.target.value)} className="h-10 border border-input bg-background px-3 text-sm text-foreground">{types.map((value) => <option key={value} value={value}>{value === "All" ? "All types" : value}</option>)}</select></label>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2" aria-label="Quick price filters">
              {categoryOptions.map((value) => <Button key={value} type="button" variant={category === value ? "default" : "outline"} size="sm" onClick={() => setCategory(value)} className="rounded-none">{value === "All" ? "All stays" : value}</Button>)}
            </div>
            {(query || category !== "All" || locationKind !== "All" || gate !== "All" || feature !== "All" || type !== "All") && <Button variant="ghost" size="sm" onClick={clearFilters}><X className="size-4" aria-hidden="true" /> Clear filters</Button>}
          </div>
        </div>
      </section>

      <section className="mara-container py-9" aria-live="polite">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div><p className="mara-eyebrow text-primary">{results.length} {results.length === 1 ? "stay" : "stays"} in this view</p><h2 className="mt-2 text-3xl text-foreground">Camps, lodges & more</h2></div>
          <p className="max-w-lg text-sm leading-5 text-muted-foreground">Price, nearest-gate and amenity details are omitted until a reliable source confirms them.</p>
        </div>
        {results.length > 0 ? <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{results.map((stay) => <StayCard key={stay.slug} stay={stay} onCompare={toggleCompare} comparing={shortlist.some((item) => item.slug === stay.slug)} />)}</div> : <div className="py-16 text-center"><p className="text-xl text-foreground">No stays match these filters yet.</p><p className="mt-2 text-sm text-muted-foreground">Try another area, gate or search term.</p><Button variant="outline" onClick={clearFilters} className="mt-5 rounded-none">Show all stays</Button></div>}
        <div className="mt-10 border-l-2 border-accent bg-card px-5 py-4"><p className="text-sm leading-6 text-foreground"><strong>About this directory.</strong> Properties shown here are an initial researched selection, not an exhaustive list of the ecosystem. Location claims link to the source checked; rates and amenities vary and should be reconfirmed with the property before booking.</p></div>
      </section>

      <CompareTray stays={shortlist} onRemove={toggleCompare} onClear={() => setShortlist([])} />
    </main>
  );
}