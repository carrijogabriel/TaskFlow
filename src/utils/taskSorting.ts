import type { Task, TaskPriority } from "../types/task";
import { getTodayDateString, isTaskOverdue } from "./taskDates";

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

const compareText = (first: string, second: string): number =>
  first.localeCompare(second, "pt-BR", { sensitivity: "base" });

const compareNullableDateAsc = (
  firstDate: string | null,
  secondDate: string | null,
): number => {
  if (firstDate === secondDate) {
    return 0;
  }

  if (firstDate === null) {
    return 1;
  }

  if (secondDate === null) {
    return -1;
  }

  return firstDate.localeCompare(secondDate);
};

const compareTaskIdentity = (firstTask: Task, secondTask: Task): number =>
  firstTask.createdAt.localeCompare(secondTask.createdAt) ||
  compareText(firstTask.title, secondTask.title) ||
  firstTask.id.localeCompare(secondTask.id);

export const getPriorityWeight = (priority: TaskPriority): number =>
  PRIORITY_ORDER[priority];

export const sortPendingTasks = (tasks: Task[]): Task[] => {
  const todayDate = getTodayDateString();

  return [...tasks].sort((firstTask, secondTask) => {
    const overdueComparison =
      Number(isTaskOverdue(secondTask, todayDate)) -
      Number(isTaskOverdue(firstTask, todayDate));

    if (overdueComparison !== 0) {
      return overdueComparison;
    }

    const priorityComparison =
      getPriorityWeight(firstTask.priority) -
      getPriorityWeight(secondTask.priority);

    if (priorityComparison !== 0) {
      return priorityComparison;
    }

    return (
      compareNullableDateAsc(firstTask.dueDate, secondTask.dueDate) ||
      compareTaskIdentity(firstTask, secondTask)
    );
  });
};

export const sortCompletedTasks = (tasks: Task[]): Task[] =>
  [...tasks].sort((firstTask, secondTask) => {
    const firstCompletedDate = firstTask.completedAt ?? firstTask.updatedAt;
    const secondCompletedDate = secondTask.completedAt ?? secondTask.updatedAt;

    return (
      secondCompletedDate.localeCompare(firstCompletedDate) ||
      compareTaskIdentity(firstTask, secondTask)
    );
  });
