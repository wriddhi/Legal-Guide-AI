import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | LegalGuide AI",
  description:
    "An AI-powered legal guide chatbot for startups and small businesses",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
