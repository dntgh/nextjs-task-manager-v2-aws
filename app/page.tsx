"use client";

import { useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import useLocalStorage from "@/hooks/useLocalStorage";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

type FilterType = 'all' | 'active' | 'completed';

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progressValue =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = () => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    };

    const matchesSearch = () => {
      if (!searchQuery.trim()) return true;
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    };

    return matchesFilter() && matchesSearch();
  });

  const addTask = (title: string, priority: 'high' | 'medium' | 'low' = 'medium', dueDate?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      dueDate,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggle = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  const handleUpdate = (id: string, title: string, priority?: 'high' | 'medium' | 'low', dueDate?: string) => {
    updateTask(id, { title, ...(priority && { priority }), ...(dueDate !== undefined && { dueDate }) });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/50 to-zinc-100 px-4 py-10 font-sans text-zinc-950">
      <main className="w-full max-w-3xl rounded-3xl border border-white/80 bg-white px-5 py-8 shadow-xl shadow-zinc-200/70 sm:px-8 md:px-12">
        <div className="flex w-full flex-col gap-8">
          <div className="space-y-3 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600">
              Productivity dashboard
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-950">
            Task Manager
            </h1>
            <p className="mx-auto max-w-md text-base leading-7 text-zinc-500">
              Organize, refine, and complete your priorities with a focused task list.
            </p>
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
                className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-12 pr-12 text-base text-zinc-950 shadow-sm shadow-zinc-100 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-600 focus:outline-none"
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
            <div className="flex gap-2 rounded-xl border border-zinc-200 bg-zinc-50/50 p-1">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === 'active'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === 'completed'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <section className="flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-500">Progress</p>
              <p className="text-lg font-semibold text-zinc-900">
                {completedTasks} of {tasks.length} completed
              </p>
            </div>
            <div className="flex w-full items-center gap-3 sm:max-w-xs">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out"
                  style={{ width: `${progressValue}%` }}
                />
              </div>
              <span className="w-10 text-right text-sm font-semibold text-zinc-500">
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
            />
          </div>
        </div>
      </main>
    </div>
  );
}
