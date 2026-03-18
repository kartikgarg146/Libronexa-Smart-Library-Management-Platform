import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Books(){

  const [books,setBooks] = useState<any[]>([]);
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("all");

  useEffect(()=>{
    fetchBooks();
  },[])

  const fetchBooks = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/books"
    );

    setBooks(res.data);

  }

  const requestBook = async (bookId:number) => {

    const token = localStorage.getItem("token");

    try{

      await axios.post(
        "http://localhost:5000/api/requests",
        { bookId },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      alert("Book requested");

    }catch{
      alert("Request failed");
    }

  }

  const filteredBooks = books.filter((book)=>{

    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      book.category?.name === category;

    return matchesSearch && matchesCategory;

  });

  return(

    <>
      <Navbar/>

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
          Library Books
        </h1>

        {/* Search + Category Filter */}

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Search books..."
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          >

            <option value="all">All</option>
            <option value="Programming">Programming</option>
            <option value="English Literature">English Literature</option>

          </select>

        </div>

        {/* Books Grid */}

        <div className="grid grid-cols-3 gap-6">

          {filteredBooks.map((book)=>(
            <div key={book.id} className="border rounded shadow overflow-hidden">

              <img
                src={book.coverImage || "https://via.placeholder.com/300x200"}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">

                <h2 className="font-bold text-lg">
                  {book.title}
                </h2>

                <p className="text-gray-600">
                  {book.author}
                </p>

                <p className="text-sm mt-2">

                  {book.availableCopies > 0 ? (
                    <span className="text-green-600">
                      Available
                    </span>
                  ) : (
                    <span className="text-red-600">
                      Not Available
                    </span>
                  )}

                </p>

                {book.availableCopies > 0 && (

                  <button
                    onClick={()=>requestBook(book.id)}
                    className="mt-3 bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Request Book
                  </button>

                )}

              </div>

            </div>
          ))}

        </div>

      </div>

    </>

  )

}

export default Books;