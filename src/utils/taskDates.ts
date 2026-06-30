import type { Task } from "../types/task";

export const formatDueDate = (value: string): string => {
  const [year, month, day] = value.split("-");

  if (!year || !month || !day) {
    return value;
  }

  return `${day}/${month}/${year}`;
};

export const getTodayDateString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const isTaskOverdue = (
  task: Task,
  todayDate = getTodayDateString(),
): boolean =>
  !task.isCompleted && task.dueDate !== null && task.dueDate < todayDate;
