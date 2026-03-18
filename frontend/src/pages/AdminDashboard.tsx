import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

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
        ]
      }
    ]
  }

  return(

    <>
      <Navbar/>

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* Navigation Buttons */}

        <div className="flex gap-4 mb-8">

          <Link
            to="/admin/books"
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Manage Books
          </Link>

          <Link
            to="/admin/requests"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View Requests
          </Link>

          <Link
            to="/admin/overdue"
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Overdue Books
          </Link>

        </div>

        {/* Stats Cards */}

        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-blue-500 text-white p-4 rounded">
            <h2>Total Books</h2>
            <p className="text-2xl font-bold">
              {stats.totalBooks}
            </p>
          </div>

          <div className="bg-green-500 text-white p-4 rounded">
            <h2>Users</h2>
            <p className="text-2xl font-bold">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded">
            <h2>Active Borrows</h2>
            <p className="text-2xl font-bold">
              {stats.activeBorrows}
            </p>
          </div>

          <div className="bg-red-500 text-white p-4 rounded">
            <h2>Overdue</h2>
            <p className="text-2xl font-bold">
              {stats.overdueBooks}
            </p>
          </div>

        </div>

        {/* Graph */}

        <div className="bg-white p-6 rounded shadow">
          <Bar data={data}/>
        </div>

      </div>

    </>

  )

}

export default AdminDashboard;