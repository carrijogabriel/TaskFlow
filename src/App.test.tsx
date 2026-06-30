import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { App } from "./App";
import { TASKS_STORAGE_KEY } from "./services/taskStorage";
import type { Task, TaskPriority } from "./types/task";

type CreateTaskOptions = {
  description?: string;
  dueDate?: string;
  priority?: TaskPriority;
};

const createStoredTask = (overrides: Partial<Task> = {}): Task => ({
  id: "stored-task-1",
  title: "Tarefa salva",
  description: "Descricao salva",
  priority: "medium",
  dueDate: null,
  isCompleted: false,
  createdAt: "2026-06-29T15:00:00.000Z",
  updatedAt: "2026-06-29T15:00:00.000Z",
  completedAt: null,
  ...overrides,
});

const seedStoredTasks = (tasks: Task[]) => {
  window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

const renderTaskFlow = () => {
  const user = userEvent.setup();
  const renderResult = render(<App />);

  return { user, ...renderResult };
};

const getPendingSection = () =>
  screen.getByRole("region", { name: "Tarefas pendentes" });

const getCompletedSection = () =>
  screen.getByRole("region", { name: "Tarefas concluídas" });

const getTaskTitlesInSection = (section: HTMLElement) =>
  within(section)
    .getAllByRole("heading", { level: 3 })
    .map((heading) => heading.textContent);

const getCreateTitleInput = () => screen.getByRole("textbox", { name: "Título" });

const getCreateDescriptionInput = () =>
  screen.getByRole("textbox", { name: /descrição/i });

const getCreatePrioritySelect = () =>
  screen.getByRole("combobox", { name: "Prioridade" });

const getCreateDueDateInput = () => screen.getByLabelText(/prazo/i);

const getSearchInput = () => screen.getByRole("searchbox", { name: "Buscar tarefas" });

const createTaskFromForm = async (
  user: ReturnType<typeof userEvent.setup>,
  title: string,
  descriptionOrOptions?: string | CreateTaskOptions,
) => {
  const options =
    typeof descriptionOrOptions === "string"
      ? { description: descriptionOrOptions }
      : (descriptionOrOptions ?? {});

  await user.type(getCreateTitleInput(), title);

  if (options.description) {
    await user.type(getCreateDescriptionInput(), options.description);
  }

  if (options.priority) {
    await user.selectOptions(getCreatePrioritySelect(), options.priority);
  }

  if (options.dueDate) {
    await user.type(getCreateDueDateInput(), options.dueDate);
  }

  await user.click(screen.getByRole("button", { name: "Criar tarefa" }));
};

describe("App", () => {
  it("renderiza a tela inicial com formulario, secoes e estados vazios", () => {
    renderTaskFlow();

    expect(screen.getByText("TaskFlow")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Gerencie tarefas com clareza." }),
    ).toBeInTheDocument();
    expect(getCreateTitleInput()).toBeInTheDocument();
    expect(getCreateDescriptionInput()).toBeInTheDocument();
    expect(getCreatePrioritySelect()).toHaveValue("medium");
    expect(getCreateDueDateInput()).toHaveValue("");
    expect(getSearchInput()).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Todas" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(getPendingSection()).toBeInTheDocument();
    expect(getCompletedSection()).toBeInTheDocument();
    expect(screen.getByText("Sem tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByText("Sem tarefas concluídas")).toBeInTheDocument();
    expect(screen.getByLabelText("0 tarefas em tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByLabelText("0 tarefas em tarefas concluídas")).toBeInTheDocument();
  });

  it("cria tarefa pela interface, atualiza contador e limpa formulario", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(
      user,
      "Revisar planejamento",
      "Validar tarefas principais",
    );

    expect(within(getPendingSection()).getByText("Revisar planejamento")).toBeInTheDocument();
    expect(within(getPendingSection()).getByText("Validar tarefas principais")).toBeInTheDocument();
    expect(within(getPendingSection()).getByText("Prioridade: Média")).toBeInTheDocument();
    expect(screen.getByLabelText("1 tarefa em tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByLabelText("0 tarefas em tarefas concluídas")).toBeInTheDocument();
    expect(getCreateTitleInput()).toHaveValue("");
    expect(getCreateDescriptionInput()).toHaveValue("");
    expect(getCreatePrioritySelect()).toHaveValue("medium");
    expect(getCreateDueDateInput()).toHaveValue("");
  });

  it("cria tarefa com prioridade e prazo pela interface", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Entregar planejamento", {
      dueDate: "2026-07-20",
      priority: "high",
    });

    expect(within(getPendingSection()).getByText("Entregar planejamento")).toBeInTheDocument();
    expect(within(getPendingSection()).getByText("Prioridade: Alta")).toBeInTheDocument();
    expect(within(getPendingSection()).getByText("Prazo: 20/07/2026")).toBeInTheDocument();
    expect(getCreatePrioritySelect()).toHaveValue("medium");
    expect(getCreateDueDateInput()).toHaveValue("");
  });

  it("mostra badges de prioridade baixa, média e alta com texto claro", () => {
    seedStoredTasks([
      createStoredTask({
        id: "low-priority-task",
        priority: "low",
        title: "Tarefa de baixa prioridade",
      }),
      createStoredTask({
        id: "medium-priority-task",
        priority: "medium",
        title: "Tarefa de média prioridade",
      }),
      createStoredTask({
        id: "high-priority-task",
        priority: "high",
        title: "Tarefa de alta prioridade",
      }),
    ]);

    render(<App />);

    expect(screen.getByText("Prioridade: Baixa")).toBeInTheDocument();
    expect(screen.getByText("Prioridade: Média")).toBeInTheDocument();
    expect(screen.getByText("Prioridade: Alta")).toBeInTheDocument();
  });

  it("bloqueia criacao com titulo vazio ou apenas espacos", async () => {
    const { user } = renderTaskFlow();

    await user.click(screen.getByRole("button", { name: "Criar tarefa" }));

    expect(screen.getByText("Informe um título para criar a tarefa.")).toBeInTheDocument();
    expect(screen.getByLabelText("0 tarefas em tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByText("Sem tarefas pendentes")).toBeInTheDocument();

    await user.type(getCreateTitleInput(), "   ");
    await user.click(screen.getByRole("button", { name: "Criar tarefa" }));

    expect(screen.getByLabelText("0 tarefas em tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByText("Sem tarefas pendentes")).toBeInTheDocument();
  });

  it("conclui tarefa movendo de pendentes para concluidas", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Concluir relatório");
    await user.click(screen.getByRole("button", { name: "Concluir" }));

    expect(within(getPendingSection()).queryByText("Concluir relatório")).not.toBeInTheDocument();
    expect(within(getCompletedSection()).getByText("Concluir relatório")).toBeInTheDocument();
    expect(screen.getByLabelText("0 tarefas em tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByLabelText("1 tarefa em tarefas concluídas")).toBeInTheDocument();
  });

  it("reabre tarefa movendo de concluidas para pendentes", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Reabrir tarefa");
    await user.click(screen.getByRole("button", { name: "Concluir" }));
    await user.click(screen.getByRole("button", { name: "Reabrir" }));

    expect(within(getPendingSection()).getByText("Reabrir tarefa")).toBeInTheDocument();
    expect(within(getCompletedSection()).queryByText("Reabrir tarefa")).not.toBeInTheDocument();
    expect(screen.getByLabelText("1 tarefa em tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByLabelText("0 tarefas em tarefas concluídas")).toBeInTheDocument();
  });

  it("edita tarefa pela interface", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Titulo original", "Descricao original");
    await user.click(screen.getByRole("button", { name: "Editar" }));

    const editForm = screen.getByRole("form", {
      name: "Editar tarefa Titulo original",
    });

    await user.clear(within(editForm).getByRole("textbox", { name: "Título" }));
    await user.type(within(editForm).getByRole("textbox", { name: "Título" }), "Titulo editado");
    await user.clear(within(editForm).getByRole("textbox", { name: /descrição/i }));
    await user.type(
      within(editForm).getByRole("textbox", { name: /descrição/i }),
      "Descricao editada",
    );
    await user.selectOptions(
      within(editForm).getByRole("combobox", { name: "Prioridade" }),
      "low",
    );
    await user.type(within(editForm).getByLabelText(/prazo/i), "2026-07-01");
    await user.click(within(editForm).getByRole("button", { name: "Salvar" }));

    expect(screen.getByText("Titulo editado")).toBeInTheDocument();
    expect(screen.getByText("Descricao editada")).toBeInTheDocument();
    expect(screen.getByText("Prioridade: Baixa")).toBeInTheDocument();
    expect(screen.getByText("Prazo: 01/07/2026")).toBeInTheDocument();
    expect(screen.queryByText("Titulo original")).not.toBeInTheDocument();
    expect(screen.queryByText("Descricao original")).not.toBeInTheDocument();
  });

  it("remove prazo ao salvar edicao com campo de data vazio", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Tarefa com prazo", { dueDate: "2026-07-20" });
    await user.click(screen.getByRole("button", { name: "Editar" }));

    const editForm = screen.getByRole("form", {
      name: "Editar tarefa Tarefa com prazo",
    });

    await user.clear(within(editForm).getByLabelText(/prazo/i));
    await user.click(within(editForm).getByRole("button", { name: "Salvar" }));

    expect(screen.getByText("Tarefa com prazo")).toBeInTheDocument();
    expect(screen.queryByText("Prazo: 20/07/2026")).not.toBeInTheDocument();
  });

  it("exclui tarefa quando a confirmacao retorna true", async () => {
    const { user } = renderTaskFlow();
    vi.spyOn(window, "confirm").mockReturnValue(true);

    await createTaskFromForm(user, "Excluir tarefa");
    await user.click(screen.getByRole("button", { name: "Excluir" }));

    expect(window.confirm).toHaveBeenCalledWith('Excluir a tarefa "Excluir tarefa"?');
    expect(screen.queryByText("Excluir tarefa")).not.toBeInTheDocument();
    expect(screen.getByLabelText("0 tarefas em tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByText("Sem tarefas pendentes")).toBeInTheDocument();
  });

  it("mantem tarefa quando a confirmacao de exclusao retorna false", async () => {
    const { user } = renderTaskFlow();
    vi.spyOn(window, "confirm").mockReturnValue(false);

    await createTaskFromForm(user, "Manter tarefa");
    await user.click(screen.getByRole("button", { name: "Excluir" }));

    expect(window.confirm).toHaveBeenCalledWith('Excluir a tarefa "Manter tarefa"?');
    expect(screen.getByText("Manter tarefa")).toBeInTheDocument();
    expect(screen.getByLabelText("1 tarefa em tarefas pendentes")).toBeInTheDocument();
  });

  it("mantem tarefa pendente apos remontar a aplicacao", async () => {
    const { user, unmount } = renderTaskFlow();

    await createTaskFromForm(user, "Persistir tarefa", "Continua apos remontar");
    unmount();

    renderTaskFlow();

    expect(within(getPendingSection()).getByText("Persistir tarefa")).toBeInTheDocument();
    expect(within(getPendingSection()).getByText("Continua apos remontar")).toBeInTheDocument();
    expect(screen.getByLabelText("1 tarefa em tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByLabelText("0 tarefas em tarefas concluídas")).toBeInTheDocument();
  });

  it("mantem tarefa concluida na secao correta apos remontar", async () => {
    const { user, unmount } = renderTaskFlow();

    await createTaskFromForm(user, "Persistir concluida");
    await user.click(screen.getByRole("button", { name: "Concluir" }));
    unmount();

    renderTaskFlow();

    expect(within(getPendingSection()).queryByText("Persistir concluida")).not.toBeInTheDocument();
    expect(within(getCompletedSection()).getByText("Persistir concluida")).toBeInTheDocument();
    expect(screen.getByLabelText("0 tarefas em tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByLabelText("1 tarefa em tarefas concluídas")).toBeInTheDocument();
  });

  it("mantem exclusao apos remontar a aplicacao", async () => {
    const { user, unmount } = renderTaskFlow();
    vi.spyOn(window, "confirm").mockReturnValue(true);

    await createTaskFromForm(user, "Excluir e persistir");
    await user.click(screen.getByRole("button", { name: "Excluir" }));
    unmount();

    renderTaskFlow();

    expect(screen.queryByText("Excluir e persistir")).not.toBeInTheDocument();
    expect(screen.getByText("Sem tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByLabelText("0 tarefas em tarefas pendentes")).toBeInTheDocument();
  });

  it("mostra indicador de atraso para tarefa pendente vencida", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-30T12:00:00.000Z"));
    seedStoredTasks([
      createStoredTask({
        dueDate: "2026-06-29",
        title: "Enviar relatorio atrasado",
      }),
    ]);

    render(<App />);

    expect(screen.getByText("Enviar relatorio atrasado")).toBeInTheDocument();
    expect(screen.getByText("Prazo: 29/06/2026")).toBeInTheDocument();
    expect(screen.getByText("Atrasada")).toBeInTheDocument();
  });

  it("nao mostra indicador de atraso para tarefa concluida vencida", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-30T12:00:00.000Z"));
    seedStoredTasks([
      createStoredTask({
        completedAt: "2026-06-29T16:00:00.000Z",
        dueDate: "2026-06-29",
        isCompleted: true,
        title: "Relatorio concluido vencido",
      }),
    ]);

    render(<App />);

    expect(screen.getByText("Relatorio concluido vencido")).toBeInTheDocument();
    expect(screen.getByText("Prazo: 29/06/2026")).toBeInTheDocument();
    expect(screen.queryByText("Atrasada")).not.toBeInTheDocument();
  });

  it("ordena tarefas pendentes com atrasadas antes das nao atrasadas", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-30T12:00:00.000Z"));
    seedStoredTasks([
      createStoredTask({
        createdAt: "2026-06-29T10:00:00.000Z",
        dueDate: "2026-07-01",
        id: "future-high-priority-task",
        priority: "high",
        title: "Alta prioridade futura",
      }),
      createStoredTask({
        createdAt: "2026-06-29T11:00:00.000Z",
        dueDate: "2026-06-29",
        id: "overdue-low-priority-task",
        priority: "low",
        title: "Baixa prioridade atrasada",
      }),
    ]);

    render(<App />);

    expect(getTaskTitlesInSection(getPendingSection())).toEqual([
      "Baixa prioridade atrasada",
      "Alta prioridade futura",
    ]);
  });

  it("ordena tarefas pendentes por prioridade depois da regra de atraso", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-30T12:00:00.000Z"));
    seedStoredTasks([
      createStoredTask({
        createdAt: "2026-06-29T10:00:00.000Z",
        id: "low-priority-order-task",
        priority: "low",
        title: "Prioridade baixa",
      }),
      createStoredTask({
        createdAt: "2026-06-29T11:00:00.000Z",
        id: "high-priority-order-task",
        priority: "high",
        title: "Prioridade alta",
      }),
      createStoredTask({
        createdAt: "2026-06-29T12:00:00.000Z",
        id: "medium-priority-order-task",
        priority: "medium",
        title: "Prioridade média",
      }),
    ]);

    render(<App />);

    expect(getTaskTitlesInSection(getPendingSection())).toEqual([
      "Prioridade alta",
      "Prioridade média",
      "Prioridade baixa",
    ]);
  });

  it("ordena tarefas pendentes por prazo mais proximo quando a prioridade empata", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-30T12:00:00.000Z"));
    seedStoredTasks([
      createStoredTask({
        createdAt: "2026-06-29T10:00:00.000Z",
        dueDate: "2026-07-20",
        id: "far-due-date-task",
        priority: "medium",
        title: "Prazo mais distante",
      }),
      createStoredTask({
        createdAt: "2026-06-29T11:00:00.000Z",
        dueDate: "2026-07-01",
        id: "near-due-date-task",
        priority: "medium",
        title: "Prazo mais próximo",
      }),
    ]);

    render(<App />);

    expect(getTaskTitlesInSection(getPendingSection())).toEqual([
      "Prazo mais próximo",
      "Prazo mais distante",
    ]);
  });

  it("ordena tarefas pendentes sem prazo depois das tarefas com prazo equivalente", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-30T12:00:00.000Z"));
    seedStoredTasks([
      createStoredTask({
        createdAt: "2026-06-29T10:00:00.000Z",
        dueDate: null,
        id: "without-due-date-task",
        priority: "medium",
        title: "Sem prazo",
      }),
      createStoredTask({
        createdAt: "2026-06-29T11:00:00.000Z",
        dueDate: "2026-07-20",
        id: "with-due-date-task",
        priority: "medium",
        title: "Com prazo",
      }),
    ]);

    render(<App />);

    expect(getTaskTitlesInSection(getPendingSection())).toEqual([
      "Com prazo",
      "Sem prazo",
    ]);
  });

  it("ordena tarefas concluidas pelas conclusoes mais recentes primeiro", () => {
    seedStoredTasks([
      createStoredTask({
        completedAt: "2026-06-29T16:00:00.000Z",
        id: "older-completed-task",
        isCompleted: true,
        title: "Concluída antiga",
        updatedAt: "2026-06-29T16:00:00.000Z",
      }),
      createStoredTask({
        completedAt: "2026-06-30T10:00:00.000Z",
        id: "newer-completed-task",
        isCompleted: true,
        title: "Concluída mais recente",
        updatedAt: "2026-06-30T10:00:00.000Z",
      }),
      createStoredTask({
        completedAt: null,
        id: "fallback-completed-task",
        isCompleted: true,
        title: "Concluída sem data de conclusão",
        updatedAt: "2026-06-30T09:00:00.000Z",
      }),
    ]);

    render(<App />);

    expect(getTaskTitlesInSection(getCompletedSection())).toEqual([
      "Concluída mais recente",
      "Concluída sem data de conclusão",
      "Concluída antiga",
    ]);
  });

  it("filtro Todas mostra tarefas pendentes e concluidas", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Tarefa concluida no filtro");
    await user.click(screen.getByRole("button", { name: "Concluir" }));
    await createTaskFromForm(user, "Tarefa pendente no filtro");
    await user.click(screen.getByRole("button", { name: "Todas" }));

    expect(within(getPendingSection()).getByText("Tarefa pendente no filtro")).toBeInTheDocument();
    expect(within(getCompletedSection()).getByText("Tarefa concluida no filtro")).toBeInTheDocument();
  });

  it("filtro Pendentes mostra apenas tarefas pendentes", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Tarefa concluida escondida");
    await user.click(screen.getByRole("button", { name: "Concluir" }));
    await createTaskFromForm(user, "Tarefa pendente visivel");
    await user.click(screen.getByRole("button", { name: "Pendentes" }));

    expect(screen.getByRole("button", { name: "Pendentes" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(getPendingSection()).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Tarefas concluídas" })).not.toBeInTheDocument();
    expect(screen.getByText("Tarefa pendente visivel")).toBeInTheDocument();
    expect(screen.queryByText("Tarefa concluida escondida")).not.toBeInTheDocument();
  });

  it("filtro Concluídas mostra apenas tarefas concluidas", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Tarefa concluida visivel");
    await user.click(screen.getByRole("button", { name: "Concluir" }));
    await createTaskFromForm(user, "Tarefa pendente escondida");
    await user.click(screen.getByRole("button", { name: "Concluídas" }));

    expect(screen.getByRole("button", { name: "Concluídas" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.queryByRole("region", { name: "Tarefas pendentes" })).not.toBeInTheDocument();
    expect(getCompletedSection()).toBeInTheDocument();
    expect(screen.getByText("Tarefa concluida visivel")).toBeInTheDocument();
    expect(screen.queryByText("Tarefa pendente escondida")).not.toBeInTheDocument();
  });

  it("busca tarefas pelo titulo sem diferenciar maiusculas", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Estudar React");
    await createTaskFromForm(user, "Revisar CSS");
    await user.type(getSearchInput(), "  estudar  ");

    expect(screen.getByText("Estudar React")).toBeInTheDocument();
    expect(screen.queryByText("Revisar CSS")).not.toBeInTheDocument();
  });

  it("busca tarefas pela descricao", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Revisar tela", "Ajustar detalhes de UX");
    await createTaskFromForm(user, "Atualizar README", "Documentacao do projeto");
    await user.type(getSearchInput(), "ux");

    expect(screen.getByText("Revisar tela")).toBeInTheDocument();
    expect(screen.queryByText("Atualizar README")).not.toBeInTheDocument();
  });

  it("mostra estado vazio quando a busca nao encontra tarefas", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Tarefa existente");
    await user.type(getSearchInput(), "sem resultado");

    expect(screen.queryByText("Tarefa existente")).not.toBeInTheDocument();
    expect(
      screen.getAllByText("Nenhuma tarefa encontrada com os filtros atuais."),
    ).not.toHaveLength(0);
  });

  it("combina filtro e busca ao mesmo tempo", async () => {
    const { user } = renderTaskFlow();

    await createTaskFromForm(user, "Estudar React");
    await user.click(screen.getByRole("button", { name: "Concluir" }));
    await createTaskFromForm(user, "Estudar CSS");
    await user.click(screen.getByRole("button", { name: "Pendentes" }));
    await user.type(getSearchInput(), "css");

    expect(screen.getByText("Estudar CSS")).toBeInTheDocument();
    expect(screen.queryByText("Estudar React")).not.toBeInTheDocument();
    expect(screen.getByLabelText("1 tarefa em tarefas pendentes")).toBeInTheDocument();
  });
});
