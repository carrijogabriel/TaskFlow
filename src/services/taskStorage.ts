import type { Task } from "../types/task";

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

const isTask = (value: unknown): value is Task => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const task = value as Partial<Record<keyof Task, unknown>>;

  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    (task.description === undefined || typeof task.description === "string") &&
    typeof task.isCompleted === "boolean" &&
    typeof task.createdAt === "string" &&
    typeof task.updatedAt === "string" &&
    (task.completedAt === null || typeof task.completedAt === "string")
  );
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

    if (!Array.isArray(parsedValue) || !parsedValue.every(isTask)) {
      return [];
    }

    return parsedValue;
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
