"use client";

import { useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, priority?: 'high' | 'medium' | 'low', dueDate?: string) => void;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState<'high' | 'medium' | 'low'>(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSave = () => {
    if (editTitle.trim() !== "") {
      onUpdate(task.id, editTitle.trim(), editPriority, editDueDate || undefined);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
    setIsDeleteModalOpen(false);
  };

  const getPriorityBadge = () => {
    const badges = {
      high: 'bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300',
      medium: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300',
      low: 'bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-300',
    };
    const labels = {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${badges[task.priority]}`}>
        {labels[task.priority]}
      </span>
    );
  };

  const formatDueDate = () => {
    if (!task.dueDate) return '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
    if (diffDays > 1) return `In ${diffDays} days`;

    return task.dueDate;
  };

  const isOverdue = () => {
    if (!task.dueDate || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-zinc-100 bg-white px-4 py-4 shadow-sm shadow-zinc-100 transition hover:border-zinc-200 hover:shadow-md hover:shadow-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-zinc-950/30 dark:hover:border-zinc-700 dark:hover:shadow-zinc-950/40">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-500/20 ${
            task.completed
              ? "border-blue-600 bg-blue-600 text-white dark:border-blue-400 dark:bg-blue-500"
              : "border-zinc-300 bg-white text-transparent hover:border-blue-500 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:border-blue-400"
          }`}
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </button>

        {isEditing ? (
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-10 min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white px-3 text-zinc-950 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
              autoFocus
            />
            <div className="flex gap-2">
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as 'high' | 'medium' | 'low')}
                className="min-h-10 flex-1 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="min-h-10 flex-1 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-500/20"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:focus:ring-zinc-700/40"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`min-w-0 flex-1 truncate text-left text-base font-medium transition ${
                  task.completed
                    ? "text-zinc-400 line-through decoration-zinc-300 dark:text-zinc-500 dark:decoration-zinc-600"
                    : "text-zinc-900 dark:text-zinc-100"
                }`}
              >
                {task.title}
              </span>
              {getPriorityBadge()}
            </div>
            {formatDueDate() && (
              <span className={`text-xs font-medium ${isOverdue() ? 'text-red-600 dark:text-red-300' : 'text-zinc-500 dark:text-zinc-400'}`}>
                {formatDueDate()}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:text-zinc-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-300 dark:focus:ring-blue-500/20"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          aria-label="Delete task"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-100 dark:text-zinc-500 dark:hover:bg-red-500/10 dark:hover:text-red-300 dark:focus:ring-red-500/20"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673A2.25 2.25 0 0 1 15.916 21H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 px-4 backdrop-blur-sm dark:bg-zinc-950/70">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`delete-task-${task.id}`}
            className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl shadow-zinc-950/20 dark:border dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/60"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300">
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
                  d="M12 9v3.75m0 3.75h.008v.008H12v-.008Zm9-4.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h2
              id={`delete-task-${task.id}`}
              className="mt-4 text-xl font-semibold text-zinc-950 dark:text-zinc-50"
            >
              Delete this task?
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              This action cannot be undone. The task will be removed from your list.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-xl bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200 focus:outline-none focus:ring-4 focus:ring-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:focus:ring-zinc-700/40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100 dark:bg-red-500 dark:shadow-red-950/30 dark:hover:bg-red-400 dark:focus:ring-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
