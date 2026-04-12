import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import logo from "../assets/logo.png";

function Navbar() {

  const navigate = useNavigate();

  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark"){
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      setDark(false);
    }
  },[]);

  const toggleDark = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");

    navigate("/login");

  };

  return (

    <nav className="sticky top-0 z-40 border-b border-white/10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-2xl shadow-slate-900/5">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Libronexa Logo" className="h-10 w-10 rounded-2xl shadow-lg shadow-slate-900/10" />
          <div>
            <p className="text-base font-semibold text-slate-900 dark:text-slate-100">Libronexa</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Smart library platform</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={()=>navigate(-1)}
            className="inline-flex items-center rounded-2xl border border-slate-200/80 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700/90 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Back
          </button>

          <button
            onClick={toggleDark}
            className="inline-flex items-center rounded-2xl border border-slate-200/80 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700/90 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={logout}
            className="inline-flex items-center rounded-2xl border border-red-200/80 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 shadow-sm shadow-red-900/5 transition hover:-translate-y-0.5 hover:bg-red-100 dark:border-red-700/90 dark:bg-red-950 dark:text-red-100 dark:hover:bg-red-900"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;
