import React from "react";

export default function CurrentArchitecture() {
  return (
    <section className="rounded-3xl border border-white/80 bg-white p-6 shadow-xl shadow-zinc-200/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/40 sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Architecture Flow
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              System Architecture
            </h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          The application follows a cloud-native serverless architecture. User requests are processed via secure API endpoints, authenticated through Amazon Cognito, and persisted within a distributed NoSQL database, ensuring high availability, scalability, and seamless data synchronization across all user devices.
        </p>

        {/* Visual Flowchart Diagram */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 dark:border-zinc-850 dark:bg-zinc-950/40">
          <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:gap-4">

            {/* Step 1: User Interface */}
            <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-850 dark:bg-zinc-900 md:w-1/4">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Step 1</span>
              <h4 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100 text-sm">User Request</h4>
              <p className="mt-1 text-2xs text-zinc-500 dark:text-zinc-400">Next.js Client triggers authenticated API calls</p>
            </div>

            {/* Connecting Arrow */}
            <div className="flex h-8 w-8 items-center justify-center md:h-12 md:w-12">
               <svg className="h-full w-full stroke-zinc-400 dark:stroke-zinc-600 fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" className="hidden md:block" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                <path strokeLinecap="round" strokeLinejoin="round" className="block md:hidden" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
              </svg>
            </div>

            {/* Step 2: AWS Lambda/Cognito */}
            <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-850 dark:bg-zinc-900 md:w-1/4">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Step 2</span>
              <h4 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Auth & Compute</h4>
              <p className="mt-1 text-2xs text-zinc-500 dark:text-zinc-400">Cognito Auth verified via AWS Lambda functions</p>
            </div>

            {/* Connecting Arrow */}
            <div className="flex h-8 w-8 items-center justify-center md:h-12 md:w-12">
               <svg className="h-full w-full stroke-zinc-400 dark:stroke-zinc-600 fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" className="hidden md:block" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                <path strokeLinecap="round" strokeLinejoin="round" className="block md:hidden" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
              </svg>
            </div>

            {/* Step 3: DynamoDB */}
            <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm dark:border-zinc-850 dark:bg-zinc-900 md:w-1/4">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Step 3</span>
              <h4 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Persistence</h4>
              <p className="mt-1 text-2xs text-zinc-500 dark:text-zinc-400">Secure data storage using Amazon DynamoDB</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}