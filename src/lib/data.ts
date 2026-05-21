export const DESTINATIONS = [
  {
    id: "tulum",
    name: "Tulum",
    country: "Mexico",
    tag: "Jungle · Cenote",
    img: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=1200&auto=format&fit=crop",
  },
  {
    id: "amalfi",
    name: "Amalfi",
    country: "Italy",
    tag: "Cliffside · Slow",
    img: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=1200&auto=format&fit=crop",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    tag: "Ricefield · Wellness",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    tag: "Neon · Omakase",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&auto=format&fit=crop",
  },
  {
    id: "cabo",
    name: "Cabo",
    country: "Mexico",
    tag: "Pacific · Pool day",
    img: "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?w=1200&auto=format&fit=crop",
  },
  {
    id: "ibiza",
    name: "Ibiza",
    country: "Spain",
    tag: "Coastal · Nightlife",
    img: "https://images.unsplash.com/photo-1559628233-eb1bdacba7a1?w=1200&auto=format&fit=crop",
  },
  {
    id: "miami",
    name: "Miami",
    country: "USA",
    tag: "Art Deco · Sun",
    img: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=1200&auto=format&fit=crop",
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    tag: "Tile · Tram",
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&auto=format&fit=crop",
  },
] as const;

export const VIBES = [
  "Slow & restorative",
  "Party & nightlife",
  "Cultural deep-dive",
  "Adventure & active",
  "Foodie",
  "Wellness retreat",
  "Hidden & local",
  "Glamour",
  "Surf & beach",
  "Romance",
];

export type Collection = {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  cover: string;
  count: number;
};

export const COLLECTIONS: Collection[] = [
  {
    id: "beach-escapes",
    name: "Beach Escapes",
    tag: "Sand · Slow · Salt",
    blurb:
      "Tented beach resorts, cliffside villas, and the quiet stretches of coast nobody Instagrams yet.",
    cover:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80",
    count: 42,
  },
  {
    id: "wellness-retreats",
    name: "Wellness Retreats",
    tag: "Reset · Restore",
    blurb:
      "Properties where the spa is the architecture. Nutritionists on-site, sunrise practice, no Wi-Fi in the rooms.",
    cover:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=80",
    count: 28,
  },
  {
    id: "city-weekends",
    name: "City Weekends",
    tag: "48h · Editorial",
    blurb:
      "Small hotels in big cities. Three nights, walking-radius restaurants, your concierge already knows the maître d'.",
    cover:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop&q=80",
    count: 36,
  },
  {
    id: "remote-work-stays",
    name: "Remote Work Stays",
    tag: "WiFi · Focus · Air",
    blurb:
      "Month-long stays at properties built for the laptop class. Real internet, ergonomic everything, mornings to yourself.",
    cover:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&auto=format&fit=crop&q=80",
    count: 24,
  },
  {
    id: "romantic-getaways",
    name: "Romantic Getaways",
    tag: "Just the two of you",
    blurb:
      "Adults-only properties, private dinners, no spreadsheets in sight. Tested by editors traveling without their phones.",
    cover:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1600&auto=format&fit=crop&q=80",
    count: 31,
  },
  {
    id: "members-favorites",
    name: "Members Favorites",
    tag: "What everyone loves",
    blurb:
      "The properties NUWAI members book twice. Quiet word of mouth, surfaced for you.",
    cover:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&auto=format&fit=crop&q=80",
    count: 18,
  },
];

export type FeaturedStay = {
  id: string;
  hotel: { name: string; style: string; nights: number; img: string };
  title: string;
  headline: string;
  vibe: string[];
  flag: string;
  perPerson: number;
  fit: string;
  perks: string[];
};

export const FEATURED_STAYS: FeaturedStay[] = [
  {
    id: "habitas-tulum",
    hotel: {
      name: "Habitas Tulum",
      style: "Tented eco-resort",
      nights: 7,
      img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1400&auto=format&fit=crop",
    },
    title: "Quiet jungle, loud sunsets",
    headline: "A slow week between cenote mornings and beach-club nights.",
    vibe: ["Restorative", "Beachfront", "Wellness"],
    flag: "Editor's pick",
    perPerson: 4210,
    fit: "For when you want to disappear into the trees and reappear at sunset.",
    perks: [
      "Tent upgrade on arrival",
      "Sunrise sound bath",
      "Late checkout to 4pm",
    ],
  },
  {
    id: "azulik-casa-malca",
    hotel: {
      name: "Azulik + Casa Malca",
      style: "Adults-only · split stay",
      nights: 7,
      img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&auto=format&fit=crop",
    },
    title: "Hotel-hop the coast",
    headline: "Two boutique stays. Beach-club energy. A boat day in the middle.",
    vibe: ["Design-forward", "Social", "Photogenic"],
    flag: "Members favorite",
    perPerson: 5990,
    fit: "For the design-conscious traveler who treats the hotel as the destination.",
    perks: [
      "Welcome dinner at Tseen Ja",
      "Yacht day for two",
      "IK Lab private viewing",
    ],
  },
  {
    id: "jungle-keva",
    hotel: {
      name: "Jungle Keva",
      style: "Boutique · 9 rooms",
      nights: 7,
      img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&auto=format&fit=crop",
    },
    title: "The under-the-radar week",
    headline: "Skip the strip. Sleep in the jungle. Eat where the chefs eat.",
    vibe: ["Quiet luxury", "Local", "Foodie"],
    flag: "Hidden gem",
    perPerson: 3120,
    fit: "For the traveler who reads the menu before they read the property.",
    perks: [
      "Maya cooking class included",
      "Private cenote at dawn",
      "Wine pairing across the week",
    ],
  },
];

