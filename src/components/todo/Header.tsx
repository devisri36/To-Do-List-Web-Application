import { Moon, Sun, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";

// Header: app title + dark/light mode toggle
interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

export function Header({ darkMode, onToggleDark }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary text-primary-foreground">
          <ListChecks className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasker</h1>
          <p className="text-sm text-muted-foreground">Stay organized, stay productive</p>
        </div>
      </div>
      <Button variant="outline" size="icon" onClick={onToggleDark} aria-label="Toggle theme">
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </header>
  );
}
