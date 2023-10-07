import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDateTime(timestamp: number): {
  date: string;
  time: string;
} {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // To get the full month name
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  function getDayWithSuffix(day: number) {
    if (day > 3 && day < 21) return day + "th";
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  }

  return {
    date: `${getDayWithSuffix(day)} ${month}, ${year}`,
    time: `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
  };
}

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const chat = async (message: string): Promise<string> => {
  const formData = new FormData();

  formData.set("user_input", message);
  const flask = await fetch(`http://165.22.220.174:8080/chat`, {
    method: "POST",
    body: formData,
  });

  const { response, error } = (await flask.json()) as {
    response?: string;
    error?: string;
  };

  console.log("From flask, response => ", response);
  console.log("From flask error => ", error);

  if (error) {
    console.log(error);
    return "Sorry, I didn't get that";
  }

  return response || "Sorry, I didn't get that";
};

export const upload = async (file: File, chat_id: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("chat_id", chat_id);

  console.log("Uploading file to supabase . . .");
  const bucket = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  formData.delete("file");
  formData.delete("chat_id");

  formData.set("user_input", "p");
  formData.set("pdf", file);
  // const flask = await fetch(`${process.env.NEXT_PUBLIC_FLASK_URL}/chat`, {
  console.log("Uploading file to flask . . .");
  const flask = await fetch(`http://165.22.220.174:8080/chat`, {
    method: "POST",
    body: formData,
  });

  console.log("From flask upload => ", await flask.json());

  if (!flask.ok) {
    console.log(flask);
    return { data: null, error: "Flask error" };
  }

  if (!bucket.ok) {
    const bucketError = await bucket.json();
    return { data: null, error: bucketError.error };
  }

  return { data: await flask.json(), error: null };
};
