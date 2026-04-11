import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      const role = res.data.user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userName", res.data?.user?.name ?? "");

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch {
      setError("Invalid email or password");
    }
  };

  const fade = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_30%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#f8fbff_0%,#e5ecf5_55%,#f8fbff_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#07111f_55%,#020617_100%)]" />

      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700/90 dark:bg-slate-950/90 dark:text-slate-100"
            >
              ← Back to Landing
            </button>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
                Welcome back
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Sign in to your Libronexa account
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200/50 bg-red-50/50 p-4 text-center text-red-600 dark:border-red-800/50 dark:bg-red-950/50 dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-2xl border border-slate-200/80 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-500 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700/90 dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder-slate-400"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 block w-full rounded-2xl border border-slate-200/80 bg-white/50 px-4 py-3 text-slate-900 placeholder-slate-500 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700/90 dark:bg-slate-900/50 dark:text-slate-100 dark:placeholder-slate-400"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                Sign in
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;