import React from "react";
import AboutHeader from "@/components/about/AboutHeader";
import ProjectOverview from "@/components/about/ProjectOverview";
import TechStackCost from "@/components/about/TechStackCost";
import CurrentArchitecture from "@/components/about/CurrentArchitecture";
import InfrastructureOverview from "@/components/about/InfrastructureOverview";
import SecurityMeasures from "@/components/about/SecurityMeasures";

export const metadata = {
  title: "About | Task Manager",
  description: "Project Specification and AWS Cloud Migration Roadmap for Task Manager.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-zinc-100 font-sans text-zinc-950 transition-colors dark:from-zinc-950 dark:via-slate-950 dark:to-blue-950 dark:text-zinc-50">
      <AboutHeader />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            Documentation & Strategy
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
            Project Specification
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            In-depth analysis of the Task Manager architecture, cost optimizations, security patterns, and future cloud-scale expansion.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <ProjectOverview />
          <TechStackCost />
          <CurrentArchitecture />
          <InfrastructureOverview />
          <SecurityMeasures />
        </div>
      </main>

      <footer className="border-t border-zinc-200/50 py-8 text-center text-xs text-zinc-400 transition-colors dark:border-zinc-800/40 dark:text-zinc-500">
        <p>© {new Date().getFullYear()} Task Manager App. All rights reserved.</p>
      </footer>
    </div>
  );
}
