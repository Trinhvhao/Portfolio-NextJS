"use client";

import { useMemo, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const CHARACTER_LIMIT = 100;
const graphemeSegmenter =
  typeof Intl !== "undefined" && typeof Intl.Segmenter !== "undefined"
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

function splitGraphemes(text: string) {
  if (graphemeSegmenter) {
    return Array.from(graphemeSegmenter.segment(text), (part) => part.segment);
  }

  return Array.from(text);
}

function countCharacters(text: string) {
  return splitGraphemes(text).length;
}

function clampCharacters(text: string, max: number) {
  const characters = splitGraphemes(text);
  if (characters.length <= max) {
    return text;
  }

  return characters.slice(0, max).join("");
}

export function GuestbookAuthCta() {
  const { data: session, status } = useSession();
  const [draftMessage, setDraftMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const characterCount = useMemo(() => countCharacters(draftMessage), [draftMessage]);
  const isOverLimit = characterCount > CHARACTER_LIMIT;

  if (status === "loading") {
    return (
      <button
        type="button"
        disabled
        className="relative z-10 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-2 font-medium text-white/80 shadow-lg backdrop-blur-sm"
      >
        Checking account...
      </button>
    );
  }

  if (!session?.user) {
    return (
      <div className="relative z-10 flex w-full max-w-56 flex-col gap-2">
        <button
          type="button"
          onClick={() => signIn("github")}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/20"
        >
          Continue with GitHub
        </button>
        <button
          type="button"
          onClick={() => signIn("google")}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/20"
        >
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-[300px] rounded-xl border border-white/15 bg-white/8 p-2.5 text-white shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name ?? "Profile"}
              className="size-8 rounded-full border border-white/30 object-cover"
            />
          ) : (
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xs">
              {(session.user.name?.[0] ?? "U").toUpperCase()}
            </span>
          )}
          <div className="text-left">
            <p className="text-sm font-semibold leading-tight text-white">{session.user.name ?? "Guest"}</p>
            <p className="text-xs text-cyan-300">Composing...</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signOut()}
          className="inline-flex size-7 items-center justify-center rounded-md text-white/40 transition hover:bg-white/10 hover:text-white"
          aria-label="Sign out"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <path d="M10 17l5-5-5-5" />
            <path d="M15 12H3" />
          </svg>
        </button>
      </div>

      <div className="mt-2.5 space-y-2">
        <textarea
          value={draftMessage}
          onChange={(event) => {
            setIsSubmitted(false);
            setDraftMessage(clampCharacters(event.target.value, CHARACTER_LIMIT));
          }}
          className="min-h-18 w-full resize-none rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/35"
          placeholder="Type something nice..."
        />

        <div className="flex items-center justify-between">
          <span className={isOverLimit ? "text-xs text-rose-300" : "text-xs text-white/55"}>
            {characterCount} / {CHARACTER_LIMIT}
          </span>

          <button
            type="button"
            disabled={!draftMessage.trim() || isOverLimit}
            onClick={() => setIsSubmitted(true)}
            className="inline-flex h-9 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/6 text-white/45 transition enabled:border-white/20 enabled:bg-white/12 enabled:text-white enabled:hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Submit message"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </button>
        </div>

        {isOverLimit && <p className="text-xs text-rose-300">Please keep it within 100 characters.</p>}

        {isSubmitted && (
          <p className="rounded-lg border border-emerald-300/30 bg-emerald-300/10 px-3 py-2 text-xs text-emerald-200">
            Message captured. Next step is wiring persistence to backend/database.
          </p>
        )}
      </div>
    </div>
  );
}