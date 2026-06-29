import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { App } from "./App";

const renderTaskFlow = () => {
  const user = userEvent.setup();
  render(<App />);

  return { user };
};

const getPendingSection = () =>
  screen.getByRole("region", { name: "Tarefas pendentes" });

const getCompletedSection = () =>
  screen.getByRole("region", { name: "Tarefas concluídas" });

const getCreateTitleInput = () => screen.getByRole("textbox", { name: "Título" });

const getCreateDescriptionInput = () =>
  screen.getByRole("textbox", { name: /descrição/i });

const createTaskFromForm = async (
  user: ReturnType<typeof userEvent.setup>,
  title: string,
  description?: string,
) => {
  await user.type(getCreateTitleInput(), title);

  if (description) {
    await user.type(getCreateDescriptionInput(), description);
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
    expect(screen.getByLabelText("1 tarefa em tarefas pendentes")).toBeInTheDocument();
    expect(screen.getByLabelText("0 tarefas em tarefas concluídas")).toBeInTheDocument();
    expect(getCreateTitleInput()).toHaveValue("");
    expect(getCreateDescriptionInput()).toHaveValue("");
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
    await user.click(within(editForm).getByRole("button", { name: "Salvar" }));

    expect(screen.getByText("Titulo editado")).toBeInTheDocument();
    expect(screen.getByText("Descricao editada")).toBeInTheDocument();
    expect(screen.queryByText("Titulo original")).not.toBeInTheDocument();
    expect(screen.queryByText("Descricao original")).not.toBeInTheDocument();
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
});
