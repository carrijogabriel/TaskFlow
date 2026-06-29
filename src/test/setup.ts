import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { TASKS_STORAGE_KEY } from "../services/taskStorage";

const createLocalStorageMock = (): Storage => {
  const items = new Map<string, string>();

  return {
    get length() {
      return items.size;
    },
    clear: () => items.clear(),
    getItem: (key: string) => items.get(key) ?? null,
    key: (index: number) => Array.from(items.keys())[index] ?? null,
    removeItem: (key: string) => {
      items.delete(key);
    },
    setItem: (key: string, value: string) => {
      items.set(key, String(value));
    },
  };
};

const testLocalStorage = createLocalStorageMock();

Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: testLocalStorage,
});

beforeEach(() => {
  testLocalStorage.removeItem(TASKS_STORAGE_KEY);
});

afterEach(() => {
  cleanup();
  testLocalStorage.removeItem(TASKS_STORAGE_KEY);
  vi.restoreAllMocks();
  vi.useRealTimers();
});
