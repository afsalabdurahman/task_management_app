export interface TaskData {
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  userId: string;
}
