import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e:any) => {

    e.preventDefault();

    try{

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      setSuccess("Registration successful! Redirecting to login...");
      setError("");

      setTimeout(()=>{
        navigate("/login");
      },1500);

    }catch(err:any){
      setError("Registration failed. Email may already exist.");
      setSuccess("");
    }

  };

  return (

  <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
    <div className="max-w-md mx-auto pt-10 px-4">
      <button
        onClick={() => navigate("/")}
        className="btn-secondary mb-6 w-fit"
      >
        Back to Landing
      </button>
    </div>

  <div className="flex justify-center items-center pt-6">

  <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-xl p-8">

  <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
  Create Libronexa Account
  </h2>

  {error && (
  <p className="text-red-500 text-sm mb-4 text-center">
  {error}
  </p>
  )}

  {success && (
  <p className="text-green-500 text-sm mb-4 text-center">
  {success}
  </p>
  )}

  <form onSubmit={handleRegister} className="space-y-4">

  <div>

  <label className="block mb-1 dark:text-gray-300">
  Name
  </label>

  <input
  type="text"
  required
  value={name}
  onChange={(e)=>setName(e.target.value)}
  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
  />

  </div>


  <div>

  <label className="block mb-1 dark:text-gray-300">
  Email
  </label>

  <input
  type="email"
  required
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
  />

  </div>


  <div>

  <label className="block mb-1 dark:text-gray-300">
  Password
  </label>

  <input
  type="password"
  required
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
  className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
  />

  </div>


  <button
  type="submit"
  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
  >
  Register
  </button>

  </form>


  <p className="text-sm text-center mt-6 dark:text-gray-300">
  Already have an account?{" "}
  <Link
  to="/login"
  className="text-blue-600 hover:underline"
  >
  Login
  </Link>
  </p>

  </div>

  </div>

  </div>

  );

}

export default Register;