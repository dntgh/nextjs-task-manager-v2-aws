"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import ThemeToggle from "@/components/ThemeToggle";
import useLocalStorage from "@/hooks/useLocalStorage";
import useDebounce from "@/hooks/useDebounce";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

type FilterType = 'all' | 'active' | 'completed';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks, isLoaded] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progressValue =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter = () => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
      };

      const matchesSearch = () => {
        if (!debouncedSearchQuery.trim()) return true;
        return task.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      };

      return matchesFilter() && matchesSearch();
    });
  }, [tasks, filter, debouncedSearchQuery]);

  const addTask = (title: string, priority: 'high' | 'medium' | 'low' = 'medium', dueDate?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      dueDate,
    };
    setTasks([...tasks, newTask]);
    toast.success(`Task "${title}" added successfully!`);
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    const index = tasks.findIndex((t) => t.id === id);
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
    toast.success('Task deleted successfully!', {
      action: {
        label: 'Undo',
        onClick: () => {
          if (taskToDelete) {
            setTasks((currentTasks) => {
              if (currentTasks.some((t) => t.id === id)) {
                return currentTasks;
              }
              const restored = [...currentTasks];
              restored.splice(index, 0, taskToDelete);
              return restored;
            });
          }
        },
      },
    });
  };

  const handleToggle = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      const willBeCompleted = !task.completed;
      updateTask(id, { completed: willBeCompleted });
      toast.info(`Task marked as ${willBeCompleted ? 'completed' : 'active'}.`);
    }
  };

  const handleUpdate = (id: string, title: string, priority?: 'high' | 'medium' | 'low', dueDate?: string) => {
    updateTask(id, { title, ...(priority && { priority }), ...(dueDate !== undefined && { dueDate }) });
    toast.success('Task updated successfully!');
  };

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/50 to-zinc-100 px-4 py-10 font-sans text-zinc-950 transition-colors dark:from-zinc-950 dark:via-slate-950 dark:to-blue-950 dark:text-zinc-50">
      <main className="w-full max-w-3xl rounded-3xl border border-white/80 bg-white px-5 py-8 shadow-xl shadow-zinc-200/70 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/60 sm:px-8 md:px-12">
        <div className="flex w-full flex-col gap-8">
          <div className="relative space-y-3 text-center">
            <div className="absolute right-0 top-0 flex items-center gap-2">
              <Link
                href="/about"
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-600 shadow-sm shadow-zinc-200/70 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:shadow-zinc-950/30 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-300 dark:focus:ring-blue-500/20 sm:px-4"
                title="About Project Specifications"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-zinc-500 dark:text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 1 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.852l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
                <span className="hidden sm:inline">About</span>
              </Link>
              <ThemeToggle isMounted={isMounted} />
            </div>
            <div className="px-14">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">
                Productivity dashboard
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-white">
                Task Manager
              </h1>
              <p className="mx-auto mt-3 max-w-md text-base leading-7 text-zinc-500 dark:text-zinc-400">
                Organize, refine, and complete your priorities with a focused task list.
              </p>
            </div>
          </div>

          <div className="w-full">
            <TaskForm onAddTask={addTask} />
          </div>

          <div className="w-full">
            <div className="relative">
              <svg
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-12 pr-12 text-base text-zinc-950 shadow-sm shadow-zinc-100 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:shadow-zinc-950/40 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-600 focus:outline-none dark:text-zinc-500 dark:hover:text-zinc-300"
                  aria-label="Clear search"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 18 12-12M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-2 rounded-xl border border-zinc-200 bg-zinc-50/50 p-1 dark:border-zinc-700 dark:bg-zinc-950/70">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-white text-blue-600 shadow-sm dark:bg-zinc-800 dark:text-blue-300'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === 'active'
                    ? 'bg-white text-blue-600 shadow-sm dark:bg-zinc-800 dark:text-blue-300'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === 'completed'
                    ? 'bg-white text-blue-600 shadow-sm dark:bg-zinc-800 dark:text-blue-300'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <section className="flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-950/70 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Progress</p>
              <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {isMounted ? `${completedTasks} of ${tasks.length} completed` : "Loading..."}
              </p>
            </div>
            <div className="flex w-full items-center gap-3 sm:max-w-xs">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out dark:bg-blue-400"
                  style={{ width: `${progressValue}%` }}
                />
              </div>
              <span className="w-10 text-right text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                {progressValue}%
              </span>
            </div>
          </section>

          <div className="w-full">
            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggle}
              onDelete={deleteTask}
              onUpdate={handleUpdate}
              isLoaded={isLoaded}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
