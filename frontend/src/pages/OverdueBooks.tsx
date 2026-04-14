import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function OverdueBooks(){

  const [records,setRecords] = useState<any[]>([]);

  useEffect(()=>{
    fetchOverdue();
  },[])

  const fetchOverdue = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/requests/overdue",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setRecords(res.data);

  }

  const fade = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return(
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_30%)]" />
      <Navbar/>

      <div className="mx-auto max-w-7xl px-6 py-10">

        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="rounded-[2rem] border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Overdue management</p>
                <h1 className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-5xl">Overdue Books</h1>
                <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                  Monitor books that are past their due date and keep borrower follow-up moving smoothly.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-3xl bg-gradient-to-br from-red-500 to-orange-500 p-5 text-white shadow-xl shadow-red-500/20">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/80">Overdue count</p>
                  <p className="mt-4 text-3xl font-semibold">{records.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-xl shadow-slate-900/20">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-300/80">Oldest overdue</p>
                  <p className="mt-4 text-3xl font-semibold text-white">
                    {records.length > 0 ? new Date(records[0].dueDate).toLocaleDateString() : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 xl:grid-cols-2"
        >
          {records.map((r)=>(
            <motion.article
              key={r.id}
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="overflow-hidden rounded-[2rem] border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 shadow-[0_25px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-3xl text-red-600 dark:bg-red-500/15 dark:text-red-300">
                  ⚠️
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{r.book.title}</h2>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{r.book.author}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-red-200/80 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-700 dark:border-red-700/80 dark:bg-red-500/15 dark:text-red-200">
                      Overdue
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 rounded-[1.5rem] bg-slate-50/80 p-4 text-sm text-slate-600 dark:bg-slate-950/80 dark:text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Borrower</span>
                      <span>{r.user.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Due date</span>
                      <span>{new Date(r.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Book ISBN</span>
                      <span>{r.book.isbn}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {records.length === 0 && (
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-10 rounded-[2rem] border border-dashed border-slate-300/60 bg-white/80 p-10 text-center text-slate-700 shadow-xl shadow-slate-900/10 dark:border-slate-700/60 dark:bg-slate-900/80 dark:text-slate-300"
          >
            <p className="text-2xl font-semibold">No overdue books found</p>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Everything is up to date for now. Check back later for new overdue items.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )

}

export default OverdueBooks;
