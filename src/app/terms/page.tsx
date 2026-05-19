import { DocumentPage, DocSection } from "@/components/document-page";

const sections: DocSection[] = [
  {
    id: "the-parties",
    no: "01",
    title: "The parties",
    body: [
      "These terms apply between NUWAI Travel, Inc. (\"NUWAI,\" \"we\") and you (\"the member,\" \"you\"). They are entered into when you file a brief, request membership, or pay any advisor fee.",
      "NUWAI is incorporated in Delaware and headquartered in Lisbon. Our advisors operate independently, on assignment, under a separate written agreement.",
    ],
  },
  {
    id: "the-brief",
    no: "02",
    title: "The brief and proposals",
    body: [
      "When you file a brief, we accept it for assignment to three advisors at our discretion. We may decline a brief without reason. Advisors are paid for their time regardless of outcome.",
      "Proposals returned to you remain the intellectual property of the originating advisor. They may not be forwarded, posted, or shared outside your immediate party.",
    ],
  },
  {
    id: "fees",
    no: "03",
    title: "Fees and payment",
    body: [
      "There is no charge to file a brief. Membership fees, where applicable, are stated on the membership page and are billed annually.",
      "Trip costs are paid to operators at rate, through your advisor. NUWAI takes no commission from operators and discloses every fee on the proposal breakdown.",
      {
        kind: "list",
        items: [
          "A concierge fee, listed line-item on every breakdown.",
          "An optional advisor retainer, with your written consent.",
          "Third-party operator costs, billed at rate.",
        ],
      },
    ],
  },
  {
    id: "cancellation",
    no: "04",
    title: "Cancellation and changes",
    body: [
      "Until you confirm a proposal, you may cancel a brief at any time, at no cost. Once a proposal is confirmed, cancellation terms are set by the underlying operators (hotels, charters, restaurants) and disclosed in advance.",
      "We do not retroactively refund advisor fees. We will, on occasion and at our discretion, credit them against a future brief.",
    ],
  },
  {
    id: "warranties",
    no: "05",
    title: "What we warrant, and what we do not",
    body: [
      "We warrant that every advisor on our register has been interviewed, referenced, and admitted. We warrant that no operator pays us a kickback.",
      "We do not warrant the weather, the moods of the staff at a hotel we have not built, or the goodwill of a fellow guest. We will work in good faith to make the trip right; we cannot rewrite it.",
    ],
  },
  {
    id: "law",
    no: "06",
    title: "Governing law",
    body: [
      "These terms are governed by the laws of Portugal. Any dispute will be heard in Lisbon, in English, before a single arbitrator agreed by the parties.",
      {
        kind: "note",
        body: "We have not been to court, and would prefer to keep it that way. Write to us first.",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <DocumentPage
      kicker="Terms · The standing arrangement"
      title="Terms of"
      titleItalic="service."
      dated="01 January 2026"
      intro="The contract between you and the house, written in plain language. Six sections, in roughly the order they tend to matter. If anything below conflicts with what we agreed in writing on a brief, the brief stands."
      sections={sections}
      contactName="Office of the General Counsel"
      contactEmail="counsel@nuwai.travel"
    />
  );
}
