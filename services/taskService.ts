/**
 * Task Service — abstracts all CRUD operations for tasks.
 *
 * Routing logic:
 *   - If `NEXT_PUBLIC_API_URL` is set to a real endpoint, every function makes
 *     an authenticated HTTP request to the AWS API Gateway, forwarding the
 *     Cognito `idToken` in the `Authorization: Bearer` header.
 *   - If the env var is absent or still points to the temporary placeholder,
 *     every function silently falls back to localStorage so the app continues
 *     to work while the real AWS backend is being provisioned.
 *
 * Swapping to live API:
 *   Set NEXT_PUBLIC_API_URL=https://<real-api-id>.execute-api.<region>.amazonaws.com/<stage>
 *   in .env.local (or Vercel / Amplify hosting env vars) and restart the dev server.
 *   No other code changes are required.
 */

import { Task } from '@/types/task';

// ─── Configuration ────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Returns true only when NEXT_PUBLIC_API_URL is set to a real (non-placeholder)
 * endpoint. This is the single switch that controls live vs. fallback mode.
 */
const isApiReady = (): boolean =>
  !!API_URL &&
  !API_URL.includes('placeholder') &&
  !API_URL.includes('localhost');

// ─── Shared helpers ───────────────────────────────────────────────────────────

/** Builds the standard authenticated request headers. */
const authHeaders = (token: string): HeadersInit => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

// ─── localStorage fallback helpers (internal only) ───────────────────────────

const LS_KEY = 'tasks';

const lsRead = (): Task[] => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]') as Task[];
  } catch {
    return [];
  }
};

const lsWrite = (tasks: Task[]): void => {
  localStorage.setItem(LS_KEY, JSON.stringify(tasks));
};

// ─── CRUD Operations ──────────────────────────────────────────────────────────

/**
 * Fetches all tasks belonging to the authenticated user.
 * API: GET /tasks  (Cognito sub extracted server-side from the JWT)
 */
export const fetchTasks = async (token: string): Promise<Task[]> => {
  if (isApiReady()) {
    const res = await fetch(`${API_URL}/tasks`, {
      headers: authHeaders(token),
    });
    if (!res.ok) throw new Error(`fetchTasks failed: ${res.status}`);
    return res.json() as Promise<Task[]>;
  }

  // ── Fallback: read from localStorage ──────────────────────────────────────
  return lsRead();
};

/**
 * Creates a new task for the authenticated user.
 * API: POST /tasks  — returns the created task with a server-assigned ID.
 */
export const createTask = async (
  token: string,
  task: Omit<Task, 'id'>
): Promise<Task> => {
  if (isApiReady()) {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error(`createTask failed: ${res.status}`);
    return res.json() as Promise<Task>;
  }

  // ── Fallback: assign a client-side UUID and persist to localStorage ────────
  const newTask: Task = { id: crypto.randomUUID(), ...task };
  lsWrite([...lsRead(), newTask]);
  return newTask;
};

/**
 * Partially updates an existing task.
 * API: PUT /tasks/:taskId  — returns the full updated task.
 */
export const updateTask = async (
  token: string,
  id: string,
  updates: Partial<Omit<Task, 'id'>>
): Promise<Task> => {
  if (isApiReady()) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`updateTask failed: ${res.status}`);
    return res.json() as Promise<Task>;
  }

  // ── Fallback: merge updates into localStorage ──────────────────────────────
  const current = lsRead();
  const updated = current.map((t) => (t.id === id ? { ...t, ...updates } : t));
  lsWrite(updated);
  const result = updated.find((t) => t.id === id);
  if (!result) throw new Error(`updateTask: task ${id} not found in fallback`);
  return result;
};

/**
 * Deletes a task by ID.
 * API: DELETE /tasks/:taskId
 */
export const deleteTask = async (token: string, id: string): Promise<void> => {
  if (isApiReady()) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    });
    if (!res.ok) throw new Error(`deleteTask failed: ${res.status}`);
    return;
  }

  // ── Fallback: remove from localStorage ────────────────────────────────────
  lsWrite(lsRead().filter((t) => t.id !== id));
};
