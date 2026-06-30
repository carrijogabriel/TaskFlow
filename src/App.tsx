import { useState } from "react";
import {
  TaskFilters,
  type TaskFilter,
} from "./components/TaskFilters/TaskFilters";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { TaskList } from "./components/TaskList/TaskList";
import { useTasks, type TaskInput } from "./hooks/useTasks";
import type { Task } from "./types/task";
import styles from "./App.module.css";

const DEFAULT_FEEDBACK = "Pronto para organizar as próximas tarefas.";

const filterTasks = (
  tasks: Task[],
  activeFilter: TaskFilter,
  searchQuery: string,
): Task[] => {
  const normalizedSearch = searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "pending" && !task.isCompleted) ||
      (activeFilter === "completed" && task.isCompleted);

    if (!matchesFilter) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    return (
      task.title.toLowerCase().includes(normalizedSearch) ||
      (task.description?.toLowerCase().includes(normalizedSearch) ?? false)
    );
  });
};

export const App = () => {
  const {
    completeTask,
    createTask,
    deleteTask,
    reopenTask,
    tasks,
    updateTask,
  } = useTasks();

  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleTasks = filterTasks(tasks, activeFilter, searchQuery);
  const visiblePendingTasks = visibleTasks.filter((task) => !task.isCompleted);
  const visibleCompletedTasks = visibleTasks.filter((task) => task.isCompleted);
  const hasTasks = tasks.length > 0;
  const hasActiveNavigation =
    activeFilter !== "all" || searchQuery.trim().length > 0;
  const shouldShowPending = activeFilter === "all" || activeFilter === "pending";
  const shouldShowCompleted =
    activeFilter === "all" || activeFilter === "completed";

  const getEmptyMessage = (fallback: string, sectionTaskCount: number): string => {
    if (!hasTasks) {
      return "Nenhuma tarefa criada ainda.";
    }

    if (hasActiveNavigation && sectionTaskCount === 0) {
      return "Nenhuma tarefa encontrada com os filtros atuais.";
    }

    return fallback;
  };

  const handleCreateTask = (input: TaskInput): boolean => {
    const wasCreated = createTask(input);

    if (wasCreated) {
      setFeedback("Tarefa criada.");
    }

    return wasCreated;
  };

  const handleUpdateTask = (taskId: string, input: TaskInput): boolean => {
    const wasUpdated = updateTask(taskId, input);

    if (wasUpdated) {
      setFeedback("Tarefa atualizada.");
    }

    return wasUpdated;
  };

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId);
    setFeedback("Tarefa concluída.");
  };

  const handleReopenTask = (taskId: string) => {
    reopenTask(taskId);
    setFeedback("Tarefa reaberta.");
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setFeedback("Tarefa excluída.");
  };

  return (
    <div className={styles.app}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div>
            <p className={styles.productLabel}>TaskFlow</p>
            <h1 className={styles.title}>Gerencie tarefas com clareza.</h1>
          </div>
          <p className={styles.subtitle}>
            Organize pendências, acompanhe conclusões e mantenha o fluxo de trabalho
            simples.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <section aria-labelledby="create-task-title" className={styles.createSection}>
          <div className={styles.sectionHeading}>
            <h2 id="create-task-title">Nova tarefa</h2>
            <p>Registre uma tarefa com título e, se quiser, alguns detalhes.</p>
          </div>
          <TaskForm onCreateTask={handleCreateTask} />
        </section>

        <p aria-live="polite" className={styles.feedback} role="status">
          {feedback}
        </p>

        <TaskFilters
          activeFilter={activeFilter}
          matchCount={visibleTasks.length}
          onFilterChange={setActiveFilter}
          onSearchChange={setSearchQuery}
          searchValue={searchQuery}
          totalCount={tasks.length}
        />

        <div className={styles.lists}>
          {shouldShowPending ? (
            <TaskList
              emptyMessage={getEmptyMessage(
                "Nenhuma tarefa pendente no momento.",
                activeFilter === "all" ? visiblePendingTasks.length : visibleTasks.length,
              )}
              emptyTitle="Sem tarefas pendentes"
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
              onReopenTask={handleReopenTask}
              onUpdateTask={handleUpdateTask}
              sectionId="pending-tasks-title"
              tasks={activeFilter === "all" ? visiblePendingTasks : visibleTasks}
              title="Tarefas pendentes"
              variant="pending"
            />
          ) : null}

          {shouldShowCompleted ? (
            <TaskList
              emptyMessage={getEmptyMessage(
                "Nenhuma tarefa concluída ainda.",
                activeFilter === "all" ? visibleCompletedTasks.length : visibleTasks.length,
              )}
              emptyTitle="Sem tarefas concluídas"
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
              onReopenTask={handleReopenTask}
              onUpdateTask={handleUpdateTask}
              sectionId="completed-tasks-title"
              tasks={activeFilter === "all" ? visibleCompletedTasks : visibleTasks}
              title="Tarefas concluídas"
              variant="completed"
            />
          ) : null}
        </div>
      </main>
    </div>
  );
};
