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

export type Proposal = {
  id: string;
  advisor: {
    name: string;
    city: string;
    rating: number;
    trips: number;
    avatar: string;
  };
  title: string;
  headline: string;
  hotel: { name: string; style: string; nights: number; img: string };
  price: number;
  perPerson: number;
  fit: string;
  vibe: string[];
  flag: string;
  itinerary: { day: string; t: string; body: string }[];
  experiences: string[];
  upgrades: { name: string; delta: number }[];
  breakdown: { k: string; v: number }[];
};

export const PROPOSALS: Proposal[] = [
  {
    id: "p1",
    advisor: {
      name: "Sofía Marín",
      city: "Mexico City",
      rating: 4.97,
      trips: 312,
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop",
    },
    title: "Quiet jungle, loud sunsets",
    headline: "A slow week between cenote mornings and beach-club nights.",
    hotel: {
      name: "Habitas Tulum",
      style: "Tented eco-resort",
      nights: 7,
      img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1400&auto=format&fit=crop",
    },
    price: 8420,
    perPerson: 4210,
    fit: "You said slow, scenic, and a soft party. This leans into the slow.",
    vibe: ["Restorative", "Beachfront", "Wellness"],
    flag: "Editor’s pick",
    itinerary: [
      {
        day: "Day 1",
        t: "Arrival",
        body: "Private transfer from CUN. Welcome ceremony, sound bath at sunset.",
      },
      {
        day: "Day 2",
        t: "Cenote ring",
        body: "Dawn paddle through Sac Actun. Lunch at Arca. Free afternoon.",
      },
      {
        day: "Day 3",
        t: "Sian Ka’an",
        body: "Biosphere boat day. Lobster lunch on a sandbar.",
      },
      {
        day: "Day 4",
        t: "Reset",
        body: "Spa morning, beach yoga, dinner at Hartwood.",
      },
      {
        day: "Day 5",
        t: "Ruins",
        body: "Sunrise at Tulum ruins, before the crowds.",
      },
      {
        day: "Day 6",
        t: "Beach club",
        body: "Bonbonniere day pass. Cocktails at Casa Jaguar.",
      },
      {
        day: "Day 7",
        t: "Slow exit",
        body: "Late checkout, ceviche on the beach, transfer.",
      },
    ],
    experiences: [
      "Cenote dive",
      "Mayan blessing",
      "Sandbar lunch",
      "Private chef night",
    ],
    upgrades: [
      { name: "Helicopter to Holbox", delta: 1240 },
      { name: "Sunrise hot-air balloon", delta: 480 },
    ],
    breakdown: [
      { k: "Hotel (7 nights)", v: 4900 },
      { k: "Experiences", v: 1650 },
      { k: "Transfers & guide", v: 720 },
      { k: "Dining (4 reserved)", v: 850 },
      { k: "Concierge fee", v: 300 },
    ],
  },
  {
    id: "p2",
    advisor: {
      name: "Daniel Okafor",
      city: "New York",
      rating: 4.92,
      trips: 187,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
    },
    title: "Hotel-hop the coast",
    headline:
      "Two boutique stays. Beach club energy. A boat day in the middle.",
    hotel: {
      name: "Azulik + Casa Malca",
      style: "Adults-only · split stay",
      nights: 7,
      img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&auto=format&fit=crop",
    },
    price: 11980,
    perPerson: 5990,
    fit: "You wanted some scene. This is the high-design version of that.",
    vibe: ["Design-forward", "Social", "Photogenic"],
    flag: "Most popular",
    itinerary: [
      {
        day: "Day 1",
        t: "Check-in Azulik",
        body: "Private treehouse villa. Dinner at Tseen Ja.",
      },
      {
        day: "Day 2",
        t: "Beach club",
        body: "Bagatelle reserved daybed. Massage at IK Lab.",
      },
      {
        day: "Day 3",
        t: "Boat day",
        body: "Yacht charter to Maroma. Lunch on board.",
      },
      {
        day: "Day 4",
        t: "Move to Malca",
        body: "Transfer south. Pool afternoon. Dinner at Philippe.",
      },
      {
        day: "Day 5",
        t: "Art day",
        body: "SFER IK + private studio visit with curator.",
      },
      {
        day: "Day 6",
        t: "Big night",
        body: "Bonbonniere reserved table. Late dinner at Arca.",
      },
      {
        day: "Day 7",
        t: "Float out",
        body: "Spa morning, transfer to CUN.",
      },
    ],
    experiences: [
      "Yacht charter",
      "Private gallery tour",
      "Mezcal tasting",
      "Beach club table",
    ],
    upgrades: [
      { name: "Private chef sandbar dinner", delta: 980 },
      { name: "After-hours SFER IK", delta: 1400 },
    ],
    breakdown: [
      { k: "Hotels (split stay)", v: 6400 },
      { k: "Experiences", v: 2980 },
      { k: "Transfers & guide", v: 980 },
      { k: "Dining (6 reserved)", v: 1320 },
      { k: "Concierge fee", v: 300 },
    ],
  },
  {
    id: "p3",
    advisor: {
      name: "Priya Ramesh",
      city: "London",
      rating: 4.89,
      trips: 241,
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&auto=format&fit=crop",
    },
    title: "The under-the-radar week",
    headline: "Skip the strip. Sleep in the jungle. Eat where the chefs eat.",
    hotel: {
      name: "Jungle Keva",
      style: "Boutique · 9 rooms",
      nights: 7,
      img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&auto=format&fit=crop",
    },
    price: 6240,
    perPerson: 3120,
    fit: "You said luxury-on-a-budget. This is the smartest spend.",
    vibe: ["Quiet luxury", "Local", "Foodie"],
    flag: "Best value",
    itinerary: [
      {
        day: "Day 1",
        t: "Arrival",
        body: "Private transfer. Tasting menu at Kin Toh.",
      },
      {
        day: "Day 2",
        t: "Local cenote",
        body: "Pre-dawn visit, no other guests. Breakfast on-site.",
      },
      {
        day: "Day 3",
        t: "Coba ruins",
        body: "Climb at sunrise. Lunch with a Maya cook.",
      },
      {
        day: "Day 4",
        t: "Bacalar",
        body: "Day trip to the lagoon. Private sailboat.",
      },
      {
        day: "Day 5",
        t: "Slow day",
        body: "Hammock, library, beach. Dinner at Arca.",
      },
      {
        day: "Day 6",
        t: "Akumal",
        body: "Snorkel with turtles. Ceviche at Lol Ha.",
      },
      { day: "Day 7", t: "Exit", body: "Coffee on the beach, transfer." },
    ],
    experiences: [
      "Private cenote",
      "Maya cooking class",
      "Bacalar sailboat",
      "Akumal snorkel",
    ],
    upgrades: [
      { name: "Wine pairing across the week", delta: 540 },
      { name: "Photography session", delta: 620 },
    ],
    breakdown: [
      { k: "Hotel (7 nights)", v: 3080 },
      { k: "Experiences", v: 1540 },
      { k: "Transfers & guide", v: 620 },
      { k: "Dining (5 reserved)", v: 700 },
      { k: "Concierge fee", v: 300 },
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
    body: "Morning, Maya. Three proposals are in for Tulum. Want me to walk you through them?",
  },
  { from: "me", body: "Yes please. Quick take on Sofía’s?" },
  {
    from: "concierge",
    name: "NUWAI Concierge",
    time: "9:42",
    body: "Slowest of the three. Habitas, cenote-heavy, one boat day. Closest to the brief you wrote.",
  },
  { from: "me", body: "How flexible is the date on that one?" },
  {
    from: "concierge",
    name: "NUWAI Concierge",
    time: "9:42",
    body: "Mar 14 → 21 is open. ±2 days is open too. Want me to hold a tent room while you decide?",
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
    body: "Done. Tent #14 held for 48 hours. Sound bath added to Day 1 — Sofía already had one penciled in, so no extra cost.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Lena R.",
    city: "Brooklyn",
    body: "I described the trip in three sentences. Three days later I had three trips I wanted to take. Picked one. It was perfect.",
  },
  {
    name: "Marcus W.",
    city: "Austin",
    body: "NUWAI saved a friend group of seven from a Notion-doc death spiral. Worth the membership for the group chat alone.",
  },
  {
    name: "Aiyana K.",
    city: "Vancouver",
    body: "It’s the only travel product I’ve used that felt designed for people like me, not for my parents.",
  },
];

export type AdvisorRequest = {
  id: string;
  traveler: string;
  dest: string;
  budget: string;
  travelers: number;
  vibe: string;
  posted: string;
  status: "New" | "Drafting" | "Submitted" | "Won";
  deadline: string;
  match: number;
};

export const ADVISORS_INBOX: AdvisorRequest[] = [
  {
    id: "r1",
    traveler: "Maya L.",
    dest: "Tulum",
    budget: "$8–12k",
    travelers: 2,
    vibe: "Slow · Foodie",
    posted: "14m ago",
    status: "New",
    deadline: "36h",
    match: 92,
  },
  {
    id: "r2",
    traveler: "Jordan & K.",
    dest: "Amalfi Coast",
    budget: "$15–20k",
    travelers: 2,
    vibe: "Romantic · Slow",
    posted: "2h ago",
    status: "New",
    deadline: "46h",
    match: 88,
  },
  {
    id: "r3",
    traveler: "The Park 6",
    dest: "Ibiza",
    budget: "$30k+ group",
    travelers: 6,
    vibe: "Party · Yacht",
    posted: "6h ago",
    status: "Drafting",
    deadline: "24h",
    match: 81,
  },
  {
    id: "r4",
    traveler: "Theo M.",
    dest: "Tokyo",
    budget: "$6–9k",
    travelers: 1,
    vibe: "Solo · Foodie",
    posted: "Yesterday",
    status: "Submitted",
    deadline: "—",
    match: 96,
  },
  {
    id: "r5",
    traveler: "Reina S.",
    dest: "Lisbon",
    budget: "$4–6k",
    travelers: 2,
    vibe: "Slow · Creative",
    posted: "Yesterday",
    status: "Won",
    deadline: "—",
    match: 94,
  },
];
