import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminBooks(){

  const [books,setBooks] = useState<any[]>([]);

  const [title,setTitle] = useState("");
  const [author,setAuthor] = useState("");
  const [isbn,setIsbn] = useState("");
  const [coverImage,setCoverImage] = useState("");
  const [totalCopies,setTotalCopies] = useState(1);

  const [editingId,setEditingId] = useState<number | null>(null);

  useEffect(()=>{
    fetchBooks();
  },[])

  const fetchBooks = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/books"
    );

    setBooks(res.data);

  }

  const addBook = async (e:any) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/books",
      {
        title,
        author,
        isbn,
        coverImage,
        totalCopies,
        categoryId:1
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    alert("Book added");

    fetchBooks();

  }

  const deleteBook = async (id:number) => {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/books/${id}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    fetchBooks();

  }

  const updateBook = async () => {

    if(!editingId) return;

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/books/${editingId}`,
      {
        title,
        author,
        isbn,
        coverImage,
        totalCopies
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    alert("Book updated");

    setEditingId(null);

    fetchBooks();

  }

  return(

    <>
      <Navbar/>

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
          Manage Books
        </h1>

        {/* Book Form */}

        <form
          onSubmit={editingId ? updateBook : addBook}
          className="space-y-3 mb-10"
        >

          <input
            placeholder="Title"
            className="border p-2 w-full"
            onChange={(e)=>setTitle(e.target.value)}
          />

          <input
            placeholder="Author"
            className="border p-2 w-full"
            onChange={(e)=>setAuthor(e.target.value)}
          />

          <input
            placeholder="ISBN"
            className="border p-2 w-full"
            onChange={(e)=>setIsbn(e.target.value)}
          />

          <input
            placeholder="Cover Image URL"
            className="border p-2 w-full"
            onChange={(e)=>setCoverImage(e.target.value)}
          />

          <input
            type="number"
            placeholder="Total Copies"
            className="border p-2 w-full"
            onChange={(e)=>setTotalCopies(Number(e.target.value))}
          />

          {editingId ? (

            <button className="bg-yellow-500 text-white px-4 py-2 rounded">
              Update Book
            </button>

          ) : (

            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Book
            </button>

          )}

        </form>

        {/* Books Grid */}

        <div className="grid grid-cols-3 gap-6">

          {books.map((book)=>(
            <div key={book.id} className="border p-4 rounded shadow">

              <img
                src={book.coverImage || "https://via.placeholder.com/300x200"}
                className="w-full h-40 object-cover mb-2"
              />

              <h2 className="font-bold">
                {book.title}
              </h2>

              <p>{book.author}</p>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={()=>setEditingId(book.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={()=>deleteBook(book.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </>

  )

}

export default AdminBooks;