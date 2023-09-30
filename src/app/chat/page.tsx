import { getServerSession } from "next-auth";
import { Chat } from "@/types";
import { supabase } from "@/db";
import Link from "next/link";
import { Card, New } from "@/components/chat/Card";

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

  if (error || !data) {
    throw error;
  }

  return (
    <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-3 p-4 lg:p-20 gap-4 lg:gap-20">
      <h1 className="col-span-3 text-3xl font-bold">
        Your conversations <span  className="text-muted-foreground font-mono font-light tracking-tighter text-2xl"> {`(${data.length}/6)`} </span>
      </h1>
      {data.length !== 6 && <New />}
      {data.map((chat) => (
        <Card
          key={chat.id}
          href={`chat/${chat.id}`}
          created_at={chat.created_at}
          title={chat.title}
        />
      ))}
    </div>
  );
}
