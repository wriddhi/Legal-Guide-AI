import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | LegalGuide AI",
  description: "Find all the legal help you need in one place.",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session || !session.user) {
    console.log(session)
    redirect("/sign-in");
  }
  return <>{children}</>;
}