export type Perk = {
  id: string;
  title: string;
  body: string;
  tier: "all" | "select" | "black";
};

export const PERKS: Perk[] = [
  {
    id: "member-rates",
    title: "Member rates",
    body: "Rates negotiated directly with our properties. Not visible to the public, never sold to OTAs.",
    tier: "all",
  },
  {
    id: "upgrades",
    title: "Complimentary upgrades",
    body: "Best available room upgrade at check-in. Suite upgrades guaranteed on Black.",
    tier: "select",
  },
  {
    id: "late-checkout",
    title: "Late checkout, every time",
    body: "4pm checkout on Select. Confirmed in advance, never apologized for.",
    tier: "select",
  },
  {
    id: "concierge",
    title: "Concierge in your pocket",
    body: "Chat with a concierge who knows your taste. Bookings, restaurants, last-minute changes.",
    tier: "all",
  },
  {
    id: "transfers",
    title: "Airport transfers worldwide",
    body: "Private car at every arrival and departure. Black members only.",
    tier: "black",
  },
  {
    id: "experiences",
    title: "Members-only experiences",
    body: "Private gallery hours, chef tables, sunrise access to places that don't open until 9.",
    tier: "black",
  },
];

export type Tier = {
  id: "nuwai" | "select" | "black";
  name: string;
  tag: string;
  price: string;
  cadence: string;
  perks: string[];
  featured?: boolean;
};

export const TIERS: Tier[] = [
  {
    id: "nuwai",
    name: "NUWAI",
    tag: "Start here",
    price: "$0",
    cadence: "Free to join",
    perks: [
      "Browse the curated catalog",
      "Save stays you love",
      "Standard concierge chat",
      "Member rates at select stays",
    ],
  },
  {
    id: "select",
    name: "Select",
    tag: "The new way to travel",
    price: "$240",
    cadence: "per year",
    perks: [
      "Full NUWAI Approved catalog",
      "Member rates at every stay",
      "Priority concierge response",
      "Complimentary upgrades & late checkout",
      "5% travel credit on every booking",
    ],
    featured: true,
  },
  {
    id: "black",
    name: "Black",
    tag: "By invitation",
    price: "$3,600",
    cadence: "per year",
    perks: [
      "Everything in Select",
      "Dedicated concierge by name",
      "Airport transfers worldwide",
      "Members-only experiences & drops",
      "Suite upgrades guaranteed",
      "Custom itineraries on request",
    ],
  },
];

export type ChatMessage = {
  from: "me" | "concierge";
  name?: string;
  time?: string;
  body: string;
  actions?: string[];
};

export const MESSAGES: ChatMessage[] = [
  {
    from: "concierge",
    name: "NUWAI Concierge",
    time: "9:41",
    body: "Morning, Maya. I pulled three NUWAI Approved stays in Tulum that match what you described — want me to walk you through them?",
  },
  { from: "me", body: "Yes please. Quick take on the first?" },
  {
    from: "concierge",
    name: "NUWAI Concierge",
    time: "9:42",
    body: "Habitas Tulum. Tented eco-resort, cenote-heavy, one boat day. Slowest of the three. Closest to the trip you described in onboarding.",
  },
  { from: "me", body: "How flexible are the dates?" },
  {
    from: "concierge",
    name: "NUWAI Concierge",
    time: "9:42",
    body: "Mar 14 → 21 is open. ±2 days also available. Want me to hold a tent room while you decide?",
    actions: ["Hold the room", "Show me other dates"],
  },
  {
    from: "me",
    body: "Hold it. And can you find a sunrise sound bath the first morning?",
  },
  {
    from: "concierge",
    name: "NUWAI Concierge",
    time: "9:43",
    body: "Done. Tent #14 held for 48 hours. Sunrise sound bath added to Day 1 — comes with your Select-tier perk, so no extra charge.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Lena R.",
    city: "Brooklyn",
    body: "Joined NUWAI on a whim before a Tulum trip. Got upgraded to a suite I couldn't have booked publicly, paid less, and my concierge held a sunset reservation for me from 5,000 miles away.",
  },
  {
    name: "Marcus W.",
    city: "Austin",
    body: "I used to spend hours on Booking.com and end up at the same five hotels. NUWAI sent me to a 12-room property in Oaxaca I'd never have found. Best trip I've taken in a decade.",
  },
  {
    name: "Aiyana K.",
    city: "Vancouver",
    body: "It's the only travel product I've used that feels designed for people like me, not for my parents. The concierge actually gets it.",
  },
];
