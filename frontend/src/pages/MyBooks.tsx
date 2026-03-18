import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyBooks() {

  const [records,setRecords] = useState<any[]>([]);

  useEffect(()=>{
    fetchHistory();
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

  return(

    <>
      <Navbar/>

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
          My Borrowed Books
        </h1>

        <div className="grid grid-cols-2 gap-6">

          {records.map((r)=>(
            <div key={r.id} className="border p-4 rounded shadow">

              <h2 className="font-bold">
                {r.book.title}
              </h2>

              <p>Author: {r.book.author}</p>

              <p>
                Due Date:
                {" "}
                {new Date(r.dueDate).toLocaleDateString()}
              </p>

              <p>
                Fine:
                {" "}
                ₹{r.fine || 0}
              </p>

              {!r.returnDate && (

                <button
                  onClick={()=>returnBook(r.id)}
                  className="mt-3 bg-green-500 text-white px-3 py-1 rounded"
                >
                  Return Book
                </button>

              )}

            </div>
          ))}

        </div>

      </div>
    </>

  )

}

export default MyBooks;