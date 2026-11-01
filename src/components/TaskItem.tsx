import type { TaskItemProps } from "../lib/types";

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => (
  <li className={task.completed ? "task completed" : "task"}>
    <label className="task-label">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text">{task.text}</span>
    </label>
    <button
      className="delete-button"
      type="button"
      onClick={() => onDelete(task.id)}
      aria-label={`Удалить задачу: ${task.text}`}
      title="Удалить задачу"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path
          d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5m4-5v5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </li>
);
