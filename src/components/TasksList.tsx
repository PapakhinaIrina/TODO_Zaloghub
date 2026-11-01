import { useEffect, useRef, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { ListWrapper } from "./ListWrapper";
import { createTaskActions, loadTasks, saveTasks } from "../helpers/tasks";
import type { Filter, Task } from "../lib/types";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "active", label: "Активные" },
  { value: "completed", label: "Выполненные" },
];

export const TasksList = () => {
  const [initial] = useState(loadTasks);
  const [tasks, setTasks] = useState<Task[]>(initial.tasks);
  const [storageError, setStorageError] = useState(initial.error);
  const [changed, setChanged] = useState(false);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!changed) return;
    setStorageError(saveTasks(tasks));
  }, [tasks, changed]);

  const { addTask, toggleTask, deleteTask } = createTaskActions({
    text,
    setTasks,
    setChanged,
    setText,
    setFilter,
    input,
  });

  const completed = tasks.filter((task) => task.completed).length;
  const active = tasks.length - completed;
  const visibleTasks = tasks.filter(
    (task) =>
      filter === "all" ||
      (filter === "completed" ? task.completed : !task.completed),
  );
  const counts = { all: tasks.length, active, completed };

  return (
    <>
      <section className="task-panel" aria-label="Список задач">
        <form onSubmit={addTask} className="add-form">
          <div className="input-row">
            <input
              ref={input}
              id="new-task"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Напишите задачу"
              autoComplete="off"
            />
            <button
              className="add-button"
              type="submit"
              disabled={!text.trim()}
            >
              <span aria-hidden="true">+</span> Добавить
            </button>
          </div>
        </form>
        <div className="list-toolbar">
          <div className="filters" role="group" aria-label="Фильтр задач">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
                <span>{counts[item.value]}</span>
              </button>
            ))}
          </div>
        </div>
        <ListWrapper
          visibleTasks={visibleTasks}
          totalTasks={tasks.length}
          activeCount={active}
          completedCount={completed}
          filter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </section>
      {storageError && <ErrorMessage message={storageError} />}
      <p className="storage-note">
        <span aria-hidden="true">◦</span>{" "}
        {storageError
          ? "Сохранение недоступно"
          : "Задачи сохраняются в этом браузере"}
      </p>
    </>
  );
};
