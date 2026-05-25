import { useEffect, useMemo, useState } from "react";
import { Header } from "./Header";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { FilterBar } from "./FilterBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FilterType, Priority, SortType, Task } from "./types";

// Priority ordering used for sorting
const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

export function App() {
  // ---- State (arrays + hooks only, no persistence) ----
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("none");
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ---- CRUD helpers ----
  const addTask = (data: Omit<Task, "id" | "completed" | "archived">) => {
    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(),
      completed: false,
      archived: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const updateTask = (id: string, updates: Partial<Task>) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));

  const archiveTask = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, archived: !t.archived } : t)));

  // ---- Derived lists (filtering, searching, sorting) ----
  const activeTasks = tasks.filter((t) => !t.archived);
  const archivedTasks = tasks.filter((t) => t.archived);

  const counts = {
    all: activeTasks.length,
    completed: activeTasks.filter((t) => t.completed).length,
    pending: activeTasks.filter((t) => !t.completed).length,
  };

  const visibleTasks = useMemo(() => {
    let result = [...activeTasks];
    // Filter by status
    if (filter === "completed") result = result.filter((t) => t.completed);
    if (filter === "pending") result = result.filter((t) => !t.completed);
    // Search by title
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }
    // Sort
    if (sort === "dueDate") {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
    } else if (sort === "priority") {
      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    return result;
  }, [activeTasks, filter, search, sort]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 transition-colors">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Header darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />

        <TaskForm onAdd={addTask} />

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="active">Active ({activeTasks.length})</TabsTrigger>
            <TabsTrigger value="archived">Archived ({archivedTasks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              search={search}
              onSearchChange={setSearch}
              sort={sort}
              onSortChange={setSort}
              counts={counts}
            />
            <TaskList
              tasks={visibleTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
              onArchive={archiveTask}
            />
          </TabsContent>

          <TabsContent value="archived">
            <TaskList
              tasks={archivedTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
              onArchive={archiveTask}
              emptyMessage="No archived tasks yet. Archive completed tasks to keep your list clean."
            />
          </TabsContent>
        </Tabs>

        <footer className="text-center text-xs text-muted-foreground mt-10">
          Built with React + hooks · Tasks live in memory only
        </footer>
      </div>
    </div>
  );
}
