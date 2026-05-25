// Shared types for the To-Do app
export type Priority = "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  priority: Priority;
  completed: boolean;
  archived: boolean;
}

export type FilterType = "all" | "completed" | "pending";
export type SortType = "none" | "dueDate" | "priority";
