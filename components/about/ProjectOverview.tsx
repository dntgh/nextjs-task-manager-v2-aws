import React from "react";

export default function ProjectOverview() {
  return (
    <section className="rounded-3xl border border-white/80 bg-white p-6 shadow-xl shadow-zinc-200/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/40 sm:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
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
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801-1.206a2.25 2.25 0 0 0-3.324 0M12 3c.132 0 .263.008.393.024c.25.032.484.144.662.316a.755.755 0 0 1 .154.218l.2.4a2.25 2.25 0 0 0 2.2 1.2h.001c.243 0 .484-.04.71-.118a1.5 1.5 0 0 1 .59-.059c.28.02.54.128.746.307c.218.19.347.458.363.743c.01.173.018.347.022.521m-10.511-2.18A2.25 2.25 0 0 0 3 6.108v10.642a2.25 2.25 0 0 0 2.25 2.25h1.5"
              />
            </svg>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Application Core
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Project Overview
            </h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          The <strong>Task Manager</strong> is a cloud-native productivity application engineered for scalability and reliability using AWS Serverless architecture. It offers a secure, high-performance interface for managing daily priorities, fully integrated with cloud services to ensure persistent, multi-device data access and consistent synchronization.
        </p>

        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800/50 dark:bg-zinc-950/40">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Focus-Driven UX</h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Clean layout, intuitive priority badges, and an integrated search bar ensure critical tasks are never missed.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800/50 dark:bg-zinc-950/40">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Optimized Performance</h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Optimized for speed, leveraging modern React patterns and efficient API communication to provide a seamless, high-performance interface.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800/50 dark:bg-zinc-950/40">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Secure Cloud Persistence</h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Your data is safely stored and synchronized in the cloud, accessible from any device through secure, authenticated AWS infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
