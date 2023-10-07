import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/Header";
import { SessionProvider } from "@/providers/session";
import { getServerSession } from "next-auth";
import { outfit, mono } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster"


export const metadata: Metadata = {
  title: "Legal Guide",
  description: "An AI-powered legal guide chatbot for startups and small businesses",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#000000" />
      </head>
      <SessionProvider session={session}>
        <body
          className={`${outfit.variable} ${mono.variable} bg-background font-sans flex flex-col justify-start items-center min-h-screen h-full`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header session={session} />
            {children}
          </ThemeProvider>
        <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
