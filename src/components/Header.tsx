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

  const getLinkForAuthenticatedRoute = (): JSX.Element => {
    if (pathname === "/dashboard") {
      return (
        <Button
          onClick={() => {
            signOut();
          }}
          className="ml-auto"
        >
          Sign Out
        </Button>
      );
    }

    if (pathname.startsWith("/dashboard")) {
      return pathname.split("/").length === 4 ? (
        <Link
          href={`/dashboard/${pathname.split("/")[2]}`}
          className={`ml-auto ${buttonVariants({ variant: "default" })} py-0`}
        >
          Go to {pathname.split("/")[2]}
        </Link>
      ) : (
        <Link
          href="/dashboard"
          className={`ml-auto ${buttonVariants({ variant: "default" })} py-0`}
        >
          Back to dashboard
        </Link>
      );
    }
    return (
      <Link
        href="/dashboard"
        className={`ml-auto ${buttonVariants({ variant: "default" })} py-0`}
      >
        Continue to dashboard
      </Link>
    );
  };

  return (
    <header className="w-full sticky top-0 z-10 flex outline outline-1 outline-muted justify-between items-center backdrop-blur dark:bg-black/30 gap-4 lg:gap-10 px-4 lg:px-12 py-2">
      <Link className="text-xl lg:text-2xl font-mono font-bold" href="/">
        LegalGuide AI
      </Link>
      {session && session.user ? (
        getLinkForAuthenticatedRoute()
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
