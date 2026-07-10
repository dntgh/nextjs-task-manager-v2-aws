/**
 * Task Service — abstracts all CRUD operations for tasks.
 *
 * All functions make authenticated HTTP requests to the AWS API Gateway,
 * forwarding the Cognito `idToken` in the `Authorization: Bearer` header.
 *
 * Required environment variable:
 *   NEXT_PUBLIC_API_URL=https://<api-id>.execute-api.<region>.amazonaws.com/<stage>
 */

import { Task } from '@/types/task';

// ─── Configuration ────────────────────────────────────────────────────────────

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is required');
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

/** Builds the standard authenticated request headers. */
const authHeaders = (token: string): HeadersInit => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

// ─── CRUD Operations ──────────────────────────────────────────────────────────

/**
 * Fetches all tasks belonging to the authenticated user.
 * API: GET /tasks  (Cognito sub extracted server-side from the JWT)
 */
export const fetchTasks = async (token: string): Promise<Task[]> => {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`fetchTasks failed: ${res.status}`);
  return res.json() as Promise<Task[]>;
};

/**
 * Creates a new task for the authenticated user.
 * API: POST /tasks  — returns the created task with a server-assigned ID.
 */
export const createTask = async (
  token: string,
  task: Omit<Task, 'id'>
): Promise<Task> => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error(`createTask failed: ${res.status}`);
  return res.json() as Promise<Task>;
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
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error(`updateTask failed: ${res.status}`);
  return res.json() as Promise<Task>;
};

/**
 * Deletes a task by ID.
 * API: DELETE /tasks/:taskId
 */
export const deleteTask = async (token: string, id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`deleteTask failed: ${res.status}`);
};
