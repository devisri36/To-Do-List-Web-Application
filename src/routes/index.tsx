import { createFileRoute } from "@tanstack/react-router";
import { App } from "@/components/todo/App";

export const Route = createFileRoute("/")({
  component: App,
});
