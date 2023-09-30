"use client";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "next-themes";

type SignInProps = {
  calbackUrl?: string;
};

const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-background"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-100"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

const SignIn = ({ calbackUrl = "/" }: SignInProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { theme } = useTheme();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    await signIn("google");
    // await wait(1000);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="w-full h-full p-4 lg:p-24 flex flex-col justify-center items-center lg:flex-row my-auto"
    >
      <section className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-8 bg-muted outline outline-white/10 outline-1 p-10 rounded-xl">
        <h1 className="bg-gradient-to-b text-5xl font-medium pb-4">
          Welcome back
        </h1>
        <p className="text-muted-foreground font-mono font-bold">
          Sign in to your <b className="text-primary"> LegalGuide AI </b>{" "}
          account
        </p>
        <button
          disabled={loading}
          className={`flex justify-evenly items-center gap-4 ${
            loading ? "cursor-wait" : "cursor-pointer"
          } bg-primary text-background font-medium px-6 py-2 mx-auto md:ml-0 transition-all`}
        >
          <FcGoogle /> Sign In with Google {loading && <Spinner />}
        </button>
        <div className="w-full flex items-center before:flex-1 before:border-t before:border-prime after:flex-1 after:border-t after:border-prime">
          <span className="mx-4 mb-0 text-center">OR</span>
        </div>
        <Link className="underline mx-auto md:ml-0" href={calbackUrl}>
          Maybe Later
        </Link>
      </section>
      <section className="hidden lg:w-1/2 h-full lg:grid place-items-center relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="463"
          zoomAndPan="magnify"
          viewBox="0 0 347.25 378.749984"
          height="505"
          preserveAspectRatio="xMidYMid meet"
          version="1.0"
        >
          <defs>
            <clipPath id="4fb5a944b3">
              <path
                d="M 168 120 L 249.578125 120 L 249.578125 291 L 168 291 Z M 168 120 "
                clipRule="nonzero"
              />
            </clipPath>
            <clipPath id="f931bc94ae">
              <path
                d="M 0.367188 1.027344 L 181 1.027344 L 181 201 L 0.367188 201 Z M 0.367188 1.027344 "
                clipRule="nonzero"
              />
            </clipPath>
            <clipPath id="c22afcfff3">
              <path
                d="M 271 51 L 272 51 L 272 291.976562 L 271 291.976562 Z M 271 51 "
                clipRule="nonzero"
              />
            </clipPath>
            <clipPath id="71ce9e5506">
              <path
                d="M 258.4375 51 L 261 51 L 261 124 L 258.4375 124 Z M 258.4375 51 "
                clipRule="nonzero"
              />
            </clipPath>
            <clipPath id="6999601106">
              <path
                d="M 258.4375 219 L 261 219 L 261 291.976562 L 258.4375 291.976562 Z M 258.4375 219 "
                clipRule="nonzero"
              />
            </clipPath>
            <clipPath id="e9ca41ed0f">
              <path
                d="M 23.476562 277.734375 L 346.5 277.734375 L 346.5 377.269531 L 23.476562 377.269531 Z M 23.476562 277.734375 "
                clipRule="nonzero"
              />
            </clipPath>
          </defs>
          <g clipPath="url(#4fb5a944b3)">
            <path
              fill={theme == "light" ? "black" : "white"}
              d="M 209.433594 146.617188 L 209.433594 120.546875 L 208.632812 120.546875 L 208.632812 146.617188 L 195.496094 146.617188 L 168.523438 173.578125 L 168.523438 215.800781 L 208.632812 215.800781 L 208.632812 290.167969 L 209.433594 290.167969 L 209.433594 215.800781 L 222.574219 215.800781 L 249.546875 188.839844 L 249.546875 146.617188 Z M 195.824219 147.417969 L 208.625 147.417969 L 208.625 161.71875 L 209.425781 161.71875 L 209.425781 147.417969 L 248.167969 147.417969 L 222.226562 173.34375 L 169.882812 173.34375 Z M 169.324219 174.144531 L 222.003906 174.144531 L 222.003906 215 L 169.324219 215 Z M 169.324219 174.144531 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
          <g clipPath="url(#f931bc94ae)">
            <path
              fill={theme == "light" ? "black" : "white"}
              d="M 180.898438 133.820312 L 180.898438 35.082031 L 144.5625 35.082031 L 144.5625 1.351562 L 126.632812 1.351562 L 116.386719 11.589844 L 116.386719 35.082031 L 98.574219 35.082031 L 71.601562 62.042969 L 71.601562 146.617188 L 27.917969 146.617188 L 27.917969 106.117188 L 27.113281 106.117188 L 27.113281 146.847656 L 0.367188 173.578125 L 0.367188 194.109375 L 27.105469 194.109375 L 27.105469 200.390625 L 27.910156 200.390625 L 27.910156 194.109375 L 120.347656 194.109375 L 147.320312 167.152344 L 147.320312 160.78125 L 153.917969 160.78125 Z M 72.40625 159.980469 L 72.40625 62.609375 L 116.386719 62.609375 L 116.386719 116.164062 L 128.171875 116.164062 L 128.171875 142.144531 L 128.972656 142.144531 L 128.972656 116.164062 L 134.308594 116.164062 L 134.308594 116.21875 L 144.160156 106.371094 L 144.160156 106.332031 L 144.5625 105.929688 L 144.5625 62.609375 L 153.355469 62.609375 L 153.355469 159.980469 Z M 117.1875 12.152344 L 133.75 12.152344 L 133.75 115.359375 L 117.1875 115.359375 Z M 179.527344 35.882812 L 153.589844 61.808594 L 144.554688 61.808594 L 144.554688 35.882812 Z M 126.960938 2.152344 L 143.191406 2.152344 L 133.988281 11.351562 L 117.757812 11.351562 Z M 98.90625 35.882812 L 116.386719 35.882812 L 116.386719 61.808594 L 72.964844 61.808594 Z M 27.910156 160.378906 L 27.910156 147.417969 L 71.59375 147.417969 L 71.59375 160.78125 L 132.578125 160.78125 L 120.011719 173.34375 L 1.738281 173.34375 L 27.105469 147.984375 L 27.105469 160.378906 Z M 1.167969 174.144531 L 119.785156 174.144531 L 119.785156 193.308594 L 1.167969 193.308594 Z M 1.167969 174.144531 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
          <path
            fill={theme == "light" ? "black" : "white"}
            d="M 137.628906 206.183594 L 55.304688 206.183594 L 28.332031 233.144531 L 28.332031 285.753906 L 66.070312 285.753906 L 93.101562 312.769531 L 110.65625 312.769531 L 137.773438 285.664062 L 137.773438 263.734375 L 137.628906 258.625 Z M 55.636719 206.988281 L 136.257812 206.988281 L 110.320312 232.914062 L 29.695312 232.914062 Z M 66.402344 284.949219 L 29.136719 284.949219 L 29.136719 233.714844 L 110.09375 233.714844 L 110.09375 311.976562 L 93.429688 311.976562 Z M 66.402344 284.949219 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <path
            fill={theme == "light" ? "black" : "white"}
            d="M 207.832031 82.898438 L 210.234375 82.898438 L 210.234375 111.300781 L 207.832031 111.300781 Z M 207.832031 82.898438 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <path
            fill={theme == "light" ? "black" : "white"}
            d="M 27.097656 98.792969 L 27.902344 98.792969 L 27.910156 94.472656 L 32.230469 94.480469 L 32.230469 93.679688 L 27.910156 93.671875 L 27.910156 89.363281 L 27.105469 89.363281 L 27.105469 93.671875 L 22.785156 93.671875 L 22.785156 94.472656 L 27.105469 94.472656 Z M 27.097656 98.792969 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <path
            fill={theme == "light" ? "black" : "white"}
            d="M 208.632812 297.722656 L 209.433594 297.722656 L 209.433594 302.472656 L 208.632812 302.472656 Z M 208.632812 297.722656 "
            fillOpacity="1"
            fillRule="nonzero"
          />
          <g clipPath="url(#c22afcfff3)">
            <path
              fill={theme == "light" ? "black" : "white"}
              d="M 271.167969 291.179688 L 271.167969 51.804688 L 271.703125 51.804688 L 271.703125 291.179688 Z M 271.167969 291.179688 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
          <g clipPath="url(#71ce9e5506)">
            <path
              fill={theme == "light" ? "black" : "white"}
              d="M 258.4375 123.78125 L 258.4375 51.804688 L 260.050781 51.804688 L 260.050781 123.78125 Z M 258.4375 123.78125 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
          <g clipPath="url(#6999601106)">
            <path
              fill={theme == "light" ? "black" : "white"}
              d="M 258.4375 291.179688 L 258.4375 219.203125 L 260.050781 219.203125 L 260.050781 291.179688 Z M 258.4375 291.179688 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
          <g clipPath="url(#e9ca41ed0f)">
            <path
              fill={theme == "light" ? "black" : "white"}
              d="M 344.289062 318.988281 L 344.289062 340.824219 L 327.785156 340.824219 L 327.785156 277.734375 L 264.449219 340.824219 L 25.976562 340.824219 L 25.976562 318.988281 L 23.855469 318.988281 L 23.855469 363.367188 L 25.976562 363.367188 L 25.976562 341.527344 L 263.75 341.527344 L 227.855469 377.285156 L 327.792969 377.285156 L 327.792969 341.527344 L 344.296875 341.527344 L 344.296875 363.367188 L 346.417969 363.367188 L 346.417969 318.988281 Z M 327.085938 279.433594 L 327.085938 340.816406 L 265.460938 340.816406 Z M 327.085938 376.582031 L 229.566406 376.582031 L 264.753906 341.527344 L 327.085938 341.527344 Z M 327.085938 376.582031 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
        </svg>
      </section>
    </form>
  );
};

export default SignIn;
