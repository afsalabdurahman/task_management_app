import {
  Calendar,
  ClipboardList,
  MoreVertical,
  Pencil,
  Trash2,
  Clock,
  LogOut,
  ArrowRightLeft,
  MoreVerticalIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddTask } from "../components/AddTask";
import { TaskFilters } from "../components/Filters";
import { useEffect, useState ,useRef, useCallback} from "react";
import { TaskForm } from "../components/TaskForm";
import { socket } from "../services/socket";
import { deleteTaskApi, fetchUserData } from "../api/taskApi";
import { toast } from "react-toastify";
import { formatDate } from "../util/formatDate";
import ShapeGrid from '../components/reusable/DashBackground';
import { logout } from "../api/authApi";
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const Dashboard = () => {
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [deletedTaskId, setDeletedTaskId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [count,setCount]=useState()
const [page, setPage] = useState(1);
const [cursor, setCursor] = useState(null);
const [loading, setLoading] = useState(false);
const observer = useRef();
const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high": return "bg-red-500/10 text-red-400 border border-red-500/30";
      case "medium": return "bg-amber-500/10 text-amber-400 border border-amber-500/30";
      default: return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed": return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
      case "in-progress": return "bg-blue-500/10 text-blue-400 border border-blue-500/30";
      default: return "bg-slate-500/10 text-slate-400 border border-slate-500/30";
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = (task) => {
    
    setDeletedTaskId(task._id);
    setShowDeleteModal(true);
  };

  const flipCard = () => setIsFlipped(!isFlipped);

  // Fetch user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if(!user && !savedUser) {
      navigate("/login");
    }
    if (savedUser) setUser(JSON.parse(savedUser));
    socket.connect();

  socket.on("connect", () => {
    console.log("Connected", socket.id);
  });

  

  return () => {
    socket.off("connect");
    
  };
  }, []);

// scroll
const lastTaskRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchTasks(true); // Load more
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

// 


const fetchTasks = async (isLoadMore = false) => {
    if (!user?.id) return;

    setLoading(true);

    try {
      const fetched = await fetchUserData(user.id, priority, status, isLoadMore ? cursor : null);

setCount(fetched?.counts)
      if (isLoadMore) {
        setTasks(prev => [...prev, ...fetched.tasks]);
      } else {
        setTasks(fetched.tasks || []);
      }

      setCursor(fetched.nextCursor || null);
      setHasMore(fetched.hasMore ?? true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Fetch tasks
useEffect(() => {
    if (!user?.id) return;

    setTasks([]);
    setCursor(null);
    setHasMore(true);
    fetchTasks(false);
    
  }, [priority, status, user?.id]);

  // Socket listeners
  useEffect(() => {
    socket.on("taskCreated", (newTask) => {
       setCount((prev) => ({
      ...prev,
      total: prev.total + 1,
      high: newTask.priority === "high" ? prev.high + 1 : prev.high,
      inprogress:
        newTask.status === "in-progress"
          ? prev.inprogress + 1
          : prev.inprogress,
      completed:
        newTask.status === "completed"
          ? prev.completed + 1
          : prev.completed,
    }));

    setTasks((prev) =>
      prev.some((task) => task._id === newTask._id)
        ? prev
        : [newTask, ...prev]
    );


      setTasks((prev) => prev.some((t) => t._id === newTask._id) ? prev : [newTask, ...prev]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prev) => prev.map((task) => task._id === updatedTask._id ? updatedTask : task));
    });

    socket.on("taskDeleted", (id) => {
 setTasks((prevTasks) => {
    const taskToDelete = prevTasks.find((task) => task._id === id);

    if (!taskToDelete) {
      console.warn("Task not found:", id);
      return prevTasks;
    }

    // Safely update count - never go below 0
    setCount((prevCount) => ({
      ...prevCount,
      total: Math.max(0, prevCount.total - 1),
      high: Math.max(0, taskToDelete.priority === "high" ? prevCount.high - 1 : prevCount.high),
      inprogress: Math.max(
        0,
        taskToDelete.status === "in-progress" ? prevCount.inprogress - 1 : prevCount.inprogress
      ),
      completed: Math.max(
        0,
        taskToDelete.status === "completed" ? prevCount.completed - 1 : prevCount.completed
      ),
    }));

    // Remove the task
    return prevTasks.filter((task) => task._id !== id);
  });

    //  setTasks((prev) => prev.filter((task) => task._id !== id));
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
    console.log("socket inial")
  }, []);
useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
   
  }, []);
  const handleLogout = async () => {
    localStorage.removeItem("user");
    socket.disconnect();
    toast.success("Logged out successfully");
    await logout();
    navigate("/login");
  };

  // Chart Data
  const statusData = {
    labels: ['To Do', 'In Progress', 'Completed'],
    datasets: [{
      data: [
        tasks.filter(t => !t.status || t.status.toLowerCase() === 'todo').length,
        tasks.filter(t => t.status?.toLowerCase() === 'in-progress').length,
        tasks.filter(t => t.status?.toLowerCase() === 'completed').length,
      ],
      backgroundColor: ['#eab308', '#3b82f6', '#22c55e'],
      borderWidth: 2,
      borderColor: '#0f172a'
    }]
  };

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Tasks',
      data: [
        tasks.filter(t => t.priority?.toLowerCase() === 'high').length,
        tasks.filter(t => t.priority?.toLowerCase() === 'medium').length,
        tasks.filter(t => t.priority?.toLowerCase() === 'low').length,
      ],
      backgroundColor: ['#ef4444', '#eab308', '#22c55e'],
      borderRadius: 8,
    }]
  };


