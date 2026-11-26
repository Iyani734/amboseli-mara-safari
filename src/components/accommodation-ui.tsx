import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, MapPin, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Accommodation } from "@/lib/accommodation";

export function StayCard({ stay, onCompare, comparing }: {
  stay: Accommodation;
  onCompare?: (stay: Accommodation) => void;
  comparing?: boolean;
}) {
  return (
    <article className="group min-w-0 border border-border bg-card">
      <Link to="/accommodation/$slug" params={{ slug: stay.slug }} className="block overflow-hidden">
        <div className="relative aspect-[1.42] overflow-hidden bg-muted">
          <img src={stay.image} alt={`${stay.name} setting`} width={1024} height={768} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
          <span className="absolute left-4 top-4 bg-background/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground">
            {stay.category ?? "Category not confirmed"}
          </span>
          <span className="absolute bottom-3 left-3 bg-background/95 px-2.5 py-1.5 text-[10px] font-medium text-foreground">Illustrative image</span>
        </div>
        <div className="px-5 pb-1 pt-5">
          <p className="mara-eyebrow flex items-center gap-1.5 text-muted-foreground"><MapPin className="size-3" aria-hidden="true" />{stay.location}</p>
          <h3 className="mt-2 text-[22px] leading-tight text-foreground">{stay.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{stay.type}</p>
          <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-foreground/80">{stay.summary}</p>
          {stay.features && stay.features.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{stay.features.slice(0, 3).map((feature) => <span key={feature} className="border border-border px-2 py-1 text-[10px] text-muted-foreground">{feature}</span>)}</div>}
        </div>
      </Link>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border px-5 py-4">
        <Link to="/accommodation/$slug" params={{ slug: stay.slug }} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          View details <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
        {onCompare && (
          <Button variant={comparing ? "secondary" : "outline"} size="sm" onClick={() => onCompare(stay)} aria-pressed={comparing} className="rounded-none">
            {comparing ? <Check aria-hidden="true" /> : null}{comparing ? "Added" : "Compare"}
          </Button>
        )}
      </div>
    </article>
  );
}

export function CompareTray({ stays, onRemove, onClear }: {
  stays: Accommodation[];
  onRemove: (stay: Accommodation) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  if (stays.length === 0) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card shadow-[0_-12px_40px_color-mix(in_oklab,var(--foreground)_12%,transparent)]">
        <div className="mara-container flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="mara-eyebrow text-primary">Compare stays · {stays.length}/3</span>
            {stays.map((stay) => (
              <span key={stay.slug} className="inline-flex items-center gap-1.5 text-sm text-foreground">
                {stay.name}
                <Button variant="ghost" size="icon" className="size-7" onClick={() => onRemove(stay)} aria-label={`Remove ${stay.name} from comparison`}>
                  <X aria-hidden="true" className="size-3.5" />
                </Button>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClear}>Clear</Button>
            <Button variant="default" size="sm" onClick={() => setOpen(true)} className="rounded-none">Compare now</Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] max-w-4xl overflow-auto rounded-none">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl">Compare your shortlist</DialogTitle>
            <DialogDescription>Only details available from the listed sources are shown. Missing information remains unconfirmed.</DialogDescription>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead><tr><th className="border-b border-border p-3 text-muted-foreground">Details</th>{stays.map((stay) => <th key={stay.slug} className="border-b border-border p-3 font-semibold text-foreground">{stay.name}</th>)}</tr></thead>
              <tbody>
                {[
                  ["Location", (stay: Accommodation) => stay.location],
                  ["Location category", (stay: Accommodation) => stay.locationKind === "reserve" ? "Inside national reserve" : stay.locationKind === "private-conservancy" ? "Private conservancy" : stay.locationKind === "community-conservancy" ? "Community conservancy" : stay.locationKind === "nearby-access-area" ? "Nearby gate / access area" : "Outside reserve"],
                  ["Accommodation type", (stay: Accommodation) => stay.type],
                  ["Price category", (stay: Accommodation) => stay.category ?? "Not confirmed"],
                  ["Nearest gate", (stay: Accommodation) => stay.nearestGate ?? "Not confirmed"],
                  ["Facilities / notes", (stay: Accommodation) => stay.facts.join(" ") || "Not confirmed"],
                  ["Access", (stay: Accommodation) => stay.accessNote],
                ].map(([label, getValue]) => (
                  <tr key={label as string}>
                    <th scope="row" className="w-36 border-b border-border p-3 align-top font-medium text-muted-foreground">{label as string}</th>
                    {stays.map((stay) => <td key={stay.slug} className="border-b border-border p-3 align-top leading-5 text-foreground">{(getValue as (entry: Accommodation) => string)(stay)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end"><Button variant="outline" onClick={() => setOpen(false)} className="rounded-none">Done</Button></div>
        </DialogContent>
      </Dialog>
    </>
  );
}