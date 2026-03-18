import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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

  return(

    <>
      <Navbar/>

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
          Overdue Books
        </h1>

        <div className="space-y-4">

          {records.map((r)=>(
            <div key={r.id} className="border p-4 rounded shadow">

              <p>
                <b>User:</b> {r.user.email}
              </p>

              <p>
                <b>Book:</b> {r.book.title}
              </p>

              <p>
                <b>Due Date:</b>{" "}
                {new Date(r.dueDate).toLocaleDateString()}
              </p>

            </div>
          ))}

        </div>

      </div>

    </>

  )

}

export default OverdueBooks;