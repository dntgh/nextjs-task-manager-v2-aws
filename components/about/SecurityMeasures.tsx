import React from "react";

export default function SecurityMeasures() {
  const measures = [
    {
      title: "Input Sanitization",
      description: "Any user input for task titles is aggressively stripped of HTML tags, scripts, and executable tokens. This ensures that even if malicious code is submitted via copy-paste or specialized input devices, it is treated as raw text.",
    },
    {
      title: "LocalStorage Isolation",
      description: "Task data is completely sandboxed within the host origin's local storage container. This isolation prevents other domains from accessing task logs, ensuring absolute privacy from cross-origin requests.",
    },
    {
      title: "XSS Mitigation",
      description: "By leveraging React's built-in automatic escaping for string children and standard safe DOM binding, we prevent Cross-Site Scripting (XSS) vulnerabilities and script injection vectors.",
    },
    {
      title: "Secure Route Handling",
      description: "State routing and active filters are managed safely on the client container using highly deterministic local React transitions, shielding our UI from insecure external redirection attacks.",
    },
  ];

  return (
    <section className="rounded-3xl border border-white/80 bg-white p-6 shadow-xl shadow-zinc-200/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/40 sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
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
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Data protection
            </span>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Security Measures
            </h2>
          </div>
        </div>

        <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Even in a local-first application, maintaining data integrity and ensuring a secure user session are top priorities. Our client-side implementation enforces multiple protection layers to secure user storage.
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
