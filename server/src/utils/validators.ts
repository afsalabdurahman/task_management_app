import { TaskData } from "../dtos/task.response.dto";
export const validateTask = (data: TaskData) => {
  const errors: Record<string, string> = {};

  // Title
  if (!data.title?.trim()) {
    errors.title = "Title is required.";
  } else if (data.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters.";
  } else if (data.title.trim().length > 15) {
    errors.title = "Title cannot exceed 15 characters.";
  }

  // Description
  if (!data.description?.trim()) {
    errors.description = "Description is required.";
  } else if (data.description.trim().length < 5) {
    errors.description = "Description must be at least 5 characters.";
  } else if (data.description.trim().length > 50) {
    errors.description = "Description cannot exceed 50 characters.";
  }

  // Due Date
  if (!data.dueDate) {
    errors.dueDate = "Due date is required.";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(data.dueDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.dueDate = "Due date cannot be in the past.";
    }
  }

  // Priority
  const validPriorities = ["high", "medium", "low"];
  if (!validPriorities.includes(data.priority)) {
    errors.priority = "Priority is invalid.";
  }

  // Status
  const validStatuses = ["todo", "in-progress", "completed"];
  if (!validStatuses.includes(data.status)) {
    errors.status = "Status is invalid.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};