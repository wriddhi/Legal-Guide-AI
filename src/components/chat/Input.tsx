import React, {useEffect, useCallback} from "react";
import { Textarea } from "@/components/ui/textarea";
import { LuSend } from "react-icons/lu";

function Prompt({
  prompt,
  setPrompt,
  sendMessage,
}: {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}) {

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  return (
    <span className="fixed bottom-0 right-0 w-full bg-primary-foreground p-4 flex gap-4 rounded-t-xl">
      <Textarea
        rows={1}
        className="resize-none"
        placeholder="Type your message here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
          }
        }}
      />
      <button title="Send" onClick={sendMessage}>
        <LuSend className="text-background bg-primary h-12 w-12 p-3 rounded-md" />
      </button>
    </span>
  );
}

export default Prompt;
