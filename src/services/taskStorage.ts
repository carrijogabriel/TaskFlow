import type { Task, TaskPriority } from "../types/task";

export const TASKS_STORAGE_KEY = "taskflow.tasks";

const getLocalStorage = (): Storage | null => {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }

    return window.localStorage;
  } catch {
    return null;
  }
};

const isTaskPriority = (value: unknown): value is TaskPriority =>
  value === "low" || value === "medium" || value === "high";

const normalizeStoredTask = (value: unknown): Task | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const task = value as Partial<Record<keyof Task, unknown>>;

  const {
    completedAt,
    createdAt,
    description,
    dueDate,
    id,
    isCompleted,
    priority,
    title,
    updatedAt,
  } = task;

  const hasRequiredBaseFields =
    typeof id === "string" &&
    typeof title === "string" &&
    (description === undefined || typeof description === "string") &&
    typeof isCompleted === "boolean" &&
    typeof createdAt === "string" &&
    typeof updatedAt === "string" &&
    (completedAt === null || typeof completedAt === "string");

  if (!hasRequiredBaseFields) {
    return null;
  }

  return {
    id,
    title,
    description,
    priority: isTaskPriority(priority) ? priority : "medium",
    dueDate: typeof dueDate === "string" ? dueDate : null,
    isCompleted,
    createdAt,
    updatedAt,
    completedAt,
  };
};

export const loadTasks = (): Task[] => {
  try {
    const storage = getLocalStorage();

    if (!storage) {
      return [];
    }

    const storedValue = storage.getItem(TASKS_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    const tasks: Task[] = [];

    for (const value of parsedValue) {
      const task = normalizeStoredTask(value);

      if (!task) {
        return [];
      }

      tasks.push(task);
    }

    return tasks;
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    const storage = getLocalStorage();

    if (!storage) {
      return;
    }

    storage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Persistence is best-effort in this MVP.
  }
};
