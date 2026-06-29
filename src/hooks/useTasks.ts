import { useMemo, useState } from "react";
import type { Task } from "../types/task";

export type TaskInput = {
  title: string;
  description?: string;
};

const normalizeTaskInput = ({ title, description }: TaskInput): TaskInput | null => {
  const normalizedTitle = title.trim();
  const normalizedDescription = description?.trim();

  if (!normalizedTitle) {
    return null;
  }

  return {
    title: normalizedTitle,
    description: normalizedDescription || undefined,
  };
};

const createTaskId = (): string => {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const pendingTasks = useMemo(
    () => tasks.filter((task) => !task.isCompleted),
    [tasks],
  );

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.isCompleted),
    [tasks],
  );

  const createTask = (input: TaskInput): boolean => {
    const normalizedInput = normalizeTaskInput(input);

    if (!normalizedInput) {
      return false;
    }

    const now = new Date().toISOString();
    const task: Task = {
      id: createTaskId(),
      title: normalizedInput.title,
      description: normalizedInput.description,
      isCompleted: false,
      createdAt: now,
      updatedAt: now,
      completedAt: null,
    };

    setTasks((currentTasks) => [task, ...currentTasks]);
    return true;
  };

  const updateTask = (taskId: string, input: TaskInput): boolean => {
    const normalizedInput = normalizeTaskInput(input);

    if (!normalizedInput) {
      return false;
    }

    const now = new Date().toISOString();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: normalizedInput.title,
              description: normalizedInput.description,
              updatedAt: now,
            }
          : task,
      ),
    );

    return true;
  };

  const completeTask = (taskId: string): void => {
    const now = new Date().toISOString();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId && !task.isCompleted
          ? {
              ...task,
              isCompleted: true,
              completedAt: now,
              updatedAt: now,
            }
          : task,
      ),
    );
  };

  const reopenTask = (taskId: string): void => {
    const now = new Date().toISOString();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId && task.isCompleted
          ? {
              ...task,
              isCompleted: false,
              completedAt: null,
              updatedAt: now,
            }
          : task,
      ),
    );
  };

  const deleteTask = (taskId: string): void => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  return {
    tasks,
    pendingTasks,
    completedTasks,
    createTask,
    updateTask,
    completeTask,
    reopenTask,
    deleteTask,
  };
};
