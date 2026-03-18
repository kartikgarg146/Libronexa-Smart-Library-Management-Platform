import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e:any) => {

    e.preventDefault();

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      const token = res.data.token;
      const role = res.data.user.role;

      localStorage.setItem("token",token);
      localStorage.setItem("role",role);

      if(role==="admin"){
        navigate("/admin");
      }else{
        navigate("/dashboard");
      }

    }catch(err:any){
      setError("Invalid email or password");
    }

  };

  return (

  <div className="min-h-screen bg-gray-100 dark:bg-gray-950">

  <Navbar/>

  <div className="flex justify-center items-center pt-20">

  <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-xl p-8">

  <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
  Login to Libronexa
  </h2>

  {error && (
  <p className="text-red-500 text-sm mb-4 text-center">
  {error}
  </p>
  )}

  <form onSubmit={handleLogin} className="space-y-4">

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
  Login
  </button>

  </form>


  <p className="text-sm text-center mt-6 dark:text-gray-300">
  Don't have an account?{" "}
  <Link
  to="/register"
  className="text-blue-600 hover:underline"
  >
  Register
  </Link>
  </p>

  </div>

  </div>

  </div>

  );

}

export default Login;