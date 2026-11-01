import "./App.css";
import { TasksList } from "./components/TasksList";

export const App = () => {
  return (
    <div className="app">
      <header className="brand">
        <span className="brand-icon" aria-hidden="true">
          ✓
        </span>{" "}
        <span className="brand-caption">TODO LIST</span>
      </header>
      <main>
        <TasksList />
      </main>
      <footer className="page-footer">
        Один список. Чуть больше спокойствия.
      </footer>
    </div>
  );
};

export default App;
