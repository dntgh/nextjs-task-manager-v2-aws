import React from "react";

export default function AwsRoadmap() {
  const phases = [
    {
      num: 1,
      title: "Phase 1: REST API Layer",
      subtitle: "AWS API Gateway + Lambda Functions",
      description: "Introduce a highly scalable, serverless microservice layer to decouple client applications from persistent storage. API Gateway will handle route routing, rate limiting, and CORS, while Node.js-based AWS Lambda functions execute on-demand API endpoints to manage tasks.",
      status: "Upcoming",
    },
    {
      num: 2,
      title: "Phase 2: Database Layer",
      subtitle: "Amazon DynamoDB (Single-Table Design)",
      description: "Transition from LocalStorage to Amazon DynamoDB, a fully managed NoSQL database. Utilizing Single-Table Design patterns, all queries (get tasks by user, filter by completed, fetch sorted logs) will execute with single-digit millisecond latency at ultra-low costs.",
      status: "Planning",
    },
    {
      num: 3,
      title: "Phase 3: Identity & Access Management",
      subtitle: "Amazon Cognito for JWT Auth",
      description: "Secure the API Gateway endpoints using Amazon Cognito User Pools. Users can register and sign in securely with built-in support for JWT token-based authorization headers, multi-factor authentication (MFA), and safe multi-tenant isolation.",
      status: "Architected",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/80 bg-white p-6 shadow-xl shadow-zinc-200/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/40 sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
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
                d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
              />
            </svg>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Future Roadmap
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              AWS Cloud Migration Roadmap
            </h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          To enable multi-device synchronization and robust data durability, the application is ready for migration to a secure, enterprise-grade cloud ecosystem. Below is our phased roadmap to serverless AWS architecture.
        </p>

        {/* Timeline Container */}
        <div className="relative border-l border-zinc-200 pl-6 dark:border-zinc-800 md:ml-4">
          <div className="space-y-8">
            {phases.map((phase) => (
              <div key={phase.num} className="relative">
                {/* SVG Accent Dot */}
                <span className="absolute -left-[35px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-zinc-50 dark:bg-zinc-900 dark:ring-zinc-950">
                  <svg
                    aria-hidden="true"
                    className="h-3 w-3 text-orange-500 dark:text-orange-400 fill-current"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="40" />
                  </svg>
                </span>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {phase.title}
                    </h3>
                    <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                      {phase.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {phase.subtitle}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {phase.description}
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
