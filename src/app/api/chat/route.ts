import { supabase } from "@/db";
import type { Chat } from "@/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Not logged in.", status: 401 });
  }

  const { user } = session;

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user", user?.email).returns<Chat[]>();

  return NextResponse.json({ data, error });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession();

  const body = await req.json();

  if (!session) {
    return NextResponse.json({ error: "Not logged in.", status: 401 });
  }

  const {chat_id, title} = body as {chat_id: string, title: string};

  const { user } = session;

  const { data, error } = await supabase
    .from("chats")
    .update({ title })
    .eq("user", user?.email)
    .eq("id", chat_id)
    .single();

  return NextResponse.json({ data, error });
}