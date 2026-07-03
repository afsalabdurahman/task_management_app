import React, { useState } from 'react';
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

export const Chart = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const tasks = [
    { id: 1, title: "Design new landing page", status: "completed", priority: "high" },
    { id: 2, title: "Fix authentication bug", status: "inprogress", priority: "high" },
    { id: 3, title: "Write API documentation", status: "todo", priority: "medium" },
    { id: 4, title: "Setup CI/CD pipeline", status: "completed", priority: "high" },
    { id: 5, title: "User testing session", status: "inprogress", priority: "medium" },
    { id: 6, title: "Database optimization", status: "todo", priority: "low" },
    { id: 7, title: "Mobile responsiveness", status: "completed", priority: "medium" },
    { id: 8, title: "Analytics integration", status: "inprogress", priority: "high" },
  ];

  // Status Data (Front)
  const statusData = {
    labels: ['To Do', 'In Progress', 'Completed'],
    datasets: [{
      data: [
        tasks.filter(t => t.status === 'todo').length,
        tasks.filter(t => t.status === 'inprogress').length,
        tasks.filter(t => t.status === 'completed').length,
      ],
      backgroundColor: ['#eab308', '#3b82f6', '#22c55e'],
      borderWidth: 0,
    }],
  };

  // Priority Data (Back)
  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Tasks',
      data: [
        tasks.filter(t => t.priority === 'high').length,
        tasks.filter(t => t.priority === 'medium').length,
        tasks.filter(t => t.priority === 'low').length,
      ],
      backgroundColor: ['#ef4444', '#eab308', '#22c55e'],
      borderRadius: 6,
    }],
  };

  const flipCard = () => setIsFlipped(!isFlipped);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Project Overview</h1>
          <p className="text-zinc-400">Click button or card to flip • 3D Animation</p>
        </div>

        {/* 3D Flip Card Container */}
        <div 
          className="relative mx-auto"
          style={{ width: '520px', height: '460px', perspective: '1200px' }}
          onClick={flipCard}
        >
          <div 
            className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer rounded-3xl shadow-2xl ${isFlipped ? 'rotate-y-180' : ''}`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            
            {/* FRONT SIDE - Status Chart */}
            <div className="absolute inset-0 bg-zinc-900 rounded-3xl border border-zinc-700 overflow-hidden backface-hidden">
              <div className="p-6 border-b border-zinc-800">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  📊 Task Status
                </h2>
                <p className="text-zinc-400 text-sm mt-1">Distribution Overview</p>
              </div>

              <div className="p-8 pt-4">
                <div className="h-72">
                  <Pie 
                    data={statusData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: { color: '#d1d5db', font: { size: 14 }, padding: 25 }
                        }
                      }
                    }} 
                  />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 text-xs text-emerald-400 font-medium">
                {tasks.filter(t => t.status === 'completed').length} Completed • Click to Flip
              </div>
            </div>

            {/* BACK SIDE - Priority Chart */}
            <div className="absolute inset-0 bg-zinc-900 rounded-3xl border border-zinc-700 overflow-hidden backface-hidden rotate-y-180">
              <div className="p-6 border-b border-zinc-800">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  🔥 Priority Breakdown
                </h2>
                <p className="text-zinc-400 text-sm mt-1">High • Medium • Low</p>
              </div>

              <div className="p-8 pt-4">
                <div className="h-72">
                  <Bar 
                    data={priorityData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { grid: { color: '#27272a' }, ticks: { color: '#9ca3af' } },
                        x: { grid: { color: '#27272a' }, ticks: { color: '#9ca3af' } },
                      }
                    }} 
                  />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 text-xs text-rose-400 font-medium">
                {tasks.filter(t => t.priority === 'high').length} High Priority Tasks
              </div>
            </div>
          </div>
        </div>

        {/* Flip Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={flipCard}
            className="px-8 py-4 bg-white text-black font-semibold rounded-2xl flex items-center gap-3 hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/10"
          >
            <span>{isFlipped ? 'Show Status Chart' : 'Show Priority Chart'}</span>
            <span className="text-xl">↻</span>
          </button>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-6">
          Total Tasks: <span className="text-white font-medium">{tasks.length}</span>
        </p>
      </div>
    </div>
  );
};

