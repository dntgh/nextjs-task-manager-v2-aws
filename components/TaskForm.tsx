"use client";

import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string, priority: 'high' | 'medium' | 'low', dueDate?: string) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") {
      return;
    }

    onAddTask(title.trim(), priority, dueDate || undefined);
    setTitle("");
    setPriority('medium');
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a focused task..."
        className="min-h-12 rounded-xl border border-zinc-200 bg-white px-4 text-base text-zinc-950 shadow-sm shadow-zinc-100 outline-none transition placeholder:text-zinc-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:shadow-zinc-950/40 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
      />
      <div className="flex gap-3">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
          className="min-h-12 flex-1 rounded-xl border border-zinc-200 bg-white px-4 text-base text-zinc-950 shadow-sm shadow-zinc-100 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:shadow-zinc-950/40 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="min-h-12 flex-1 rounded-xl border border-zinc-200 bg-white px-4 text-base text-zinc-950 shadow-sm shadow-zinc-100 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:shadow-zinc-950/40 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
        />
      </div>
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:bg-blue-500 dark:shadow-blue-950/40 dark:hover:bg-blue-400 dark:focus:ring-blue-500/25"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
        </svg>
        Add Task
      </button>
    </form>
  );
}
