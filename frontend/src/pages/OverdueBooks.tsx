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

  const getDaysOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getOverdueSeverity = (days: number) => {
    if (days <= 7) return { color: 'amber', bg: 'amber-50', text: 'amber-700', border: 'amber-200' };
    if (days <= 30) return { color: 'orange', bg: 'orange-50', text: 'orange-700', border: 'orange-200' };
    return { color: 'red', bg: 'red-50', text: 'red-700', border: 'red-200' };
  };

  const fade = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const totalOverdue = records.length;
  const criticalOverdue = records.filter(r => getDaysOverdue(r.dueDate) > 30).length;
  const oldestOverdue = records.length > 0 ? Math.max(...records.map(r => getDaysOverdue(r.dueDate))) : 0;

  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.1),_transparent_40%),radial-gradient(circle_at_center,_rgba(239,68,68,0.05),_transparent_60%)]" />
      <Navbar/>

      <div className="mx-auto max-w-7xl px-6 py-10">

        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="rounded-[2rem] border border-slate-200/70 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Overdue management</p>
                <h1 className="mt-4 text-4xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-5xl">Overdue Books</h1>
                <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                  Monitor books that are past their due date and keep borrower follow-up moving smoothly.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 p-6 text-white shadow-xl shadow-red-500/25">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/80">Total Overdue</p>
                  <p className="mt-4 text-3xl font-bold">{totalOverdue}</p>
                  <p className="mt-1 text-sm text-white/70">books</p>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white shadow-xl shadow-orange-500/25">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/80">Critical Overdue</p>
                  <p className="mt-4 text-3xl font-bold">{criticalOverdue}</p>
                  <p className="mt-1 text-sm text-white/70">&gt;30 days</p>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-slate-700 to-slate-900 p-6 text-white shadow-xl shadow-slate-900/25">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/80">Max Days Overdue</p>
                  <p className="mt-4 text-3xl font-bold">{oldestOverdue}</p>
                  <p className="mt-1 text-sm text-white/70">days</p>
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
              className="group overflow-hidden rounded-[2rem] border border-slate-200/70 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-6 shadow-[0_25px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/20 text-3xl shadow-lg">
                  📚
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{r.book.title}</h2>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{r.book.author}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {(() => {
                        const days = getDaysOverdue(r.dueDate);
                        const severity = getOverdueSeverity(days);
                        return (
                          <span className={`inline-flex items-center rounded-full border border-${severity.border}/80 bg-${severity.bg} px-4 py-2 text-sm font-bold text-${severity.text} shadow-sm`}>
                            {days} days overdue
                          </span>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 rounded-[1.5rem] bg-gradient-to-r from-slate-50/80 to-slate-100/80 p-5 text-sm dark:from-slate-800/80 dark:to-slate-700/80">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Borrower</span>
                      <span className="text-slate-900 dark:text-slate-100 font-medium">{r.user.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Due Date</span>
                      <span className="text-slate-900 dark:text-slate-100 font-medium">{new Date(r.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">ISBN</span>
                      <span className="text-slate-900 dark:text-slate-100 font-medium">{r.book.isbn}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Status</span>
                      <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                        Overdue
                      </span>
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
            className="mt-10 rounded-[2rem] border-2 border-dashed border-slate-300/60 bg-gradient-to-br from-white/80 to-slate-50/80 p-12 text-center shadow-xl shadow-slate-900/10 dark:border-slate-700/60 dark:from-slate-900/80 dark:to-slate-800/80"
          >
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 text-4xl shadow-lg">
              ✅
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">No overdue books found</p>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Everything is up to date for now. Check back later for new overdue items.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )

}

export default OverdueBooks;
