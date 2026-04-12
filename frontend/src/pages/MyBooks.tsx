import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function MyBooks() {

  const [records,setRecords] = useState<any[]>([]);

  useEffect(()=>{
    fetchHistory();

    const handleFocus = () => fetchHistory();
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  },[])

  const fetchHistory = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/requests/history",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setRecords(res.data);

  }

  const returnBook = async (id:number) => {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/requests/return/${id}`,
      {},
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    alert("Book returned");

    fetchHistory();

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
            My Borrowed Books
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Track your borrowed books, due dates, and return them when you're done reading.
          </p>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          {records.map((r)=>(
            <motion.article
              key={r.id}
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500/10 text-2xl">
                  📚
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {r.book.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Author: {r.book.author}
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium">Due Date:</span>{" "}
                      {new Date(r.dueDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium">Fine:</span>{" "}
                      ₹{r.fine || 0}
                    </p>
                  </div>
                </div>
              </div>

              {!r.returnDate && (
                <button
                  onClick={()=>returnBook(r.id)}
                  className="mt-6 w-full rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-white font-semibold shadow-lg shadow-green-500/20 transition hover:from-green-700 hover:to-emerald-700"
                >
                  Return Book
                </button>
              )}
            </motion.article>
          ))}
        </motion.div>

      </div>
    </div>
  )

}

export default MyBooks;