if(!user) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <p className="text-white text-lg">Loading user data...</p>
    </div>
  );
}
//   if (loading) {
//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//       <div className="flex flex-col items-center gap-4">
//         {/* Spinner */}
//         <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        
//         {/* Loading Text */}
//         <p className="text-white text-xl font-medium tracking-wide">
//           Loading...
//         </p>
//       </div>
//     </div>
//   );
// }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-auto">
      <div className="fixed inset-0 -z-10 opacity-40">
        <ShapeGrid speed={0.6} squareSize={42} borderColor="#4f46e5" hoverColor="#6366f1" hoverFillColor="#312e81" shape="square" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-white">Dashboard</h1>
              <p className="mt-1 text-slate-400">Stay organized. Get things done.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 ">
            <TaskFilters priority={priority} setPriority={setPriority} status={status} setStatus={setStatus} />

            <button
              onClick={flipCard}
              className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg shadow-white/10 transition-all duration-300 hover:scale-105 hover:bg-slate-100 active:scale-95"
            >
              <span>{isFlipped ? "Back to Dashboard" : "Flip to Analytics"}</span>
              <ArrowRightLeft size={18} className="transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* User Info & Logout */}
            <div className="flex items-center gap-2 rounded-3xl bg-white/5 px-4 py-2 backdrop-blur-lg border border-white/10">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="hidden sm:block pr-3">
                <p className="text-sm font-medium text-white">{user?.name || "Guest"}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-red-500/10 hover:text-red-400 px-4 py-2 text-sm font-medium text-slate-300 transition-all">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400">TOTAL TASKS</p>
            <p className="mt-2 text-4xl font-semibold text-white">{count?.total}</p>
          </div>
          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400">COMPLETED</p>
            <p className="mt-2 text-4xl font-semibold text-emerald-400">
              {count?.completed}
            </p>
          </div>
          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400">IN PROGRESS</p>
            <p className="mt-2 text-4xl font-semibold text-blue-400">
              {count?.inprogress}
            </p>
          </div>
          <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">
            <p className="text-xs text-slate-400">HIGH PRIORITY</p>
            <p className="mt-2 text-4xl font-semibold text-red-400">
             {count?.high}
            </p>
          </div>
        </div>

        {/* Main Content with 3D Flip Card */}
       {loading?(<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        
        {/* Loading Text */}
        <p className="text-white text-xl font-medium tracking-wide">
          Loading...
        </p>
      </div>
    </div>):( <div className="relative" style={{ perspective: '1500px' }}>
          <div 
            className={`relative transition-transform duration-700 ease-out`}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* FRONT SIDE - Task List */}
            <div className="backface-hidden">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AddTask />
                {tasks.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                      <ClipboardList className="h-10 w-10 text-slate-500" />
                    </div>
                    <p className="text-xl font-medium text-slate-300">No tasks yet</p>
                    <p className="mt-2 text-slate-500">Create your first task to get started</p>
                  </div>
                ) : (
                  tasks.map((task,index) => (
                    <div key={task._id} ref={index===tasks.length-1?lastTaskRef:null} className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-indigo-500/30">
                            <div className={`absolute -right-1 -top-1 rounded-bl-3xl rounded-tr-3xl px-4 py-1 text-xs font-semibold uppercase tracking-wider ${getPriorityStyle(task.priority)}`}>
                  {task.priority}
                </div>
                              <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
     <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10">
         <ClipboardList className="h-6 w-6 text-indigo-400" />
     </div>
                   <div>
                      <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-white pr-8">
                        {task.title}
                      </h3>
                    </div>

                                    </div>
                                     <button
                    onClick={() => handleEdit(task)}
                    className="opacity-40 group-hover:opacity-100 transition-all p-2 hover:bg-white/10 rounded-xl"
                  >
                    <MoreVerticalIcon size={18} className="text-slate-400" />
                  </button>
                                </div>
                                         <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-slate-400">
                  {task.description}
                </p>
                               <div className="mt-6 flex items-center justify-between">
                                      <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar size={15} />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                           <div className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(task.status)}`}>
                    {task.status ? task.status.replace("-", " ") : "Todo"}
                  </div>
                               </div>
                                      <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(task)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(task)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 py-3 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-all active:scale-95"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
                                      
                               
                    </div>
                    
                  ))
                )}
              </div>
            </div>
            {loading && (
          <div className="col-span-full py-10 text-center text-slate-400">
            Loading more tasks...
          </div>
        )}
{!hasMore && (
  <div className="w-full flex justify-center py-8">
    <span className="text-white text-lg font-semibold">
      You've reached the end.
    </span>
  </div>
)}
            {/* BACK SIDE - Charts (3D Flip) */}
            <div className="absolute inset-0 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
              <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 min-h-[700px]">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-white">Analytics</h2>
                    <p className="text-slate-400">Task insights and productivity overview</p>
                  </div>
                  <button onClick={flipCard} className="text-slate-400 hover:text-white transition">
                    ← Back
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Status Pie Chart */}
                  <div className="bg-zinc-900/50 rounded-3xl p-6 border border-white/10">
                    <h3 className="text-lg font-medium mb-6 text-white">Task Status</h3>
                    <div className="h-80">
                      <Pie data={statusData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>

                  {/* Priority Bar Chart */}
                  <div className="bg-zinc-900/50 rounded-3xl p-6 border border-white/10">
                    <h3 className="text-lg font-medium mb-6 text-white">Priority Breakdown</h3>
                    <div className="h-80">
                      <Bar data={priorityData} options={{ 
                        responsive: true, 
                        maintainAspectRatio: false,
                        scales: { y: { grid: { color: '#334155' } } }
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      </div>

      {/* Modals */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-white/10 p-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center">
                <Trash2 className="h-8 w-8 text-red-400" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-white">Delete Task?</h2>
              <p className="mt-3 text-slate-400">
                This action cannot be undone. The task will be permanently removed.
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-2xl border border-white/10 py-3.5 text-sm font-medium text-white hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteTaskApi(deletedTaskId);
                 
                  setShowDeleteModal(false);
                }}
                className="flex-1 rounded-2xl bg-red-600 py-3.5 text-sm font-medium text-white hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && <TaskForm isOpen={showModal} onClose={() => { setShowModal(false); setSelectedTask(null); }} data={selectedTask} />}
    </div>
  );
};