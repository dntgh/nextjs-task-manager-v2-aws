import React from "react";

export default function CurrentArchitecture() {
  return (
    <section className="rounded-3xl border border-white/80 bg-white p-6 shadow-xl shadow-zinc-200/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/40 sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
              />
            </svg>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Data Flow
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Current Architecture
            </h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          The task tracking architecture operates directly inside the browser. High-frequency inputs (such as typing into search or creating items) run through debouncing layers before updating local state, which is automatically synchronized to persistent browser storage.
        </p>

        {/* Visual Flowchart Diagram */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 dark:border-zinc-850 dark:bg-zinc-950/40">
          {/* Responsive flowchart using Tailwind grids + custom SVG arrows */}
          <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:gap-4">

            {/* UI Node */}
            <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-850 dark:bg-zinc-900 md:w-1/4">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Step 1
              </span>
              <h4 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                User Interface
              </h4>
              <p className="mt-1 text-2xs text-zinc-500 dark:text-zinc-400">
                React Client view capturing add, toggle, and search query inputs
              </p>
            </div>

            {/* Connecting Arrow (Mobile: Vertical, MD: Horizontal) */}
            <div className="flex h-8 w-8 items-center justify-center md:h-12 md:w-12">
              <svg
                aria-hidden="true"
                className="h-full w-full stroke-zinc-400 dark:stroke-zinc-600 fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                {/* Horizontal Arrow for large screens, Vertical Arrow for small screens */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hidden md:block"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="block md:hidden"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                />
              </svg>
            </div>

            {/* Debounce / State Node */}
            <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-850 dark:bg-zinc-900 md:w-1/4">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Step 2
              </span>
              <h4 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                State & Debouncing
              </h4>
              <p className="mt-1 text-2xs text-zinc-500 dark:text-zinc-400">
                useDebounce hook limits high-frequency search updates
              </p>
            </div>

            {/* Connecting Arrow */}
            <div className="flex h-8 w-8 items-center justify-center md:h-12 md:w-12">
              <svg
                aria-hidden="true"
                className="h-full w-full stroke-zinc-400 dark:stroke-zinc-600 fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hidden md:block"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="block md:hidden"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                />
              </svg>
            </div>

            {/* LocalStorage Node */}
            <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-850 dark:bg-zinc-900 md:w-1/4">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Step 3
              </span>
              <h4 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                LocalStorage Sync
              </h4>
              <p className="mt-1 text-2xs text-zinc-500 dark:text-zinc-400">
                useLocalStorage automatically persists items client-side
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
