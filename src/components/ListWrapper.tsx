import { TaskItem } from "./TaskItem";
import type { ListWrapperProps } from "../lib/types";

export const ListWrapper = ({
  visibleTasks,
  totalTasks,
  activeCount,
  completedCount,
  filter,
  onToggle,
  onDelete,
}: ListWrapperProps) => (
  <>
    {visibleTasks.length ? (
      <ul className="task-list">
        {visibleTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    ) : (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">
          ✓
        </span>
        <h2>
          {filter === "completed"
            ? "Всё ещё впереди"
            : totalTasks
              ? "Можно выдохнуть"
              : "Начните с одной задачи"}
        </h2>
        <p>
          {filter === "completed"
            ? "Здесь появятся задачи, которые вы выполните."
            : totalTasks
              ? "Активных задач нет. Отличная работа!"
              : "Добавьте первое дело — и день станет чуть понятнее."}
        </p>
      </div>
    )}
    <footer className="panel-footer">
      <span role="status">
        Осталось: <strong>{activeCount}</strong>
      </span>
      <span>
        Выполнено <strong>{completedCount}</strong> из {totalTasks}
      </span>
    </footer>
  </>
);
