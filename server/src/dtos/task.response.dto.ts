import mongoose from "mongoose";

export interface TaskData {
  title: string;
  description: string;
  dueDate: string|Date;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  userId: string| mongoose.Types.ObjectId;
  _id?: string| mongoose.Types.ObjectId|null;
}
