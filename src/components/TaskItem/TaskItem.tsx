import { useEffect, useRef, useState, type FormEvent } from "react";
import type { TaskInput } from "../../hooks/useTasks";
import type { Task, TaskPriority } from "../../types/task";
import { formatDueDate, isTaskOverdue } from "../../utils/taskDates";
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

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

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
  const [draftPriority, setDraftPriority] = useState<TaskPriority>(task.priority);
  const [draftDueDate, setDraftDueDate] = useState(task.dueDate ?? "");
  const [titleError, setTitleError] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      titleInputRef.current?.focus();
    }
  }, [isEditing]);

  const startEditing = () => {
    setDraftTitle(task.title);
    setDraftDescription(task.description ?? "");
    setDraftPriority(task.priority);
    setDraftDueDate(task.dueDate ?? "");
    setTitleError("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftTitle(task.title);
    setDraftDescription(task.description ?? "");
    setDraftPriority(task.priority);
    setDraftDueDate(task.dueDate ?? "");
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
      priority: draftPriority,
      dueDate: draftDueDate,
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

  const taskIsOverdue = isTaskOverdue(task);

  if (isEditing) {
    return (
      <article className={`${styles.item} ${styles.editing}`}>
        <form
          aria-label={`Editar tarefa ${task.title}`}
          className={styles.editForm}
          noValidate
          onSubmit={handleSave}
        >
          <p className={styles.editingLabel}>Editando tarefa</p>

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
              ref={titleInputRef}
              required
              type="text"
              value={draftTitle}
            />
            {titleError ? (
              <p className={styles.error} id={`edit-title-error-${task.id}`} role="alert">
                {titleError}
              </p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={`edit-description-${task.id}`}>
              Descrição <span className={styles.optionalLabel}>(opcional)</span>
            </label>
            <textarea
              className={styles.textarea}
              id={`edit-description-${task.id}`}
              onChange={(event) => setDraftDescription(event.target.value)}
              rows={3}
              value={draftDescription}
            />
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`edit-priority-${task.id}`}>
                Prioridade
              </label>
              <select
                className={styles.select}
                id={`edit-priority-${task.id}`}
                onChange={(event) =>
                  setDraftPriority(event.target.value as TaskPriority)
                }
                value={draftPriority}
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`edit-due-date-${task.id}`}>
                Prazo <span className={styles.optionalLabel}>(opcional)</span>
              </label>
              <input
                className={styles.input}
                id={`edit-due-date-${task.id}`}
                onChange={(event) => setDraftDueDate(event.target.value)}
                type="date"
                value={draftDueDate}
              />
            </div>
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

        <div className={styles.badges} aria-label="Detalhes da tarefa">
          <span
            className={`${styles.badge} ${styles.priorityBadge} ${styles[`priority-${task.priority}`]}`}
          >
            Prioridade: {PRIORITY_LABELS[task.priority]}
          </span>
          {task.dueDate ? (
            <span className={`${styles.badge} ${styles.dueDateBadge}`}>
              Prazo: {formatDueDate(task.dueDate)}
            </span>
          ) : null}
          {taskIsOverdue ? (
            <span className={`${styles.badge} ${styles.overdue}`}>Atrasada</span>
          ) : null}
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
