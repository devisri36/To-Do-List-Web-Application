import { useState } from "react";
import { Pencil, Trash2, Check, X, Archive, ArchiveRestore } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Priority, Task } from "./types";

// Single task card: view + inline edit, with toggle/archive/delete actions
interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onArchive: (id: string) => void;
}

// Visual style for each priority
const priorityStyles: Record<Priority, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-300 dark:border-red-800",
  medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800",
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
};

export function TaskItem({ task, onToggle, onDelete, onUpdate, onArchive }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  // Local copies of the fields while editing
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState<Priority>(task.priority);

  const saveEdit = () => {
    if (!title.trim()) return; // Don't allow empty title
    onUpdate(task.id, { title: title.trim(), description: description.trim(), dueDate, priority });
    setEditing(false);
  };

  const cancelEdit = () => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setEditing(false);
  };

  return (
    <Card
      className={`p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      {editing ? (
        // Edit mode
        <div className="space-y-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Description"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={saveEdit}>
              <Check className="h-4 w-4" /> Save
            </Button>
            <Button size="sm" variant="outline" onClick={cancelEdit}>
              <X className="h-4 w-4" /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        // View mode
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3
                className={`font-semibold ${
                  task.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.title}
              </h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${priorityStyles[task.priority]}`}
              >
                {task.priority.toUpperCase()}
              </span>
              {task.dueDate && (
                <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
              )}
            </div>
            {task.description && (
              <p className="text-sm text-muted-foreground break-words">{task.description}</p>
            )}
          </div>
          <div className="flex gap-1 shrink-0">
            <Button size="icon" variant="ghost" onClick={() => setEditing(true)} aria-label="Edit">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onArchive(task.id)}
              aria-label={task.archived ? "Unarchive" : "Archive"}
            >
              {task.archived ? (
                <ArchiveRestore className="h-4 w-4" />
              ) : (
                <Archive className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
