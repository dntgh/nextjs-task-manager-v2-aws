import React from "react";

export default function TechStackCost() {
  return (
    <section className="rounded-3xl border border-white/80 bg-white p-8 shadow-xl shadow-zinc-200/50 ring-1 ring-zinc-200/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/40 dark:ring-zinc-800/50 sm:p-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 shadow-sm ring-1 ring-blue-200/50 dark:from-blue-500/10 dark:to-blue-500/20 dark:text-blue-400 dark:ring-blue-500/20">
            {/* Đổi icon thành cloud cho hợp AWS */}
            <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.998 5 5 0 00-9.78 2.996A4 4 0 003 15z" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Cloud-Native Architecture
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Tech Stack & Infrastructure
            </h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          A robust serverless architecture designed for production-grade reliability. By leveraging managed AWS services, the application provides secure multi-device data synchronization, identity management, and automatic scalability without the operational overhead of managing servers.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Tech Stack Details */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
              Core Technologies
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Next.js", tag: "Frontend / SSR" },
                { name: "Amazon DynamoDB", tag: "NoSQL Database" },
                { name: "AWS Lambda", tag: "Serverless Compute" },
                { name: "Amazon Cognito", tag: "Identity & Auth" }
              ].map((tech, i) => (
                <li key={i} className="group flex items-center gap-3 rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-3 transition-all hover:border-zinc-300 hover:bg-zinc-100/50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 text-xs font-bold text-zinc-700 ring-1 ring-zinc-300/50 dark:from-zinc-700 dark:to-zinc-800 dark:text-zinc-300 dark:ring-zinc-600/50">
                    {i + 1}
                  </span>
                  <div className="flex flex-1 items-center justify-between">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{tech.name}</span>
                    <span className="rounded-md bg-zinc-200/80 px-2 py-0.5 text-xs font-medium text-zinc-700 ring-1 ring-zinc-300/50 dark:bg-zinc-700/50 dark:text-zinc-300 dark:ring-zinc-600/50">{tech.tag}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Cost Optimization Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50/80 via-blue-50/40 to-white p-6 shadow-sm ring-1 ring-blue-200/50 dark:border-blue-900/40 dark:from-blue-950/40 dark:via-blue-950/20 dark:to-zinc-900 dark:ring-blue-800/30">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-wider text-blue-800 dark:text-blue-300 uppercase">
                  Cost Model
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-100/80 px-3 py-1 text-xs font-semibold text-blue-800 ring-1 ring-blue-200/50 dark:bg-blue-900/50 dark:text-blue-300 dark:ring-blue-700/50">
                  Pay-As-You-Go
                </span>
              </div>
              <div className="mt-5 flex items-baseline">
                <span className="text-4xl font-extrabold tracking-tight text-blue-700 dark:text-blue-400">
                  ~$0.00
                </span>
                <span className="ml-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">/ month*</span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Utilizing AWS Free Tier and serverless compute, the infrastructure scales to zero when idle, minimizing costs while ensuring the system is ready to handle traffic spikes at any time.
              </p>
            </div>
            <div className="mt-6 border-t border-blue-200/50 pt-4 dark:border-blue-900/30">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800/90 dark:text-blue-400/90">
                Database Managed: DynamoDB
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}