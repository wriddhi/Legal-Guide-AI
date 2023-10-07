import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <main className="h-full flex-1 flex flex-col justify-evenly items-center py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-16 lg:px-12">
      <Link
        href="#"
        className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-muted-foreground bg-muted rounded-full"
        role="alert"
      >
        <span className="text-xs bg-primary rounded-full text-background px-4 py-1.5 mr-3">
          New
        </span>{" "}
        <span className="text-sm font-medium">
          LegalGuide AI is out! See what&apos;s new
        </span>
        <svg
          className="ml-2 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Your Legal Ally in Every Business Move
      </h1>
      <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Here at LegalGuide AI, we focus on navigating legal waters for small
        businesses, startups, and entrepreneurs. We believe that finding the
        legal help you need should be a right, not a privilege.
      </p>
      <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <Link
          href="#"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-accent-foreground rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          Learn more
          <svg
            className="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
        <Link
          href="#"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-foreground rounded-lg border border-border hover:bg-primary focus:bg-primary hover:text-background focus:text-background transition-all focus:ring-4 focus:ring-ring"
        >
          <svg
            className="mr-2 -ml-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
          </svg>
          Watch video
        </Link>
      </div>
    </main>
  );
}
