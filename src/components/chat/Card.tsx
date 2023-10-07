"use client";

import React from "react";
import { getFormattedDateTime } from "@/lib/utils";
import Link from "next/link";
import { TbMessage2Plus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { Edit } from "./Edit";

export const New = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const handleNewChat = async () => {
    setIsLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
    });

    setIsLoading(false);
    router.refresh();
  };

  return (
    <button
      title="Create a new chat"
      onClick={handleNewChat}
      disabled={isLoading}
      className={`${
        isLoading && "opacity-80 cursor-wait"
      } bg-primary text-primary-foreground outline-1 outline-ring w-full p-10 rounded-2xl flex justify-between items-center`}
    >
      <span className="bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-orange-500 via-purple-500 to-blue-500 w-16 h-16 rounded-full grid place-items-center">
        <TbMessage2Plus className="text-2xl text-black" />
      </span>
      <div className="text-right">
        <h3 className="font-bold">
          + {isLoading ? "Creating" : "Create"} a New Chat
        </h3>
        <p>{isLoading ? "Starting" : "Start"} a new conversation</p>
        {isLoading && <p>Please wait . . .</p>}
      </div>
    </button>
  );
};

export const Card = ({
  title,
  href,
  created_at,
}: {
  title: string;
  href: string;
  created_at: number;
}) => {
  const { date, time } = getFormattedDateTime(created_at);

  return (
    <div className="bg-primary text-primary-foreground outline-1 outline-ring w-full p-10 rounded-2xl flex justify-between items-center relative">
      <span className="bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-orange-500 via-purple-500 to-blue-500 w-16 h-16 rounded-full"></span>
      <div className="text-right ">
        <Edit
          className="bg-primary absolute top-2 right-2"
          title={title}
          id={href.split("/")[1]}
        />
        <Link href={href}>
          <h3 className="font-bold">{title}</h3>
          <p>{date}</p>
          <p>{time.slice(0, -3)}</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
