import { DocumentPage, DocSection } from "@/components/document-page";

const sections: DocSection[] = [
  {
    id: "the-brief",
    no: "01",
    title: "Writing a brief",
    body: [
      "A brief is six questions long. The most useful answers are the ones that read like sentences, not selections. Write the way you would write to a friend.",
      "You do not need to know the destination. You do not need to know the dates. You do not need to know the budget. If you are missing one of the three, we will help fill it in over a short call.",
      {
        kind: "list",
        items: [
          "Three minutes is the average time to file.",
          "Three advisors will receive the brief, independently.",
          "Three proposals will return within forty-eight hours.",
        ],
      },
      {
        kind: "note",
        body: "If you write more than 400 words, you have written enough. Stop.",
      },
    ],
  },
  {
    id: "proposals",
    no: "02",
    title: "Reading the proposals",
    body: [
      "Each proposal is a fully-formed week. It is not a quote, not a list, not a Google Doc. Open them in order. Read all three before picking one.",
      "You will find the same brief answered three different ways. The contradictions are the point. Choose the one you can already see yourself inside.",
    ],
  },
  {
    id: "holding-and-booking",
    no: "03",
    title: "Holding and booking",
    body: [
      "When you choose a proposal, NUWAI holds the principal rooms for forty-eight hours while we collect the rest of the trip. You may add upgrades, swap nights, or change a day before you confirm.",
      "Final booking happens through your advisor, at rate. We do not mark up hotels and we do not take commission from operators.",
    ],
  },
  {
    id: "during",
    no: "04",
    title: "While you are away",
    body: [
      "From the moment you leave the front door until the moment you return to it, your advisor and a member of the concierge desk are on call.",
      "We answer by name, not by ticket. We do not use shared inboxes. If you write Sofía, Sofía writes back.",
    ],
  },
  {
    id: "after",
    no: "05",
    title: "When you come home",
    body: [
      "We write to you twice — once on your first morning back, and again a month later. Both letters are short. Your answers become private margin notes on your next brief.",
      {
        kind: "note",
        body: "Your trip is never made public. We do not post locations, photographs, or tags on your behalf.",
      },
    ],
  },
  {
    id: "what-we-cannot",
    no: "06",
    title: "What we cannot help with",
    body: [
      "We do not book trips of fewer than three nights. We do not book stags or hen parties. We do not arrange flights without an accompanying itinerary. We do not refund advisor fees once a proposal has been written.",
    ],
  },
];

export default function HelpPage() {
  return (
    <DocumentPage
      kicker="Help · A working manual"
      title="How the house"
      titleItalic="works."
      dated="01 January 2026"
      intro="A short document, in plain language, in the order in which it usually matters. Read top to bottom for a first trip; jump to the section by number on every trip after."
      sections={sections}
      contactName="The concierge desk"
      contactEmail="help@nuwai.travel"
    />
  );
}
