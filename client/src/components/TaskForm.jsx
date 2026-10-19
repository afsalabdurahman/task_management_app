import React, { useEffect, useMemo, useState } from "react";
import { formatDate } from "../util/formatDate";
import {taskFormApi, updateTaskApi} from "../api/taskApi";
import { socket } from "../services/socket";
import { toast } from "react-toastify";
import { validateFormData } from "../util/validationForms";

export const TaskForm = ({ isOpen, onClose ,data}) => {
    const minDate = useMemo(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split("T")[0];
  }, []);
  
  const [errors, seterrors] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
     e.preventDefault();
    const errors = validateFormData(formData);
    if (Object.keys(errors).length > 0 ) {
      seterrors(errors);
      return;
    }

    if(data)
{
    try {
    
   await updateTaskApi(formData, data._id);
  
   
  } catch (error) {
    toast.error("Error updating task.");
  }
}   else{
  try {
     await taskFormApi(formData, user?.id)
  } catch (error) {
    if (error) {
console.log(error.response,"Error creating task.apiiii");
    const validationErrors = JSON.parse(error.message);
    seterrors(validationErrors);
    return;
  }
    // toast.error("Error creating task.");
  }

}
    
    onClose(); // Close modal after submit
    
  };

  if (!isOpen) return null;

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        priority: data.priority.toLowerCase() || "medium",
        status: data.status.toLowerCase() === "in-progress" ? "in-progress" : "todo",
        dueDate: formatDate(data.dueDate) || "",
      });
    }
  }, [data]);



 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create Task</h2>

          <button
            onClick={onClose}
            className="text-xl text-slate-500 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="mb-1 block text-sm font-medium text-slate-700">
      Task Title
    </label>
    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      placeholder="Enter task title"
      className="w-full rounded-lg border px-3 py-2"
      required
    />
  </div>
<p className="text-red-500">{errors.title}</p>
  <div>
    <label className="mb-1 block text-sm font-medium text-slate-700">
      Description
    </label>
    <textarea
      name="description"
      rows={3}
      value={formData.description}
      onChange={handleChange}
      placeholder="Enter task description"
      className="w-full rounded-lg border px-3 py-2"
    />
  </div>
<p className="text-red-500">{errors.description}</p>

  <div className="grid grid-cols-2 gap-3">
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        Priority
      </label>
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full rounded-lg border px-3 py-2"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>

    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        Status
      </label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full rounded-lg border px-3 py-2"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  </div>

  <div>
    <label className="mb-1 block text-sm font-medium text-slate-700">
      Due Date
    </label>
     <input
      type="date"
      name="dueDate"
      value={formData.dueDate}
      onChange={handleChange}
      min={minDate}
      className="w-full rounded-lg border px-3 py-2"
    />
  </div>
<p className="text-red-500">{errors.dueDate}</p>
 <p className="text-red-500">{errors.apiError}</p>
  <div className="flex justify-end gap-3 pt-2">
    <button
      type="button"
      onClick={onClose}
      className="rounded-lg border px-4 py-2"
    >
      Cancel
    </button>

      <button
    type="submit"
    className="rounded-lg bg-slate-900 px-4 py-2 text-white"
  >
    {data ? "Update Task" : "Create Task"}
  </button>
  </div>
</form>
      </div>
    </div>
  );
};