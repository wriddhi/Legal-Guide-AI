"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { TbEditCircle } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-background"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-100"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export function Edit({
  title,
  id,
  className = "",
}: {
  title: string;
  id: string;
  className?: string;
}) {
  const [input, setInput] = React.useState<string>(title);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  const closeRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const saveChanges = async () => {
    if (input.trim().length === 0) {
      return;
    }
    setIsSaving(true);
    const res = await fetch("/api/chat", {
      method: "PUT",
      body: JSON.stringify({
        chat_id: id,
        title: input,
      }),
    });

    const data = await res.json();

    if (data.error) {
      console.log(data.error);
      return;
    }
    setIsSaving(false);
    router.refresh();
    closeRef.current?.click();
  };

  const deleteChat = async () => {
    setIsDeleting(true);
    const res = await fetch("/api/chat", {
      method: "DELETE",
      body: JSON.stringify({
        chat_id: id,
      }),
    });

    const data = await res.json();

    if (data.error) {
      console.log(data.error);
      return;
    }
    setIsDeleting(false);
    router.refresh();
    closeRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          ref={closeRef}
          className={cn("w-fit h-fit ml-auto p-2", className)}
          variant="outline"
          title="Edit Chat"
        >
          <TbEditCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Chat</DialogTitle>
          <DialogDescription>
            Make changes to your chat title here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <label htmlFor="Title" className="text-right">
              Title
            </label>
            <Input
              id="Title"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            className="disabled:cursor-wait mr-auto flex items-center gap-3"
            disabled={isDeleting || isSaving}
            onClick={deleteChat}
            type="submit"
          >
            {isDeleting ? "Deleting" : "Delete"} chat{" "}
            {isDeleting && <Spinner />}
          </Button>
          <Button
            className="disabled:cursor-wait flex items-center gap-3"
            disabled={isSaving || isDeleting}
            onClick={saveChanges}
            type="submit"
          >
            {isSaving ? "Saving" : "Save"} changes {isSaving && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
