import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineEnter } from "react-icons/ai";

function Prompt({
  prompt,
  setPrompt,
  sendMessage,
}: {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}) {
  return (
    <span className="fixed bottom-0 right-0 w-full bg-primary-foreground p-4 flex gap-4 rounded-t-xl">
      <Textarea
        rows={1}
        className="resize-none"
        placeholder="Type your message here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button title="Send" onClick={sendMessage}>
        <AiOutlineEnter className="text-background bg-primary h-12 w-12 p-2 rounded-md" />
      </button>
    </span>
  );
}

export default Prompt;
