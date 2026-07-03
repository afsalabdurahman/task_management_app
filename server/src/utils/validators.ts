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

export const validateUser = (data: { name: string; email: string; password: string }) => {
  const errors: Record<string, string> = {};

  // Name
  if (!data.name?.trim()) {
    errors.name = "Name is required.";
  } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
    errors.name = "Name can only contain letters and spaces.";
  } else if (data.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  } else if (data.name.trim().length > 30) {
    errors.name = "Name cannot exceed 30 characters.";
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Email is invalid.";
  }

  // Password
  if (!data.password?.trim()) {
    errors.password = "Password is required.";
  } else if (!/[A-Z]/.test(data.password)) {
    errors.password = "Password must contain at least one uppercase letter.";
  } else if (!/[a-z]/.test(data.password)) {
    errors.password = "Password must contain at least one lowercase letter.";
  } else if (!/[0-9]/.test(data.password)) {
    errors.password = "Password must contain at least one number.";
  } else if (data.password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters.";
  } else if (data.password.trim().length > 20) {
    errors.password = "Password cannot exceed 20 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};