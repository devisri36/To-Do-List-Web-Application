import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterType, SortType } from "./types";

// Search + filter + sort controls
interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  search: string;
  onSearchChange: (s: string) => void;
  sort: SortType;
  onSortChange: (s: SortType) => void;
  counts: { all: number; completed: number; pending: number };
}

export function FilterBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
  counts,
}: FilterBarProps) {
  const filters: { value: FilterType; label: string; count: number }[] = [
    { value: "all", label: "All", count: counts.all },
    { value: "pending", label: "Pending", count: counts.pending },
    { value: "completed", label: "Completed", count: counts.completed },
  ];

  return (
    <div className="space-y-3 mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks by title..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1">
          {filters.map((f) => (
            <Button
              key={f.value}
              size="sm"
              variant={filter === f.value ? "default" : "outline"}
              onClick={() => onFilterChange(f.value)}
              className="transition-all"
            >
              {f.label} ({f.count})
            </Button>
          ))}
        </div>
        <div className="ml-auto">
          <Select value={sort} onValueChange={(v) => onSortChange(v as SortType)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sort: Default</SelectItem>
              <SelectItem value="dueDate">Sort: Due Date</SelectItem>
              <SelectItem value="priority">Sort: Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
