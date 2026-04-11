import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Dashboard(){

const [books,setBooks] = useState<any[]>([]);
const [userName,setUserName] = useState<string>(
localStorage.getItem("userName") || ""
);
const [search,setSearch] = useState("");

useEffect(()=>{
fetchUserName();
fetchBooks();
},[]);

const fetchUserName = async ()=>{

try{

const token = localStorage.getItem("token");
if(!token) return;

const res = await axios.get(
"http://localhost:5000/api/auth/me",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setUserName(res.data?.name ?? "");
localStorage.setItem("userName", res.data?.name ?? "");

}catch(err){
console.log(err);
}

};

const fetchBooks = async ()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/books"
);

setBooks(res.data);

}catch(err){
console.log(err);
}

};

const requestBook = async (bookId:number)=>{

try{

const token = localStorage.getItem("token");

await axios.post(
"http://localhost:5000/api/requests",
{ bookId },
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

alert("Book request sent");

}catch(err){
alert("Request failed");
}

};

const filteredBooks = books.filter((book)=>
book.title.toLowerCase().includes(search.toLowerCase()) ||
book.author.toLowerCase().includes(search.toLowerCase())
);

const fade = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

return(

<div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_30%)]" />
  <Navbar/>

  <div className="mx-auto max-w-7xl px-6 py-10">

    <div className="mb-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] items-end">
      <motion.div
        variants={fade}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-extrabold leading-tight text-slate-900 dark:text-slate-100">
          Welcome{userName ? ", " + userName : ""}!
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
          Explore the library collection, request books instantly, and keep track of availability from your student dashboard.
        </p>
      </motion.div>

      <motion.div
        variants={fade}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="grid gap-4 sm:grid-cols-2"
      >
        <div className="rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 shadow-2xl border border-white/10 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Available books</p>
          <p className="mt-4 text-3xl font-semibold">{books.length}</p>
        </div>
        <div className="rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-6 shadow-xl">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Search results</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">{filteredBooks.length}</p>
        </div>
      </motion.div>
    </div>

    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.4 }}
      className="mb-8 rounded-[32px] border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl"
    >
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Search books</label>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="w-full rounded-3xl border border-slate-200/80 bg-white/80 px-4 py-3 text-slate-900 shadow-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700/90 dark:bg-slate-900/80 dark:text-slate-100"
      />
    </motion.div>

    <motion.div
      variants={fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid gap-8 md:grid-cols-3"
    >
      {filteredBooks.map((book)=>(
        <motion.article
          key={book.id}
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="group overflow-hidden rounded-[28px] border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900 mb-5">
            <img
              src={book.coverImage || "https://via.placeholder.com/150"}
              alt={book.title}
              className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>

          <h2 className="font-semibold text-lg text-center text-slate-900 dark:text-slate-100">{book.title}</h2>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">{book.author}</p>

          <p className="text-center text-sm mt-4 text-slate-600 dark:text-slate-300">Available Copies: <span className="font-semibold text-slate-900 dark:text-slate-100">{book.availableCopies}</span></p>

          <button
            onClick={()=>requestBook(book.id)}
            className="mt-6 w-full rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white font-semibold shadow-lg shadow-blue-500/10 transition hover:from-blue-700 hover:to-indigo-700"
          >
            Request Book
          </button>
        </motion.article>
      ))}
    </motion.div>

  </div>

</div>

);

}

export default Dashboard;
