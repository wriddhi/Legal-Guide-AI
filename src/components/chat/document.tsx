"use client";

import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Chat } from "@/types";
import { useDropzone } from "react-dropzone";

import { useRouter } from "next/navigation";

const Document = ({ chat, session }: { chat: Chat; session: Session }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      ["application/pdf"]: [".pdf"],
    },
    maxFiles: 2,
    maxSize: 1048576,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setLoading(true);
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.set("file", file);
      formData.set("chat_id", chat.id);

      const upload = async () => {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        setLoading(false);

        router.refresh();
      };

      upload();
    }

    return () => {};
  }, [acceptedFiles]);

  if (!session) {
    return <></>;
  }

  return (
    <section className="grid place-items-center">
      {chat.file ? (
        <object
          data={chat.file.toString()}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      ) : loading ? (
        <div className="loader"></div>
      ) : (
        <div className="p-10 flex flex-col gap-10 justify-center items-center">
          <h3 className="text-muted-foreground text-center">
            No file was uploaded for this conversation
          </h3>
          <section className="bg-muted p-20 text-center text-muted-foreground outline-dashed outline-1 rounded-xl">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag and drop a file here, or click to select files</p>
            </div>
            <em>Only .pdf files are accepted</em>
          </section>
        </div>
      )}
    </section>
  );
};

export default Document;
