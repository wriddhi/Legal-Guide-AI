import ChatUI from "@/components/chat";
import Sidebar from "@/components/chat/Sidebar";
import { getServerSession } from "next-auth";
import { Chat } from "@/types";
import { supabase } from "@/db";
import Document from "@/components/chat/document";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerSession();

  if (!session || !session.user) {
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
  
  const history = data.filter((chat) => chat.id === params.id)[0];

  if(!history) {
    redirect("/dashboard/chat");
  }

  return (
    <div className="w-full max-h-[92.5vh] grid grid-cols-[1fr_2fr_3fr] grid-rows-1 divide-x-2 overflow-hidden">
      <Sidebar chats={data.sort((a,b) => b.created_at - a.created_at)} />
      <Document chat={history} session={session} />
      <ChatUI title={history.title} session={session} history={history.history} />
    </div>
  );
}
