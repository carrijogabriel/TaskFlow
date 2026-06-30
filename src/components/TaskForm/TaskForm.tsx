import { useState, type FormEvent } from "react";
import type { TaskInput } from "../../hooks/useTasks";
import styles from "./TaskForm.module.css";

type TaskFormProps = {
  onCreateTask: (input: TaskInput) => boolean;
};

export const TaskForm = ({ onCreateTask }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setTitleError("Informe um título para criar a tarefa.");
      return;
    }

    const wasCreated = onCreateTask({
      title: normalizedTitle,
      description,
    });

    if (!wasCreated) {
      setTitleError("Informe um título para criar a tarefa.");
      return;
    }

    setTitle("");
    setDescription("");
    setTitleError("");
  };

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-title">
          Título
        </label>
        <input
          aria-describedby={titleError ? "task-title-error" : undefined}
          aria-invalid={titleError ? "true" : "false"}
          className={styles.input}
          id="task-title"
          onChange={(event) => {
            setTitle(event.target.value);
            if (titleError) {
              setTitleError("");
            }
          }}
          placeholder="Ex.: Revisar planejamento da semana"
          required
          type="text"
          value={title}
        />
        {titleError ? (
          <p className={styles.error} id="task-title-error" role="alert">
            {titleError}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="task-description">
          Descrição <span className={styles.optionalLabel}>(opcional)</span>
        </label>
        <textarea
          className={styles.textarea}
          id="task-description"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Detalhes opcionais da tarefa"
          rows={4}
          value={description}
        />
      </div>

      <button className={styles.submitButton} type="submit">
        Criar tarefa
      </button>
    </form>
  );
};
