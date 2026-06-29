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
}

export default function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/70 px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-950/50">
        <p className="text-lg font-semibold text-zinc-600 dark:text-zinc-300">
          Nothing to show
        </p>
        <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-500">
          Add a task above to get started!
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
