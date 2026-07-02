export const validateSignupForm = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "Full name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password =
      "Password must be at least 6 characters";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword =
      "Confirm password is required";
  } else if (
    data.password !== data.confirmPassword
  ) {
    errors.confirmPassword =
      "Passwords do not match";
  }

  return errors;
};

export const validateFormData = (data) => {
  const errors = {};

  if (!data.title.trim()) {
    errors.title = "Task title is required";
  }

  if (!data.description.trim()) {
    errors.description = "Task description is required";
  }

  if (!data.dueDate) {
    errors.dueDate = "Due date is required";
  }

  return errors;
};