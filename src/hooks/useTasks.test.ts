import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTasks } from "./useTasks";

const setTime = (isoDate: string) => {
  vi.setSystemTime(new Date(isoDate));
};

describe("useTasks", () => {
  it("inicia sem tarefas", () => {
    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks).toEqual([]);
    expect(result.current.pendingTasks).toEqual([]);
    expect(result.current.completedTasks).toEqual([]);
  });

  it("cria tarefa com titulo normalizado, descricao opcional e datas iniciais", () => {
    vi.useFakeTimers();
    setTime("2026-06-29T15:00:00.000Z");

    const { result } = renderHook(() => useTasks());
    let wasCreated = false;

    act(() => {
      wasCreated = result.current.createTask({
        title: "  Revisar MVP  ",
        description: "  Cobrir regras principais  ",
      });
    });

    expect(wasCreated).toBe(true);
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.pendingTasks).toHaveLength(1);
    expect(result.current.completedTasks).toHaveLength(0);

    const [task] = result.current.tasks;
    expect(task).toEqual(
      expect.objectContaining({
        title: "Revisar MVP",
        description: "Cobrir regras principais",
        isCompleted: false,
        createdAt: "2026-06-29T15:00:00.000Z",
        updatedAt: "2026-06-29T15:00:00.000Z",
        completedAt: null,
      }),
    );
    expect(task?.id).toEqual(expect.any(String));
  });

  it("permite criar tarefa sem descricao", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.createTask({ title: "Tarefa sem descricao", description: "" });
    });

    expect(result.current.tasks[0]).toEqual(
      expect.objectContaining({
        title: "Tarefa sem descricao",
        description: undefined,
      }),
    );
  });

  it("nao cria tarefa com titulo vazio ou apenas espacos", () => {
    const { result } = renderHook(() => useTasks());
    let emptyTitleResult = true;
    let spacesTitleResult = true;

    act(() => {
      emptyTitleResult = result.current.createTask({ title: "" });
      spacesTitleResult = result.current.createTask({ title: "   " });
    });

    expect(emptyTitleResult).toBe(false);
    expect(spacesTitleResult).toBe(false);
    expect(result.current.tasks).toEqual([]);
  });

  it("conclui tarefa atualizando status, completedAt e updatedAt", () => {
    vi.useFakeTimers();
    setTime("2026-06-29T15:00:00.000Z");

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.createTask({ title: "Concluir tarefa" });
    });

    const taskId = result.current.tasks[0]?.id ?? "";
    setTime("2026-06-29T16:30:00.000Z");

    act(() => {
      result.current.completeTask(taskId);
    });

    expect(result.current.pendingTasks).toHaveLength(0);
    expect(result.current.completedTasks).toHaveLength(1);
    expect(result.current.tasks[0]).toEqual(
      expect.objectContaining({
        isCompleted: true,
        completedAt: "2026-06-29T16:30:00.000Z",
        updatedAt: "2026-06-29T16:30:00.000Z",
      }),
    );
  });

  it("reabre tarefa limpando completedAt e atualizando updatedAt", () => {
    vi.useFakeTimers();
    setTime("2026-06-29T15:00:00.000Z");

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.createTask({ title: "Reabrir tarefa" });
    });

    const taskId = result.current.tasks[0]?.id ?? "";

    setTime("2026-06-29T16:00:00.000Z");
    act(() => {
      result.current.completeTask(taskId);
    });

    setTime("2026-06-29T17:00:00.000Z");
    act(() => {
      result.current.reopenTask(taskId);
    });

    expect(result.current.pendingTasks).toHaveLength(1);
    expect(result.current.completedTasks).toHaveLength(0);
    expect(result.current.tasks[0]).toEqual(
      expect.objectContaining({
        isCompleted: false,
        completedAt: null,
        updatedAt: "2026-06-29T17:00:00.000Z",
      }),
    );
  });

  it("edita titulo e descricao com trim no titulo e atualiza updatedAt", () => {
    vi.useFakeTimers();
    setTime("2026-06-29T15:00:00.000Z");

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.createTask({ title: "Titulo original", description: "Descricao" });
    });

    const taskId = result.current.tasks[0]?.id ?? "";
    setTime("2026-06-29T18:00:00.000Z");

    let wasUpdated = false;
    act(() => {
      wasUpdated = result.current.updateTask(taskId, {
        title: "  Titulo editado  ",
        description: "  Descricao editada  ",
      });
    });

    expect(wasUpdated).toBe(true);
    expect(result.current.tasks[0]).toEqual(
      expect.objectContaining({
        title: "Titulo editado",
        description: "Descricao editada",
        updatedAt: "2026-06-29T18:00:00.000Z",
      }),
    );
  });

  it("nao salva edicao com titulo vazio", () => {
    vi.useFakeTimers();
    setTime("2026-06-29T15:00:00.000Z");

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.createTask({ title: "Titulo original", description: "Descricao" });
    });

    const taskId = result.current.tasks[0]?.id ?? "";
    const originalTask = result.current.tasks[0];

    let wasUpdated = true;
    act(() => {
      wasUpdated = result.current.updateTask(taskId, {
        title: "   ",
        description: "Nao deve salvar",
      });
    });

    expect(wasUpdated).toBe(false);
    expect(result.current.tasks[0]).toEqual(originalTask);
  });

  it("exclui a tarefa correta sem afetar outras", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.createTask({ title: "Tarefa A" });
      result.current.createTask({ title: "Tarefa B" });
    });

    const taskToDelete = result.current.tasks.find((task) => task.title === "Tarefa A");

    act(() => {
      result.current.deleteTask(taskToDelete?.id ?? "");
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0]?.title).toBe("Tarefa B");
  });
});
