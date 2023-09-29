import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/db";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "You must be signed in to view this page." },
      { status: 401 }
    );
  }

  const form = await request.formData();

  const file: File | null = form.get("file") as File;

  const chat_id = form.get("chat_id") as string;

  if (!file) {
    return NextResponse.json({ error: "No file was received", status: 422 });
  }

  const { data: upload, error } = await supabase.storage
    .from("files")
    .upload(chat_id, file);

  if (error) {
    return NextResponse.json(
      { error: "Could not upload file to server" },
      { status: 500 }
    );
  }

  const { data: urlData } = supabase.storage
    .from("files")
    .getPublicUrl(chat_id);

  const { data, error: updateError } = await supabase
    .from("chats")
    .update({
      file: urlData.publicUrl,
    })
    .eq("id", chat_id)
    .eq("user", session.user.email)
    .single();

  if (updateError) {
    return NextResponse.json({ error: "Could not update chat", status: 500 });
  }

  return NextResponse.json({ data: "Uploaded successfully" });
}
