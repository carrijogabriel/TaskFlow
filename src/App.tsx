import { useState } from "react";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { TaskList } from "./components/TaskList/TaskList";
import { useTasks, type TaskInput } from "./hooks/useTasks";
import styles from "./App.module.css";

const DEFAULT_FEEDBACK = "Pronto para organizar as próximas tarefas.";

export const App = () => {
  const {
    completedTasks,
    completeTask,
    createTask,
    deleteTask,
    pendingTasks,
    reopenTask,
    updateTask,
  } = useTasks();

  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);

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
        <div>
          <p className={styles.productLabel}>TaskFlow</p>
          <h1 className={styles.title}>Gerencie tarefas com clareza.</h1>
        </div>
      </header>

      <main className={styles.main}>
        <section aria-labelledby="create-task-title" className={styles.createSection}>
          <div className={styles.sectionHeading}>
            <h2 id="create-task-title">Nova tarefa</h2>
          </div>
          <TaskForm onCreateTask={handleCreateTask} />
        </section>

        <p aria-live="polite" className={styles.feedback} role="status">
          {feedback}
        </p>

        <div className={styles.lists}>
          <TaskList
            emptyMessage="Nada em aberto no momento."
            emptyTitle="Sem tarefas pendentes"
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
            onReopenTask={handleReopenTask}
            onUpdateTask={handleUpdateTask}
            sectionId="pending-tasks-title"
            tasks={pendingTasks}
            title="Tarefas pendentes"
          />

          <TaskList
            emptyMessage="As tarefas concluídas aparecerão aqui."
            emptyTitle="Sem tarefas concluídas"
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
            onReopenTask={handleReopenTask}
            onUpdateTask={handleUpdateTask}
            sectionId="completed-tasks-title"
            tasks={completedTasks}
            title="Tarefas concluídas"
          />
        </div>
      </main>
    </div>
  );
};
