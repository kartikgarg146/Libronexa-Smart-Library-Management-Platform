import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminRequests(){

  const [requests,setRequests] = useState<any[]>([]);

  useEffect(()=>{
    fetchRequests();
  },[])

  const fetchRequests = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/requests",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    setRequests(res.data);

  }

  const approveRequest = async (id:number) => {

    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/requests/approve/${id}`,
      {},
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    alert("Request approved");

    fetchRequests();

  }

  return(

    <>
      <Navbar/>

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
          Book Requests
        </h1>

        <div className="space-y-4">

          {requests.map((r)=>(
            <div key={r.id} className="border p-4 rounded shadow">

              <p>
                <b>User:</b> {r.user.email}
              </p>

              <p>
                <b>Book:</b> {r.book.title}
              </p>

              <p>
                <b>Status:</b> {r.status}
              </p>

              {r.status === "pending" && (

                <button
                  onClick={()=>approveRequest(r.id)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>

              )}

            </div>
          ))}

        </div>

      </div>

    </>

  )

}

export default AdminRequests;