import { supabase } from "@/db";
import type { Chat } from "@/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// GET all chats
export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Not logged in.", status: 401 });
  }

  const { user } = session;

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user", user?.email)
    .returns<Chat[]>();

  return NextResponse.json({ data, error });
}

// POST a new chat
export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Not logged in.", status: 401 });
  }

  const { user } = session;

  const { data, error } = await supabase
    .from("chats")
    .insert({ user: user?.email, created_at: Date.now() })
    .select()
    .returns<Chat[]>()
    .single();

  return NextResponse.json({ id: data?.id });
}

// UPDATE the title of a chat
export async function PUT(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Not logged in.", status: 401 });
  }

  const body = await req.json();

  const { chat_id, title } = body as { chat_id: string; title: string };

  const { user } = session;

  const { data, error } = await supabase
    .from("chats")
    .update({ title })
    .eq("id", chat_id)
    .eq("user", user?.email);

  return NextResponse.json({ data, error });
}

// DELETE a chat
export async function DELETE(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Not logged in.", status: 401 });
  }

  const body = await req.json();

  const { chat_id } = body as { chat_id: string };

  const { user } = session;

  const { data, error } = await supabase
    .from("chats")
    .delete()
    .eq("id", chat_id)
    .eq("user", user?.email);

  const { data: fileData, error: fileError } = await supabase.storage
    .from("files")
    .remove([`${chat_id}`]);

  return NextResponse.json({ data, error });
}
