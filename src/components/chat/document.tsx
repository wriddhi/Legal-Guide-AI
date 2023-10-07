"use client";

import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Chat } from "@/types";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

import { wait, upload } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";

const FILE_SIZE_LIMIT = 10485760;

const Document = ({ chat, session }: { chat: Chat; session: Session }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        ["application/pdf"]: [".pdf"],
      },
      maxSize: FILE_SIZE_LIMIT,
      maxFiles: 1,
      noClick: true,
      onDropAccepted: (acceptedFiles) => {
        setFile(acceptedFiles[0]);
      },
    });

  useEffect(() => {
    if (file) {
      const uploadFile = async () => {
        setLoading(true);
        try {
          const { data, error } = await upload(file, chat.id);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
        router.refresh();
      };

      uploadFile();
    }
  }, [file]);

  useEffect(() => {
    console.log("Loading = ", loading);
  }, [loading]);

  if (!session) {
    return <></>;
  }

  return (
    <section className="grid place-items-center pb-20">
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
          <label
            {...getRootProps({ className: "dropzone" })}
            htmlFor="file"
            className="bg-muted p-20 text-center text-muted-foreground outline-dashed outline-1 rounded-xl"
          >
            <input id="file" {...getInputProps()} />
            <p>Drag and drop a file here, or click to select files</p>
            <em>Only .pdf files of size less than 10 MB are accepted</em>
          </label>
        </div>
      )}
    </section>
  );
};

export default Document;
