import type { Dispatch, RefObject, SetStateAction } from "react";

export type Task = { id: string; text: string; completed: boolean };
export type Filter = "all" | "active" | "completed";

export type TaskActionsOptions = {
  text: string;
  setTasks: Dispatch<SetStateAction<Task[]>>;
  setChanged: Dispatch<SetStateAction<boolean>>;
  setText: Dispatch<SetStateAction<string>>;
  setFilter: Dispatch<SetStateAction<Filter>>;
  input: RefObject<HTMLInputElement | null>;
};

export type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export type ListWrapperProps = {
  visibleTasks: Task[];
  totalTasks: number;
  activeCount: number;
  completedCount: number;
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export type ErrorMessageProps = {
  message: string;
};
