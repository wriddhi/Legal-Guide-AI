import { Outfit, Major_Mono_Display } from "next/font/google";

export const outfit = Outfit<"--font-sans">({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const mono = Major_Mono_Display<"--font-mono">({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});
