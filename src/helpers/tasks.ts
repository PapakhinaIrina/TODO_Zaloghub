import type { FormEvent } from "react";
import type { Task, TaskActionsOptions } from "../lib/types";

const STORAGE_KEY = "zaloghub.tasks.v1";

export const loadTasks = (): { tasks: Task[]; error: string } => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { tasks: [], error: "" };
    const data: unknown = JSON.parse(raw);
    if (
      !Array.isArray(data) ||
      !data.every(
        (task): task is Task =>
          typeof task === "object" &&
          task !== null &&
          typeof task.id === "string" &&
          typeof task.text === "string" &&
          task.text.trim().length > 0 &&
          typeof task.completed === "boolean",
      ) ||
      new Set(data.map((task) => task.id)).size !== data.length
    ) {
      throw new Error("Invalid stored tasks");
    }
    return { tasks: data, error: "" };
  } catch {
    return {
      tasks: [],
      error:
        "Не удалось прочитать сохранённые задачи. Новые задачи можно добавлять, но проверьте доступ к хранилищу браузера.",
    };
  }
};

export const saveTasks = (tasks: Task[]): string => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return "";
  } catch {
    return "Не удалось сохранить задачи. Они доступны до закрытия или обновления страницы.";
  }
};

export const createTaskActions = ({
  text,
  setTasks,
  setChanged,
  setText,
  setFilter,
  input,
}: TaskActionsOptions) => ({
  addTask: (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks((previous) => [
      ...previous,
      { id: crypto.randomUUID(), text: trimmed, completed: false },
    ]);
    setChanged(true);
    setText("");
    setFilter("all");
    input.current?.focus();
  },
  toggleTask: (id: string) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
    setChanged(true);
  },
  deleteTask: (id: string) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
    setChanged(true);
  },
});
