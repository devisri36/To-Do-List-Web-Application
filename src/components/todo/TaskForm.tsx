import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Priority, Task } from "./types";

// Form to add new tasks. Validates title is not empty.
interface TaskFormProps {
  onAdd: (task: Omit<Task, "id" | "completed" | "archived">) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  // Local state for each form field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation: prevent empty titles
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    setError("");
    onAdd({ title: title.trim(), description: description.trim(), dueDate, priority });
    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <Card className="p-5 mb-6 transition-shadow hover:shadow-md">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            placeholder="Task title *"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            className={error ? "border-destructive" : ""}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      </form>
    </Card>
  );
}
