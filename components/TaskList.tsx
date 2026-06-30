"use client";

import TaskItem from "./TaskItem";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, priority?: 'high' | 'medium' | 'low', dueDate?: string) => void;
  isLoaded?: boolean;
}

export default function TaskList({ tasks, onToggle, onDelete, onUpdate, isLoaded = false }: TaskListProps) {
  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[72px] w-full rounded-xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800"
          />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="animate-fade-up flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/70 px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-950/50">
        {/* Clipboard-check illustration */}
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
          <svg
            aria-hidden="true"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <p className="text-base font-semibold text-zinc-700 dark:text-zinc-200">
          All caught up!
        </p>
        <p className="mt-1.5 max-w-xs text-sm leading-6 text-zinc-400 dark:text-zinc-500">
          Add a new task above to get started and stay on top of your priorities.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <li key={task.id} className="animate-task-enter">
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </li>
      ))}
    </ul>
  );
}
