import { Filter } from "lucide-react";

export const TaskFilters = ({
  priority,
  setPriority,
  status,
  setStatus,
}) => {


  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        <Filter size={18} />
        <span className="font-medium">Filters</span>
      </div>

      {/* Priority */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
      >
        <option value="All">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
      >
        <option value="All">All Status</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}