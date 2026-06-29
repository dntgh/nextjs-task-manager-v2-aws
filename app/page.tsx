"use client";

import { useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

type FilterType = 'all' | 'active' | 'completed';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progressValue =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
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
