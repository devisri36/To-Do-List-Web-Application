import { TaskItem } from "./TaskItem";
import type { Task } from "./types";

// Renders a list of tasks (active or archived)
interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onArchive: (id: string) => void;
  emptyMessage?: string;
}

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  onUpdate,
  onArchive,
  emptyMessage = "No tasks yet. Add one above to get started!",
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
        {emptyMessage}
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}
