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
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_30%)]" />
      <Navbar/>

      <div className="mx-auto max-w-7xl px-6 py-10">

        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Overdue Books
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Monitor books that are past their due date and need attention.
          </p>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {records.map((r)=>(
            <motion.article
              key={r.id}
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-[2rem] border border-red-200/20 bg-red-50/10 dark:bg-red-950/10 p-6 shadow-2xl shadow-red-950/10 backdrop-blur-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-500/10 text-2xl">
                  ⚠️
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {r.book.title}
                  </h2>
                  <div className="mt-2 space-y-1">
                    <p className="text-slate-600 dark:text-slate-400">
                      <span className="font-medium">User:</span> {r.user.email}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      <span className="font-medium">Due Date:</span>{" "}
                      {new Date(r.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </div>
  )

}

export default OverdueBooks;
