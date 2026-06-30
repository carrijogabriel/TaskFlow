import type { TaskInput } from "../../hooks/useTasks";
import type { Task } from "../../types/task";
import { sortCompletedTasks, sortPendingTasks } from "../../utils/taskSorting";
import { EmptyState } from "../EmptyState/EmptyState";
import { TaskItem } from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";

type TaskListProps = {
  emptyMessage: string;
  emptyTitle: string;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onReopenTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, input: TaskInput) => boolean;
  sectionId: string;
  tasks: Task[];
  title: string;
  variant: "completed" | "pending";
};

export const TaskList = ({
  emptyMessage,
  emptyTitle,
  onCompleteTask,
  onDeleteTask,
  onReopenTask,
  onUpdateTask,
  sectionId,
  tasks,
  title,
  variant,
}: TaskListProps) => {
  const orderedTasks =
    variant === "completed" ? sortCompletedTasks(tasks) : sortPendingTasks(tasks);

  return (
    <section
      aria-labelledby={sectionId}
      className={`${styles.section} ${
        variant === "completed" ? styles.completed : styles.pending
      }`}
    >
      <header className={styles.header}>
        <h2 className={styles.title} id={sectionId}>
          {title}
        </h2>
        <span
          aria-label={`${tasks.length} tarefa${tasks.length === 1 ? "" : "s"} em ${title.toLowerCase()}`}
          className={styles.count}
        >
          {tasks.length}
        </span>
      </header>

      {tasks.length > 0 ? (
        <ul className={styles.list}>
          {orderedTasks.map((task) => (
            <li className={styles.listItem} key={task.id}>
              <TaskItem
                onCompleteTask={onCompleteTask}
                onDeleteTask={onDeleteTask}
                onReopenTask={onReopenTask}
                onUpdateTask={onUpdateTask}
                task={task}
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState message={emptyMessage} title={emptyTitle} />
      )}
    </section>
  );
};
