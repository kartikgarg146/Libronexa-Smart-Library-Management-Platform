import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard(){

const [books,setBooks] = useState<any[]>([]);
const [search,setSearch] = useState("");

useEffect(()=>{
fetchBooks();
},[]);

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

<h1 className="text-3xl font-bold mb-6 dark:text-white">
Library Books
</h1>


{/* SEARCH */}

<input
type="text"
placeholder="Search books..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full md:w-96 mb-8 border rounded px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
/>


{/* BOOK GRID */}

<div className="grid md:grid-cols-3 gap-8">

{filteredBooks.map((book)=>(

<div
key={book.id}
className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:scale-105 transition"
>

<img
src={book.coverImage || "https://via.placeholder.com/150"}
className="h-48 mx-auto mb-4"
/>

<h2 className="font-semibold text-lg text-center dark:text-white">
{book.title}
</h2>

<p className="text-gray-500 text-center text-sm">
{book.author}
</p>

<p className="text-center text-sm mt-2 dark:text-gray-300">
Available Copies: {book.availableCopies}
</p>

<button
onClick={()=>requestBook(book.id)}
className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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