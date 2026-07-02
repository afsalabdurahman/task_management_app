import {
  Calendar,
  ClipboardList,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { AddTask } from "../components/AddTask";
import { TaskFilters } from "../components/Filters";
import { useEffect, useState } from "react";
import { TaskForm } from "../components/TaskForm";
import { socket } from "../services/socket";
import { deleteTaskApi, fetchUserData } from "../api/taskApi";
import { toast } from "react-toastify";
import { formatDate } from "../util/formatDate";
export const Dashboard = () => {
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [deletedTaskId, setDeletedTaskId] = useState(null);
  const[showDeleteModal,setShowDeleteModal]=useState(false)
  // const tasks = [
  //   {
  //     id: 1,
  //     title: "Build User Authentication Flow",
  //     description:
  //       "Implement a complete user authentication system using JWT. This includes user registration, email verification, login, logout, password reset, and protected routes. Ensure passwords are encrypted using bcrypt before storing in the database.",
  //     priority: "High",
  //     status: "In Progress",
  //     dueDate: "28 Jun 2026",
  //   },
  //   {
  //     id: 2,
  //     title: "Create Admin Dashboard",
  //     description:
  //       "Build analytics dashboard with charts, reports, sales statistics, and performance metrics for administrators.",
  //     priority: "Medium",
  //     status: "Todo",
  //     dueDate: "30 Jun 2026",
  //   },
  //   {
  //     id: 3,
  //     title: "Implement Socket.IO",
  //     description:
  //       "Add real-time updates for task creation, updates, notifications, and activity logs.",
  //     priority: "High",
  //     status: "Completed",
  //     dueDate: "25 Jun 2026",
  //   },
  //   {
  //     id: 4,
  //     title: "Responsive Design",
  //     description:
  //       "Ensure application works perfectly across desktop, tablet, and mobile devices.",
  //     priority: "Low",
  //     status: "Todo",
  //     dueDate: "05 Jul 2026",
  //   },
  //   {
  //     id: 5,
  //     title: "Task Statistics",
  //     description:
  //       "Display completed tasks, pending tasks, overdue tasks, and charts.",
  //     priority: "Medium",
  //     status: "In Progress",
  //     dueDate: "10 Jul 2026",
  //   },
  //   {
  //     id: 6,
  //     title: "JWT Authentication",
  //     description:
  //       "Secure all protected routes and implement access token validation.",
  //     priority: "High",
  //     status: "Todo",
  //     dueDate: "15 Jul 2026",
  //   },
  // ];

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-600";
      case "medium":
        return "bg-amber-50 text-amber-600";
      default:
        return "bg-green-50 text-green-600";
    }
  };

  const getStatusStyle = (status) => {
    console.log(status,"status")
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-600";
      case "in-progress":
        return "bg-blue-50 text-blue-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };
const handleEdit = (task) => {
  console.log("Edit task:", task);
  setSelectedTask(task);
  setShowModal(true);

}

useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) setUser(JSON.parse(savedUser));
}, []);

useEffect(() => {
 
 async function Fetchtask(user){
  const task=await fetchUserData(localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).id:user?.id,priority,status);
  setTasks(task)
  console.log(task,"TASK)))")
 } 
 
 Fetchtask(user)

 
 console.log("calling444","user")
}, [status, priority,user]);
console.log(user,"user")
// useEffect(()=>{
//   console.log("soket active")
// socket.on("taskCreated", (newTask) => {
//   setTasks((prev) => {
//     const exists = prev.some((task) => task._id === newTask._id);

//     if (exists) return prev;

//     return [newTask, ...prev];
//   });
// });
//   return () => {
//     socket.off("taskCreated", ()=>{});
//   };
// },[socket])

// useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) setUser(JSON.parse(savedUser));
//   }, []);

  // Socket listeners

useEffect(() => {
      socket.on("taskCreated", (newTask) => {
        console.log("New task received via socket:", newTask);
        setTasks((prev) => {
          const exists = prev.some((task) => task._id === newTask._id);
  
          if (exists) return prev;
  
          return [newTask, ...prev];
        });
      });
      socket.on("taskUpdated", (updatedTask) => {
        console.log("Task updated via socket:", updatedTask);
        setTasks((prev) =>
          prev.map((task) =>{
            console.log("Mapping task:", task, "Updated task:", updatedTask);
            return task._id === updatedTask._id ? updatedTask : task
          }
            
          )
        );
      });
      socket.on("taskDeleted", (deletedTaskId) => {
        console.log("Task deleted via socket:", deletedTaskId);
        setTasks((prev) => prev.filter((task) => task._id !== deletedTaskId));
      });

},[])

const handleDelete = async(task) => {
  setDeletedTaskId(task._id);
  setShowDeleteModal(true);
}
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      {/* Header */}
 <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
  {/* Left Side */}
  <div>
    <h1 className="text-3xl font-bold text-slate-900">
      Task Management
    </h1>
    <p className="mt-1 text-slate-500">
      Manage and track your tasks efficiently
    </p>
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-4">
    <TaskFilters
      priority={priority}
      setPriority={setPriority}
      status={status}
      setStatus={setStatus}
    />

    {/* User Profile */}
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
      </div>

      <div className="hidden sm:block">
        <p className="text-sm font-medium text-slate-700">
          {user?.name || "Afsal"}
        </p>
        <p className="text-xs text-slate-500">
          {user?.email || "afsal@example.com"}
        </p>
      </div>
    </div>
  </div>
</div>
      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <AddTask/>
    {tasks.length==0?(<div className="col-span-full text-center text-slate-500">
      No tasks available. Click "Add Task" to create one.
    </div>):(  <>  {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                  <ClipboardList
                    size={24}
                    className="text-indigo-600"
                  />
                </div>

                <div>
                  <h2 className="line-clamp-2 text-lg font-semibold text-slate-900">
                    {task.title}
                  </h2>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${getPriorityStyle(
                      task.priority
                    )}`}
                  >
                    ↑ {task.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <button onClick={() => handleEdit(task)}>
                <MoreVertical
                  size={18}
                  className="text-slate-500"
                />
              </button>
            </div>

            {/* Description */}
            <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600">
              {task.description}
            </p>

            {/* Due Date */}
            <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
              <Calendar size={16} />
              <span>{formatDate(task.dueDate)}</span>
            </div>

            {/* Status */}
            <div className="mt-4">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                  task.status
                )}`}
              >
                {task.status?task.status.charAt(0).toUpperCase() + task.status.slice(1):"Todo"}
              </span>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-slate-100"></div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(task)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(task)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}</>)}
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteTaskApi(deletedTaskId);
                  setShowDeleteModal(false);
                }}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
       {showModal && (
            <TaskForm isOpen={showModal} onClose={() => setShowModal(false)} data={selectedTask}/>
            )}
    </div>
  );
}