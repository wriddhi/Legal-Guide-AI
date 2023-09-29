import { getServerSession } from "next-auth";
import { Chat } from "@/types";
import { supabase } from "@/db";
import Link from "next/link";
import Card from "@/components/chat/Card";

export default async function page() {
  const session = await getServerSession();

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const { user } = session;

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user", user?.email)
    .returns<Chat[]>();

    if(error || !data) {
      throw error;
    }

  return (
    <div className="w-full max-h-[92.5vh] grid grid-cols-4 p-24 gap-24 overflow-hidden">
      {data.map((chat) => (
        <Link href={`chat/${chat.id}`} key={chat.id} className="w-full flex">
          <Card title={chat.title} />
        </Link>
      ))}
    </div>
  );
}
