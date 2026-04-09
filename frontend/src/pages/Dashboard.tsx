import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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

return(

<div className="min-h-screen bg-gray-100 dark:bg-gray-950">

<Navbar/>

<div className="max-w-7xl mx-auto px-6 py-10">

<div className="mb-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] items-end">
  <div>
    <h1 className="text-4xl font-extrabold leading-tight dark:text-white">
      Welcome{userName ? ", " + userName : ""}!
    </h1>
    <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
      Explore the library collection, request books instantly, and keep track of availability from your student dashboard.
    </p>
  </div>
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 shadow-2xl border border-white/10 text-white">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Available books</p>
      <p className="mt-4 text-3xl font-semibold">{books.length}</p>
    </div>
    <div className="rounded-[32px] bg-white dark:bg-slate-900 border border-gray-200/70 dark:border-gray-800 p-6 shadow-xl">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Search results</p>
      <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{filteredBooks.length}</p>
    </div>
  </div>
</div>

<div className="mb-8 rounded-[32px] border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Search books</label>
  <input
    type="text"
    placeholder="Search by title or author..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    className="w-full rounded-3xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-950 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

<div className="grid gap-8 md:grid-cols-3">

{filteredBooks.map((book)=>(

<div
 key={book.id}
 className="group overflow-hidden rounded-[28px] border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-slate-950 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-2xl"
>

<div className="overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900 mb-5">
  <img
    src={book.coverImage || "https://via.placeholder.com/150"}
    alt={book.title}
    className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
  />
</div>

<h2 className="font-semibold text-lg text-center dark:text-white">{book.title}</h2>

<p className="text-center text-sm text-gray-500 dark:text-slate-400 mt-2">{book.author}</p>

<p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-300">Available Copies: <span className="font-semibold text-slate-900 dark:text-white">{book.availableCopies}</span></p>

<button
 onClick={()=>requestBook(book.id)}
 className="mt-6 w-full rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white font-semibold shadow-lg shadow-blue-500/10 transition hover:from-blue-700 hover:to-indigo-700"
>
 Request Book
</button>

</div>

))}

</div>

</div>

</div>

);

}

export default Dashboard;