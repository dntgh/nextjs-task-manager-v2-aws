import React from "react";

export default function InfrastructureOverview() {
  const modules = [
    {
      num: 1,
      title: "API & Compute Layer",
      subtitle: "AWS API Gateway + Lambda",
      description: "A serverless microservice architecture utilizing AWS API Gateway and Python-based Lambda functions. This decouples the frontend from data storage, ensuring high availability and automatic scaling based on traffic demands.",
      status: "Operational",
    },
    {
      num: 2,
      title: "Data Persistence Layer",
      subtitle: "Amazon DynamoDB (Single-Table Design)",
      description: "Data is persisted using Amazon DynamoDB, a fully managed NoSQL database. With a Single-Table Design pattern, all queries, filtering, and sorting operations achieve single-digit millisecond latency.",
      status: "Active",
    },
    {
      num: 3,
      title: "Identity & Security",
      subtitle: "Amazon Cognito (JWT Auth)",
      description: "User authentication is handled securely via Amazon Cognito User Pools. This provides robust protection with JWT-based authorization, MFA support, and isolated multi-tenant environments.",
      status: "Secured",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/80 bg-white p-6 shadow-xl shadow-zinc-200/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/40 sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
            <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.998 5 5 0 00-9.78 2.996A4 4 0 003 15z" />
            </svg>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              System Design
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Core Infrastructure
            </h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          The application leverages a fully serverless stack, ensuring high performance, global scalability, and enterprise-grade data durability.
        </p>

        {/* Details Container */}
        <div className="relative border-l border-zinc-200 pl-6 dark:border-zinc-800 md:ml-4">
          <div className="space-y-8">
            {modules.map((mod) => (
              <div key={mod.num} className="relative">
                {/* SVG Accent Dot */}
                <span className="absolute -left-[35px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-zinc-50 dark:bg-zinc-900 dark:ring-zinc-950">
                  <svg aria-hidden="true" className="h-3 w-3 text-sky-500 dark:text-sky-400 fill-current" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" />
                  </svg>
                </span>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {mod.title}
                    </h3>
                    <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">
                      {mod.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {mod.subtitle}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {mod.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}