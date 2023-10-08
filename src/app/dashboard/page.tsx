import React from "react";
import { PiChatText } from "react-icons/pi";
import { TiDocumentAdd } from "react-icons/ti";
import {TbTextRecognition} from "react-icons/tb";
import Link from "next/link";

type Feature = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

const Card = ({ feature }: { feature: Feature }): JSX.Element => {
  return (
    <Link
      className="w-full h-40 flex flex-col gap-4 p-4 bg-accent rounded-md border-solid border border-border hover:bg-primary hover:text-background focus:bg-primary focus:text-primary-foreground transition-all group"
      href={feature.href}
    >
      <h2 className="text-3xl font-mono font-bold flex justify-between items-center gap-2">
        {feature.title}
        {feature.icon}
      </h2>
      <p className="text-lg text-muted-foreground group-hover:text-muted group-focus:text-muted">
        {feature.description}
      </p>
    </Link>
  );
};

export default function Dashboard() {
  const features: Feature[] = [
    {
      title: "Chat",
      description:
        "Chat with our AI to get help with your existing legal documents.",
      icon: (
        <PiChatText className="scale-125 group-hover:scale-150 group-focus:scale-150 transition-all" />
      ),
      href: "/dashboard/chat",
    },
    {
      title: "Generate",
      description:
        "Generate a draft of legal documents as per your needs with our AI.",
      icon: (
        <TiDocumentAdd className="scale-125 group-hover:scale-150 group-focus:scale-150 transition-all" />
      ),
      href: "/dashboard/generate",
    },
    {
      title: "Summary",
      description: "Summarize your legal documents to understand them better with our AI.",
      icon: (
        <TbTextRecognition className="scale-125 group-hover:scale-150 group-focus:scale-150 transition-all" />
      ),
      href: "/dashboard/summary",
    }
  ];

  return (
    <main className="w-full h-full p-4 md:p-16 flex-1 flex flex-col gap-20 ">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <section className="flex-1 flex flex-col gap-4 lg:grid lg:place-items-center lg:gap-16 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} feature={feature} />
        ))}
      </section>
    </main>
  );
}
