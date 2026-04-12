import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard(){

  const [stats,setStats] = useState<any>(null);

  useEffect(()=>{
    fetchStats();

    const handleFocus = () => fetchStats();
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  },[])

  const fetchStats = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/requests/admin/stats",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setStats(res.data);

  }

  if(!stats) return <p className="p-6">Loading...</p>

  const data = {
    labels:["Books","Users","Active Borrows","Overdue"],
    datasets:[
      {
        label:"Library Stats",
        data:[
          stats.totalBooks,
          stats.totalUsers,
          stats.activeBorrows,
          stats.overdueBooks
        ],
        backgroundColor:[
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444"
        ],
        borderRadius: 12,
        barThickness: 28
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "#94a3b8" }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: { color: "#64748b" },
        grid: { color: "rgba(148,163,184,0.15)" }
      },
      y: {
        ticks: { color: "#64748b" },
        grid: { color: "rgba(148,163,184,0.15)" }
      }
    }
  }

  const fade = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return(

    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_30%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#f8fbff_0%,#e5ecf5_55%,#f8fbff_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#07111f_55%,#020617_100%)]" />
      <Navbar/>

      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] items-end">
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-slate-100">
              Admin Dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
              Monitor requests, manage inventory, and see your library analytics with a modern dashboard layout.
            </p>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/admin/books" className="rounded-3xl bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-3 text-white shadow-lg shadow-violet-500/20 transition hover:from-purple-700 hover:to-violet-700">Manage Books</Link>
            <Link to="/admin/requests" className="rounded-3xl bg-slate-900 text-white px-5 py-3 shadow-lg shadow-slate-900/10 transition hover:bg-slate-800">View Requests</Link>
            <Link to="/admin/overdue" className="rounded-3xl bg-red-600 text-white px-5 py-3 shadow-lg shadow-red-500/20 transition hover:bg-red-700">Overdue Books</Link>
          </motion.div>
        </div>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-10"
        >
          <div className="rounded-[32px] bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 p-6 text-white shadow-2xl border border-white/10">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-100/80">Total Books</p>
            <p className="mt-4 text-3xl font-semibold">{stats.totalBooks}</p>
          </div>
          <div className="rounded-[32px] bg-emerald-600 p-6 text-white shadow-2xl border border-white/10">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-100/80">Users</p>
            <p className="mt-4 text-3xl font-semibold">{stats.totalUsers}</p>
          </div>
          <div className="rounded-[32px] bg-amber-500 p-6 text-white shadow-2xl border border-white/10">
            <p className="text-sm uppercase tracking-[0.24em] text-amber-100/85">Active Borrows</p>
            <p className="mt-4 text-3xl font-semibold">{stats.activeBorrows}</p>
          </div>
          <div className="rounded-[32px] bg-red-500 p-6 text-white shadow-2xl border border-white/10">
            <p className="text-sm uppercase tracking-[0.24em] text-red-100/85">Overdue</p>
            <p className="mt-4 text-3xl font-semibold">{stats.overdueBooks}</p>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-hidden rounded-[32px] border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Library Insights</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">A quick view of books, users, borrows, and overdue counts.</p>
              </div>
            </div>
            <div className="h-[360px]">
              <Bar data={data} options={options} />
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-[32px] border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Quick Actions</h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300">Use these shortcuts to manage your library workflows faster.</p>
              <div className="mt-6 grid gap-3">
                <Link to="/admin/books" className="block rounded-3xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900">View and edit books</Link>
                <Link to="/admin/requests" className="block rounded-3xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900">Review pending requests</Link>
                <Link to="/admin/overdue" className="block rounded-3xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-slate-900 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900">Check overdue books</Link>
              </div>
            </motion.div>

            <motion.div
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-[32px] bg-gradient-to-br from-violet-500 to-fuchsia-500 p-6 text-white shadow-2xl border border-white/10"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-white/80">Admin tip</p>
              <p className="mt-4 text-lg font-semibold">Keep overdue requests visible to improve turnaround and reduce borrower follow-ups.</p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default AdminDashboard;