import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-border bg-background">
      <div className="mara-container flex min-h-[76px] items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Maasai Mara Field Guide home">
          <span className="flex size-10 items-center justify-center border border-primary/30 text-primary" aria-hidden="true">
            <span className="font-display text-2xl leading-none">M</span>
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] font-bold tracking-[0.14em] text-foreground">THE MARA</span>
            <span className="block text-[10px] tracking-[0.11em] text-muted-foreground">FIELD GUIDE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          <Link to="/" className="text-sm text-foreground/80 transition-colors hover:text-primary">The Mara</Link>
          <Link to="/accommodation" className="text-sm text-foreground/80 transition-colors hover:text-primary">Where to stay</Link>
          <a href="/#landscape" className="text-sm text-foreground/80 transition-colors hover:text-primary">Explore the Mara</a>
          <a href="/#migration" className="text-sm text-foreground/80 transition-colors hover:text-primary">Migration</a>
        </nav>

        <Button asChild variant="default" className="hidden rounded-none md:inline-flex">
          <Link to="/accommodation">Find a stay <ArrowUpRight aria-hidden="true" /></Link>
        </Button>
        <Button asChild variant="ghost" size="icon" className="md:hidden" aria-label="Explore accommodation">
          <Link to="/accommodation"><Menu aria-hidden="true" /></Link>
        </Button>
      </div>
    </header>
  );
}