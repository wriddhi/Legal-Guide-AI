"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import Prompt from "./Input";
import { Message } from "@/types";
import { chat, getFormattedDateTime } from "@/lib/utils";

import { PiCopyBold } from "react-icons/pi";
import { SiOpenai } from "react-icons/si";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineVerticalAlignTop } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";
import { usePathname } from "next/navigation";

const CopyBtn = ({ message }: { message: string }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = (text: string) => () => {
    console.log("Copying to clipboard => ", text);
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <button
      onClick={copyToClipboard(message)}
      title="Copy to clipboard"
      className="text-primary/90 active:text-primary"
    >
      {!copied ? <PiCopyBold /> : <BsCheck2Circle className="text-green-500" />}
    </button>
  );
};

const ChatUI = ({
  title,
  history,
  session,
}: {
  title: string;
  history: Message[];
  session: Session;
}) => {
  const [userIcon, setUserIcon] = React.useState<boolean>(false);
  const [prompt, setPrompt] = React.useState<string>("");
  const [chatHistory, setChatHistory] = React.useState<Message[]>(history);

  const [showScrollUpButton, setShowScrollUpButton] =
    React.useState<boolean>(true);
  const [showScrollDownButton, setShowScrollDownButton] =
    React.useState<boolean>(true);

  const ref = useRef<HTMLDivElement>(null);

  const pathname = usePathname().split("/")[2];

  const sendMessage = async () => {
    if (prompt.trim().length === 0) {
      return;
    }


    setPrompt("");

    console.log("Sending message => ", prompt);

    const newMessage: Message = {
      message: prompt,
      role: "user",
      timestamp: Date.now(),
    };
    setChatHistory([...chatHistory, newMessage]);
    const res = await chat(prompt);
    setChatHistory([
      ...chatHistory,
      newMessage,
      { role: "system", message: res, timestamp: Date.now() },
    ]);
  };

  const handleScroll = () => {
    if (ref.current?.scrollTop ?? 0 > 100) {
      setShowScrollUpButton(true);
    } else {
      setShowScrollUpButton(false);
    }
  };

  const scrollToTop = () => {
    ref.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    ref.current?.addEventListener("scroll", handleScroll);
    return () => {
      ref.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main
      ref={ref}
      className="flex flex-1 flex-col gap-3 w-full overflow-y-auto p-10 mb-20 transform-none divide-y relative"
    >
      <h2 className="mb-4 text-xl font-semibold">{title === "New Chat" ? pathname == "summary" ? "New Summary" : title : title}</h2>
      {chatHistory.length === 0 && (
        <p className="p-4 text-center w-full text-muted-foreground">
          No conversation history
        </p>
      )}
      {chatHistory.map((message, i) => (
        <div className="p-3 w-full flex flex-col gap-4 mx-auto" key={i}>
          <span className="w-full text-lg flex items-center gap-3">
            {message.role === "user" ? (
              <>
                {userIcon ? (
                  <AiOutlineUser />
                ) : (
                  <Image
                    className="rounded-full"
                    onError={() => {
                      setUserIcon(true);
                    }}
                    src={session.user?.image || ""}
                    height={30}
                    width={30}
                    alt="User"
                  />
                )}
                <h3 className="font-bold mr-auto">You</h3>
              </>
            ) : (
              <>
                <SiOpenai />
                <h3 className="font-bold mr-auto">LegalGuide AI</h3>
              </>
            )}
            <time className="text-muted-foreground text-sm font-light">
              {getFormattedDateTime(message.timestamp).date}
            </time>
            <time className="text-muted-foreground text-sm font-light">
              {getFormattedDateTime(message.timestamp).time}
            </time>
            <CopyBtn message={message.message} />
          </span>
          <pre className="text-muted-foreground font-sans flex-wrap  overflow-x-auto">
            {message.message}
          </pre>
        </div>
      ))}
      {showScrollUpButton && (
        <button
          title="Scroll to Top"
          onClick={scrollToTop}
          className="fixed bottom-24 right-5 rounded-full outline bg-muted outline-border p-3"
        >
          <MdOutlineVerticalAlignTop />
        </button>
      )}
      <Prompt prompt={prompt} setPrompt={setPrompt} sendMessage={sendMessage} />
    </main>
  );
};

export default ChatUI;
