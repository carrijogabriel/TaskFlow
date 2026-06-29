import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  title: string;
  message: string;
};

export const EmptyState = ({ title, message }: EmptyStateProps) => {
  return (
    <div className={styles.emptyState}>
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
    </div>
  );
};
