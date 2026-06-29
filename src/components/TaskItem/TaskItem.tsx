import { useState, type FormEvent } from "react";
import type { TaskInput } from "../../hooks/useTasks";
import type { Task } from "../../types/task";
import styles from "./TaskItem.module.css";

type TaskItemProps = {
  task: Task;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onReopenTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, input: TaskInput) => boolean;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

const formatDate = (value: string): string => dateFormatter.format(new Date(value));

export const TaskItem = ({
  task,
  onCompleteTask,
  onDeleteTask,
  onReopenTask,
  onUpdateTask,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftDescription, setDraftDescription] = useState(task.description ?? "");
  const [titleError, setTitleError] = useState("");

  const startEditing = () => {
    setDraftTitle(task.title);
    setDraftDescription(task.description ?? "");
    setTitleError("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftTitle(task.title);
    setDraftDescription(task.description ?? "");
    setTitleError("");
    setIsEditing(false);
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = draftTitle.trim();

    if (!normalizedTitle) {
      setTitleError("Informe um título para salvar a tarefa.");
      return;
    }

    const wasUpdated = onUpdateTask(task.id, {
      title: normalizedTitle,
      description: draftDescription,
    });

    if (!wasUpdated) {
      setTitleError("Informe um título para salvar a tarefa.");
      return;
    }

    setTitleError("");
    setIsEditing(false);
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm(`Excluir a tarefa "${task.title}"?`);

    if (shouldDelete) {
      onDeleteTask(task.id);
    }
  };

  if (isEditing) {
    return (
      <article className={styles.item}>
        <form className={styles.editForm} onSubmit={handleSave}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`edit-title-${task.id}`}>
              Título
            </label>
            <input
              aria-describedby={titleError ? `edit-title-error-${task.id}` : undefined}
              aria-invalid={titleError ? "true" : "false"}
              className={styles.input}
              id={`edit-title-${task.id}`}
              onChange={(event) => {
                setDraftTitle(event.target.value);
                if (titleError) {
                  setTitleError("");
                }
              }}
              required
              type="text"
              value={draftTitle}
            />
            {titleError ? (
              <p className={styles.error} id={`edit-title-error-${task.id}`}>
                {titleError}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={`edit-description-${task.id}`}>
              Descrição
            </label>
            <textarea
              className={styles.textarea}
              id={`edit-description-${task.id}`}
              onChange={(event) => setDraftDescription(event.target.value)}
              rows={3}
              value={draftDescription}
            />
          </div>

          <div className={styles.actions}>
            <button type="submit">Salvar</button>
            <button className={styles.secondaryButton} onClick={cancelEditing} type="button">
              Cancelar
            </button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className={`${styles.item} ${task.isCompleted ? styles.completed : ""}`}>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{task.title}</h3>
          <span
            className={`${styles.status} ${
              task.isCompleted ? styles.statusCompleted : styles.statusPending
            }`}
          >
            {task.isCompleted ? "Concluída" : "Pendente"}
          </span>
        </div>

        {task.description ? (
          <p className={styles.description}>{task.description}</p>
        ) : null}

        <dl className={styles.meta}>
          <div>
            <dt>Criada</dt>
            <dd>{formatDate(task.createdAt)}</dd>
          </div>
          <div>
            <dt>Atualizada</dt>
            <dd>{formatDate(task.updatedAt)}</dd>
          </div>
          {task.completedAt ? (
            <div>
              <dt>Concluída</dt>
              <dd>{formatDate(task.completedAt)}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      <div className={styles.actions}>
        <button
          className={task.isCompleted ? styles.secondaryButton : undefined}
          onClick={() =>
            task.isCompleted ? onReopenTask(task.id) : onCompleteTask(task.id)
          }
          type="button"
        >
          {task.isCompleted ? "Reabrir" : "Concluir"}
        </button>
        <button className={styles.secondaryButton} onClick={startEditing} type="button">
          Editar
        </button>
        <button className={styles.dangerButton} onClick={handleDelete} type="button">
          Excluir
        </button>
      </div>
    </article>
  );
};
