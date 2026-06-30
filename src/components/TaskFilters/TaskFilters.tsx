import styles from "./TaskFilters.module.css";

export type TaskFilter = "all" | "completed" | "pending";

type TaskFiltersProps = {
  activeFilter: TaskFilter;
  matchCount: number;
  onFilterChange: (filter: TaskFilter) => void;
  onSearchChange: (value: string) => void;
  searchValue: string;
  totalCount: number;
};

const FILTER_OPTIONS: Array<{ label: string; value: TaskFilter }> = [
  { label: "Todas", value: "all" },
  { label: "Pendentes", value: "pending" },
  { label: "Concluídas", value: "completed" },
];

export const TaskFilters = ({
  activeFilter,
  matchCount,
  onFilterChange,
  onSearchChange,
  searchValue,
  totalCount,
}: TaskFiltersProps) => {
  return (
    <section aria-labelledby="task-filters-title" className={styles.filters}>
      <div className={styles.heading}>
        <h2 id="task-filters-title">Navegar tarefas</h2>
        <p>
          {matchCount} de {totalCount} tarefa{totalCount === 1 ? "" : "s"}
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchField}>
          <label className={styles.label} htmlFor="task-search">
            Buscar tarefas
          </label>
          <input
            className={styles.searchInput}
            id="task-search"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por título ou descrição"
            type="search"
            value={searchValue}
          />
        </div>

        <div aria-label="Filtrar tarefas" className={styles.filterGroup} role="group">
          {FILTER_OPTIONS.map((option) => (
            <button
              aria-pressed={activeFilter === option.value}
              className={`${styles.filterButton} ${
                activeFilter === option.value ? styles.activeFilter : ""
              }`}
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
