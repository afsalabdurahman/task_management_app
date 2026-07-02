import React, { useState } from "react";
import { TaskForm } from "./TaskForm";

export const AddTask = () => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    conso
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setShowModal(false);
  };

  return (
    <div className="p-6">
      {/* Open Modal Button */}
     
<div className="group flex min-h-[280px] cursor-pointer items-center justify-center rounded-3xl bg-black transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900">

  <div className="flex flex-col items-center gap-4">

    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 transition-all group-hover:bg-white/20">

      <span className="text-5xl font-light text-white" onClick={() => setShowModal(true)}>
        +
      </span>

    </div>



    <h3 className="text-xl font-semibold text-white">

      Create Task

    </h3>



    <p className="max-w-[220px] text-center text-sm text-slate-400">

      Add a new task and start tracking your work.

    </p>

  </div>

</div>


      {/* Modal */}
      {showModal && (
      <TaskForm isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}