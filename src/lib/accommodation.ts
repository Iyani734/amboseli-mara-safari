export type LocationKind = "reserve" | "private-conservancy" | "community-conservancy" | "outside-reserve";
export type PriceCategory = "Luxury" | "Mid-range" | "Budget";

export type Accommodation = {
  slug: string;
  name: string;
  type: string;
  category?: PriceCategory;
  location: string;
  locationKind: LocationKind;
  nearestGate?: string;
  accessNote: string;
  summary: string;
  facts: string[];
  image: string;
  sourceLabel: string;
  sourceUrl: string;
  officialUrl?: string;
};

export const accommodations: Accommodation[] = [
  {
    slug: "mara-serena-safari-lodge",
    name: "Mara Serena Safari Lodge",
    type: "Safari lodge",
    location: "Mara Triangle · Maasai Mara National Reserve",
    locationKind: "reserve",
    accessNote: "Located within the Mara Triangle. Nearest gate and current road conditions are not confirmed here; ask the lodge before travel.",
    summary: "A lodge in the Mara Triangle, the western section of the national reserve.",
    facts: ["The Mara Triangle’s managing conservancy lists the lodge as one of only two accommodations inside the Triangle."],
    image: "/images/mara-eco-lodge.jpg",
    sourceLabel: "Mara Conservancy",
    sourceUrl: "https://www.maratriangle.org/camps-lodges-2",
  },
  {
    slug: "little-governors-camp",
    name: "Little Governors’ Camp",
    type: "Tented camp",
    location: "Mara Triangle · Maasai Mara National Reserve",
    locationKind: "reserve",
    accessNote: "Inside the Mara Triangle. Nearest gate and current entry route are not confirmed here; ask the camp before travel.",
    summary: "A Governors’ Camp Collection property located within the Mara Triangle.",
    facts: ["The Mara Triangle’s managing conservancy lists it as one of only two accommodations inside the Triangle."],
    image: "/images/mara-tented-camp.jpg",
    sourceLabel: "Mara Conservancy",
    sourceUrl: "https://www.maratriangle.org/camps-lodges-2",
    officialUrl: "https://governorscamp.com/",
  },
  {
    slug: "governors-camp",
    name: "Governors’ Camp",
    type: "Tented camp",
    location: "Mara River · Maasai Mara National Reserve",
    locationKind: "reserve",
    accessNote: "The camp describes its setting on the Mara River. Nearest gate is not confirmed here; ask the property before travel.",
    summary: "A classic riverside tented camp in the Maasai Mara, operated by Governors’ Camp Collection.",
    facts: ["The operator describes the camp as established on the Mara River in 1972."],
    image: "/images/mara-camp.jpg",
    sourceLabel: "Governors’ Camp Collection",
    sourceUrl: "https://governorscamp.com/",
    officialUrl: "https://governorscamp.com/",
  },
  {
    slug: "naibor-camp",
    name: "Naibor Camp",
    type: "Tented camp",
    category: "Luxury",
    location: "Talek River · Maasai Mara National Reserve",
    locationKind: "reserve",
    accessNote: "A directory places the camp in the reserve on the Talek River. Nearest gate is not confirmed here; verify the access route directly.",
    summary: "A small tented camp set among riverine woodland along the Talek River.",
    facts: ["The directory profile describes seven main Naibor tents; confirm current room inventory with the property."],
    image: "/images/mara-tented-camp.jpg",
    sourceLabel: "Masai Mara Reserve directory",
    sourceUrl: "https://www.masaimarareserve.com/lodge/naibor-camp/",
  },
  {
    slug: "mahali-mzuri",
    name: "Mahali Mzuri",
    type: "Tented camp",
    category: "Luxury",
    location: "Olare Motorogi Conservancy",
    locationKind: "community-conservancy",
    accessNote: "Inside Olare Motorogi Conservancy, not inside the national reserve. Ask the property about transfers and conservancy access.",
    summary: "An intimate luxury tented camp in the private Olare Motorogi Conservancy.",
    facts: ["The property lists 12 tented suites, an infinity pool and a spa."],
    image: "/images/mara-eco-lodge.jpg",
    sourceLabel: "Mahali Mzuri property profile",
    sourceUrl: "https://www.nakedwilderness.com/properties/mahali-mzuri/",
    officialUrl: "https://www.nakedwilderness.com/properties/mahali-mzuri/",
  },
  {
    slug: "basecamp-wilderness",
    name: "Basecamp Wilderness",
    type: "Tented camp",
    category: "Luxury",
    location: "Naboisho Conservancy",
    locationKind: "private-conservancy",
    accessNote: "Inside Naboisho Conservancy, not inside the national reserve. The property lists Ol Seki Airstrip for access.",
    summary: "A small eco-luxury tented camp in the community-owned Naboisho Conservancy.",
    facts: ["The property profile lists eight tented rooms and guided bush walks."],
    image: "/images/mara-camp.jpg",
    sourceLabel: "Basecamp Wilderness property profile",
    sourceUrl: "https://www.masaimara.com/basecamp-wilderness.php",
    officialUrl: "https://sarunibasecamp.com/mara-naboisho-conservancy/",
  },
  {
    slug: "basecamp-masai-mara",
    name: "Basecamp Masai Mara",
    type: "Tented camp",
    location: "Near Talek · Outside the national reserve",
    locationKind: "outside-reserve",
    accessNote: "Located outside the reserve near Talek town. Nearest gate and transfer times are not confirmed here; ask the property.",
    summary: "A riverside tented camp near Talek, outside the national reserve boundary.",
    facts: ["The directory profile describes its setting beside the Talek River, near Talek town."],
    image: "/images/mara-tented-camp.jpg",
    sourceLabel: "Masai Mara Reserve directory",
    sourceUrl: "https://www.masaimarareserve.com/lodge/basecamp-masai-mara/",
  },
  {
    slug: "kambu-mara-camp",
    name: "Kambu Mara Camp",
    type: "Tented camp",
    category: "Budget",
    location: "Sekenani area · Outside the reserve and conservancies",
    locationKind: "outside-reserve",
    nearestGate: "Sekenani Gate",
    accessNote: "The property states it is 8 km from Sekenani Gate and outside the reserve and conservancies.",
    summary: "A budget-friendly camp near Sekenani Gate, outside both the reserve and conservancies.",
    facts: ["The property lists en-suite and shared washroom options, plus self-catering and restaurant meals."],
    image: "/images/mara-camp.jpg",
    sourceLabel: "Kambu Mara Camp",
    sourceUrl: "https://kambucampers.com/kambu-campers-mara-camp/",
    officialUrl: "https://kambucampers.com/kambu-campers-mara-camp/",
  },
  {
    slug: "sunset-camp-masai-mara",
    name: "Sunset Camp Masai Mara",
    type: "Tented camp",
    location: "Sekenani area · outside the national reserve",
    locationKind: "outside-reserve",
    accessNote: "The property gives its location as Sekenani. Exact distance to the nearest gate is not confirmed here; ask the camp.",
    summary: "A locally run tented camp in the Sekenani area, with a small number of permanent tents.",
    facts: ["The camp lists 15 permanent tented accommodations and welcomes guests bringing their own tents."],
    image: "/images/mara-tented-camp.jpg",
    sourceLabel: "Sunset Camp Masai Mara",
    sourceUrl: "https://sunsetcampmasaimara.com/",
    officialUrl: "https://sunsetcampmasaimara.com/",
  },
];

export type AccommodationFilters = {
  query: string;
  category: PriceCategory | "All";
  locationKind: LocationKind | "All";
  gate: string | "All";
};

export function filterAccommodations(
  items: Accommodation[],
  filters: AccommodationFilters,
): Accommodation[] {
  const query = filters.query.trim().toLocaleLowerCase();

  return items.filter((item) => {
    const matchesQuery =
      !query ||
      `${item.name} ${item.type} ${item.location} ${item.category ?? ""}`
        .toLocaleLowerCase()
        .includes(query);
    const matchesCategory = filters.category === "All" || item.category === filters.category;
    const matchesLocation = filters.locationKind === "All" || item.locationKind === filters.locationKind;
    const matchesGate = filters.gate === "All" || item.nearestGate === filters.gate;
    return matchesQuery && matchesCategory && matchesLocation && matchesGate;
  });
}

export function findAccommodation(slug: string): Accommodation | undefined {
  return accommodations.find((item) => item.slug === slug);
}