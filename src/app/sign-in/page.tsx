import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignIn from "@/components/SignIn";

export default async function page() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <SignIn />;
}
