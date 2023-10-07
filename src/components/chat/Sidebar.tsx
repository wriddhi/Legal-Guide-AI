"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Edit } from "@/components/chat/Edit";
import { Chat } from "@/types";

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

const Sidebar = ({ chats }: { chats: Chat[] }) => {

  const pathname = usePathname().split("/")[3];
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleNewChat = async () => {
    setIsLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
    });

    const { id } = (await res.json()) as { id: string };

    setIsLoading(false);
    router.push(`/dashboard/chat/${id}`);
  };

  return (
    <aside className="w-64 h-screen bg-popover outline outline-1 outline-muted flex flex-col gap-4 justify-start items-center p-4">
      {chats.length <= 6 && <button
        onClick={handleNewChat}
        disabled={isLoading}
        className="bg-primary text-primary-foreground disabled:bg-muted-foreground flex justify-center gap-3 disabled:cursor-not-allowed px-4 py-2 w-full rounded-md"
      >
        {isLoading ? "Creating" : "Create"} a new chat + {isLoading && <Spinner />}
      </button>}
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
                <Link href={`/dashboard/chat/${chat.id}`}>{chat.title}</Link>{" "}
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
