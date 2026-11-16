import { describe, expect, it } from "vitest";

import { accommodations, filterAccommodations } from "@/lib/accommodation";

const allFilters = { query: "", category: "All" as const, locationKind: "All" as const, gate: "All" as const };

describe("Maasai Mara accommodation directory", () => {
  it("keeps Mara Triangle stays distinct from conservancy and gate-area stays", () => {
    expect(accommodations.find((stay) => stay.slug === "mara-serena-safari-lodge")?.locationKind).toBe("reserve");
    expect(accommodations.find((stay) => stay.slug === "mahali-mzuri")?.locationKind).toBe("private-conservancy");
    expect(accommodations.find((stay) => stay.slug === "kambu-mara-camp")?.locationKind).toBe("outside-reserve");
  });

  it("only returns stays that match the requested reserve location filter", () => {
    const results = filterAccommodations(accommodations, { ...allFilters, locationKind: "reserve" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((stay) => stay.locationKind === "reserve")).toBe(true);
  });

  it("finds accommodation by property name, area, or accommodation style", () => {
    expect(filterAccommodations(accommodations, { ...allFilters, query: "Naboisho" }).map((stay) => stay.slug)).toEqual([
      "basecamp-wilderness",
    ]);
    expect(filterAccommodations(accommodations, { ...allFilters, query: "Tented camp" }).length).toBeGreaterThan(1);
  });

  it("does not show entries without an observed price tier in a price-category filter", () => {
    const results = filterAccommodations(accommodations, { ...allFilters, category: "Budget" });
    expect(results.map((stay) => stay.slug)).toEqual(["kambu-mara-camp"]);
  });
});