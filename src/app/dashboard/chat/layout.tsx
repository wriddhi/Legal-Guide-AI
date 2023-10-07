import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Chat | LegalGuide AI",
  description: "Chat with your AI lawyer",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();


  if (!session || !session.user) {
    redirect("/sign-in");
  }

  return (
    <>
        {children}
    </>
  );
}
