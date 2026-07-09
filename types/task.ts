/**
 * Shared Task type used across the entire application.
 * This is the canonical definition — do not redefine locally in components.
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}
