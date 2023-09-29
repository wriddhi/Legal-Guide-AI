"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
// type Page = {
//   href: string;
//   title: string;
// };

// const pages: Page[] = [
//   { href: "/sign-in", title: "Sign In" },
//   { href: "/chat", title: "Chat" },
// ];

const Header = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();

  return (
    <header className="w-full sticky top-0 z-10 flex outline outline-1 outline-muted justify-between items-center backdrop-blur dark:bg-black/30 gap-10 px-12 py-2">
      <Link className="text-2xl font-mono font-bold" href="/">
        LegalGuide AI
      </Link>
      {session && session.user ? (
        pathname.endsWith("/chat") ? (
          <Button
            onClick={() => {
              signOut();
            }}
            className="ml-auto"
          >
            Sign Out
          </Button>
        ) : (
          <Link
            href="/chat"
            className={`ml-auto ${buttonVariants({ variant: "default" })} py-0`}
          >
            Chat
          </Link>
        )
      ) : (
        <Link
          href="/sign-in"
          className={`ml-auto ${buttonVariants({ variant: "default" })}`}
        >
          Sign In
        </Link>
      )}
      <ThemeToggle />
    </header>
  );
};

export default Header;
