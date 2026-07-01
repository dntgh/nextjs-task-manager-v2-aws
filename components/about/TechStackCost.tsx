import React from "react";

export default function TechStackCost() {
  return (
    <section className="rounded-3xl border border-white/80 bg-white p-6 shadow-xl shadow-zinc-200/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/40 sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
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
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Efficiency first
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Tech Stack & Cost Optimization
            </h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          We leverage cutting-edge frontend technologies combined with a local-first data architecture. By running computation and storing data entirely within the client container, the hosting cost of this application is minimized.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Tech Stack Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
              Core Technologies
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  1
                </span>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Next.js 16.2.9</span>
                  <span className="ml-2 rounded-md bg-zinc-100 px-1.5 py-0.5 text-2xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">RSC / App Router</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  2
                </span>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">React 19.2.4</span>
                  <span className="ml-2 rounded-md bg-zinc-100 px-1.5 py-0.5 text-2xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">Concurrent Rendering</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  3
                </span>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Tailwind CSS v4</span>
                  <span className="ml-2 rounded-md bg-zinc-100 px-1.5 py-0.5 text-2xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">Utility-First Styles</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  4
                </span>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Web LocalStorage API</span>
                  <span className="ml-2 rounded-md bg-zinc-100 px-1.5 py-0.5 text-2xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">Zero Latency Sync</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Cost Optimization Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-emerald-100 bg-emerald-50/20 p-5 dark:border-emerald-900/30 dark:bg-emerald-950/10">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-wider text-emerald-800 dark:text-emerald-300 uppercase">
                  Hosting Cost Metric
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  Optimized
                </span>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight text-emerald-700 dark:text-emerald-400">
                  $0.00
                </span>
                <span className="ml-1 text-sm text-zinc-500 dark:text-zinc-400">/ month</span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                By storing task state in the local sandbox storage of your browser (LocalStorage) and statically generating routes with Next.js, we eliminate the need for server-side databases (like RDS, PostgreSQL, or DynamoDB) and active compute containers during this initial version.
              </p>
            </div>
            <div className="mt-4 border-t border-emerald-100/50 pt-3 dark:border-emerald-900/20">
              <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800/80 dark:text-emerald-400/80">
                Database Hosting Overhead: Zero
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
