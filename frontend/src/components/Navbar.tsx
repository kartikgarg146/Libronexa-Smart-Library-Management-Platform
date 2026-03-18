import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logo.png";

function Navbar() {

  const navigate = useNavigate();

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){
      document.documentElement.classList.add("dark");
    }

  },[]);

  const toggleDark = () => {

    const html = document.documentElement;

    if(html.classList.contains("dark")){
      html.classList.remove("dark");
      localStorage.setItem("theme","light");
    }else{
      html.classList.add("dark");
      localStorage.setItem("theme","dark");
    }

  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");

  };

  const goHome = () => {

    const role = localStorage.getItem("role");

    if(role === "admin"){
      navigate("/admin");
    }else{
      navigate("/dashboard");
    }

  };

  return (

    <nav className="
    w-full
    bg-white dark:bg-gray-900
    shadow
    ">

      <div className="
      max-w-7xl
      mx-auto
      px-6
      py-4
      flex
      justify-between
      items-center
      ">
        <img
      src={logo}
      className="h-9 w-auto object-contain"
      alt="Libronexa Logo"
      />
        <h1
          className="
          text-2xl
          font-bold
          text-blue-600
          dark:text-blue-400
          cursor-pointer
          "
          onClick={goHome}
        >
          Libronexa
        </h1>

        <div className="flex items-center gap-4">

          <button
            onClick={()=>navigate(-1)}
            className="btn-secondary"
          >
            Back
          </button>

          <button
            onClick={goHome}
            className="btn-secondary"
          >
            Home
          </button>

          <button
            onClick={toggleDark}
            className="btn-secondary"
          >
            🌙
          </button>

          <button
            onClick={logout}
            className="btn-danger"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;