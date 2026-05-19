import { DocumentPage, DocSection } from "@/components/document-page";

const sections: DocSection[] = [
  {
    id: "what-we-hold",
    no: "01",
    title: "What we hold",
    body: [
      "We hold three categories of information about you: the brief you wrote, the trips you confirmed, and the conversations you had with your advisor. We hold the email you signed in with and the country your card was issued from.",
      "We do not hold passport pages we have not been asked to hold. We do not hold the contents of an unconfirmed proposal beyond ninety days.",
    ],
  },
  {
    id: "what-we-do",
    no: "02",
    title: "What we do with it",
    body: [
      "Your brief is read by three advisors, in confidence, under a written non-disclosure. Your confirmed trip is shared only with the operators required to deliver it. Your conversations are kept private to the house.",
      {
        kind: "list",
        items: [
          "We use what you tell us to write a better next brief.",
          "We use anonymised aggregates to publish the Atlas and the Journal.",
          "We do not use your data for advertising, profiling, or anything you would not expect of a small house.",
        ],
      },
    ],
  },
  {
    id: "third-parties",
    no: "03",
    title: "The third parties",
    body: [
      "We use a small number of standard tools — Stripe for payments, AWS for hosting, Postmark for letters. Each is named below. Each is bound by a written data-processing agreement.",
      "We do not use Google Analytics, Meta Pixel, or any tracker that follows you outside our pages. The session cookie is first-party and expires when you sign out.",
    ],
  },
  {
    id: "your-rights",
    no: "04",
    title: "Your rights",
    body: [
      "You may write to us at any time and request a copy of everything we hold about you. We answer within twenty days. You may ask us to correct or delete what we hold; we will, unless we are required to keep it for tax or anti-fraud purposes.",
      "Where the law lets you, you may object to our processing of your data. Write to us. We will not make it hard.",
    ],
  },
  {
    id: "breach",
    no: "05",
    title: "If something goes wrong",
    body: [
      "In the unlikely event of a data breach affecting members, we will write to the affected members within seventy-two hours of discovery. The letter will be signed by an officer of the house, on paper as well as by email.",
      {
        kind: "note",
        body: "We have not had a notifiable incident. We expect this to remain the case.",
      },
    ],
  },
  {
    id: "how-to-write",
    no: "06",
    title: "How to write to us",
    body: [
      "Privacy correspondence goes to the Office of the Data Protection Officer, by email. We answer within five working days, and complete most requests within twenty.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <DocumentPage
      kicker="Privacy · A short, plain statement"
      title="On the data"
      titleItalic="we hold."
      dated="01 January 2026"
      intro="Most privacy policies are written for the courts. This one is written for you. If a section is unclear, write to us, and we will rewrite it before the next edition."
      sections={sections}
      contactName="Office of the Data Protection Officer"
      contactEmail="privacy@nuwai.travel"
    />
  );
}
