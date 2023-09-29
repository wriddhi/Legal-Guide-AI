"use client";

import { Chat } from "@/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef } from "react";

import { TbEditCircle } from "react-icons/tb";

import { Button } from "@/components/ui/button";
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

const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
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


export function Edit({ title, id }: { title: string; id: string }) {

  const [input, setInput] = React.useState<string>(title);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const saveChanges = async () => {
    if (input.trim().length === 0) {
      alert("Please enter a title");
      return;
    }
    setIsLoading(true);
    const res = await fetch("/api/chat", {
      method: "PUT",
      body: JSON.stringify({
        chat_id: id,
        title: input,
      }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }
    setIsLoading(false);
    router.refresh();
    closeRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={closeRef} className="w-fit h-fit ml-auto p-2" variant="outline" title="Edit Title">
          <TbEditCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit title</DialogTitle>
          <DialogDescription>
            Make changes to your chat title here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
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
          <Button className="disabled:cursor-wait flex items-center gap-3" disabled={isLoading} onClick={saveChanges} type="submit">
            {isLoading ? "Saving" : "Save"} changes {isLoading && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Sidebar = ({ chats }: { chats: Chat[] | null }) => {
  const pathname = usePathname().split("/")[2];
  return (
    <aside className="w-64 h-screen bg-popover outline outline-1 outline-muted flex flex-col gap-4 justify-start items-center p-4">
      <button className="bg-primary text-primary-foreground px-4 py-1 w-full rounded-md">
        New chat +
      </button>
      {chats ? (
        <ul className="w-full flex flex-col gap-2">
          {chats.map((chat) => (
            <React.Fragment key={chat.id}>
              <hr />
              <li
                className={`w-full px-2 py-1 flex justify-start items-center ${
                  pathname === chat.id
                    ? "border-solid border-0 border-l-4 border-primary text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Link href={`/chat/${chat.id}`}>{chat.title}</Link>{" "}
                <Edit title={chat.title} id={chat.id} />
              </li>
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <p className="text-primary-foreground">No chats</p>
      )}
    </aside>
  );
};

export default Sidebar;
