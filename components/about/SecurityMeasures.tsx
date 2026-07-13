import React from "react";

export default function SecurityMeasures() {
  const measures = [
    {
      title: "Identity & Access Management",
      description: "Authentication is strictly handled by Amazon Cognito User Pools, utilizing JWT tokens to enforce secure, role-based access for all API operations.",
    },
    {
      title: "Multi-tenant Isolation",
      description: "Data partitioning in Amazon DynamoDB ensures strict logical isolation, guaranteeing that user data remains siloed and accessible only to the authenticated owner.",
    },
    {
      title: "API Gateway Security",
      description: "All client requests are funneled through AWS API Gateway, which provides built-in rate limiting, request validation, and CORS protection to prevent unauthorized traffic.",
    },
    {
      title: "Encryption & Transit",
      description: "Enterprise-grade security is maintained with TLS/HTTPS for all data in transit, while data at rest is secured using AWS-managed encryption keys.",
    },
  ];

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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Cloud Security
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Security Infrastructure
            </h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Our security model is built on the AWS Shared Responsibility Model, ensuring that your data is protected by industry-leading cloud infrastructure, encryption, and rigorous access controls.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {measures.map((measure, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5 dark:border-zinc-800/50 dark:bg-zinc-950/40"
            >
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {measure.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {measure.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}