import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, type ReactElement } from "react";
import logo from "../assets/logo.png";

const particlePositions = [
  { top: "8%", left: "12%", duration: "10s", delay: "0.2s" },
  { top: "20%", left: "80%", duration: "12s", delay: "1.4s" },
  { top: "36%", left: "28%", duration: "9s", delay: "0.8s" },
  { top: "52%", left: "65%", duration: "14s", delay: "0.4s" },
  { top: "70%", left: "18%", duration: "11s", delay: "1.2s" },
  { top: "80%", left: "82%", duration: "13s", delay: "0.7s" },
  { top: "14%", left: "46%", duration: "12s", delay: "0.5s" },
  { top: "48%", left: "10%", duration: "10s", delay: "1.8s" },
  { top: "64%", left: "55%", duration: "15s", delay: "0.3s" },
  { top: "28%", left: "75%", duration: "9s", delay: "0.9s" },
];

function Landing(): ReactElement {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  const particles = particlePositions;

  const heroImages = [
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleDark = (): void => {
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

  const fade = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stats = [
    { value: "100+", label: "Books Available" },
    { value: "1.2k+", label: "Active Members" },
    { value: "24/7", label: "Live Requests" },
    { value: "99%", label: "Satisfaction" },
  ];

  const popularBooks = [
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Sapiens",
      author: "Yuval Noah Harari",
      img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "The Lean Startup",
      author: "Eric Ries",
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const features = [
    {
      icon: "📚",
      title: "Smart Catalog",
      description: "Search, filter, and manage library catalogs from a beautiful dashboard.",
    },
    {
      icon: "✅",
      title: "Quick Approvals",
      description: "Approve requests and track borrowing activity in seconds.",
    },
    {
      icon: "📊",
      title: "Actionable Insights",
      description: "See real-time usage and overdue trends with intuitive analytics.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_30%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#f8fbff_0%,#e5ecf5_55%,#f8fbff_100%)] dark:bg-[linear-gradient(180deg,#020617_0%,#07111f_55%,#020617_100%)]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-2xl shadow-slate-900/5">
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
              type="button"
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="inline-flex items-center rounded-2xl border border-slate-200/80 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700/90 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              {dark ? "☀️" : "🌙"}
            </button>
            <Link
              to="/login"
              className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700/90 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pb-20 pt-16">
          <div className="absolute inset-0 opacity-80">
            <img
              src={heroImages[currentImage]}
              alt="Library background"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm" />
          </div>
          <div className="absolute inset-0 -z-10">
            {particles.map((particle, index) => (
              <span
                key={index}
                className="absolute block h-2 w-2 rounded-full bg-slate-100/40 dark:bg-slate-400/20"
                style={{
                  top: particle.top,
                  left: particle.left,
                  animationDuration: particle.duration,
                  animationDelay: particle.delay,
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:justify-between">
            <motion.div
              variants={fade}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white shadow-lg shadow-slate-950/20">
                Build a modern library experience for users and admins
              </p>
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Library management made modern, fast, and friendly.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200/90">
                Libronexa helps administrators manage inventory, approve borrowing requests, and empower readers with a polished digital library.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-3xl bg-blue-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
                >
                  Start for free
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-3xl border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:border-white/30"
                >
                  Login to dashboard
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={fade}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="w-full max-w-xl rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-3xl"
            >
              <div className="flex items-center gap-4 rounded-3xl bg-slate-950/10 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500/20 text-2xl">📚</div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-200">Featured workflow</p>
                  <p className="mt-1 text-lg font-semibold text-white">Request, approve, and issue in one view.</p>
                </div>
              </div>
              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl border border-slate-200/10 bg-slate-950/40 p-5 text-slate-100">
                  <p className="text-sm text-slate-400">Live requests</p>
                  <p className="mt-2 text-3xl font-semibold">23 pending</p>
                </div>
                <div className="rounded-3xl border border-slate-200/10 bg-slate-950/40 p-5 text-slate-100">
                  <p className="text-sm text-slate-400">Overdue books</p>
                  <p className="mt-2 text-3xl font-semibold">12 items</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-4">
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fade}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-3xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl shadow-slate-950/10 backdrop-blur-xl"
                >
                  <p className="text-4xl font-semibold text-blue-500">{item.value}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50/80 dark:bg-slate-900/70">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">Popular books</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">Handpicked for your next reading list.</h2>
              </div>
              <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">
                Explore a selection of modern library favorites curated for students, professionals, and avid readers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {popularBooks.map((book) => (
                <motion.article
                  key={book.title}
                  variants={fade}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group overflow-hidden rounded-4xl border border-white/20 bg-white/10 shadow-2xl shadow-slate-950/10 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-300/20"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-slate-900/10">
                    <img
                      src={book.img}
                      alt={book.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3 p-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-blue-500">Featured</p>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{book.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{book.author}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                        Borrow
                      </span>
                      <Link
                        to="/login"
                        className="text-sm font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-300"
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fade}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl shadow-slate-950/10 backdrop-blur-xl"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500/10 text-3xl">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-slate-100">{feature.title}</h3>
                  <p className="mt-4 text-slate-600 dark:text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/15 bg-blue-600/10 px-6 py-12 shadow-2xl shadow-slate-950/10 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-base font-semibold uppercase tracking-[0.2em] text-blue-400">Ready to transform your library?</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-slate-100 sm:text-5xl">Launch Libronexa for your team today.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Keep your library running smoothly with a modern dashboard, request workflows, and a polished experience for readers.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Get started now
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-3xl border border-white/20 bg-white/10 px-7 py-3 text-base font-semibold text-white transition hover:bg-white/20"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 px-6 py-8 text-slate-600 shadow-inner shadow-slate-900/5 dark:border-slate-800/90 dark:bg-slate-950/90 dark:text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Libronexa. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/login" className="transition hover:text-slate-900 dark:hover:text-white">Login</Link>
            <Link to="/register" className="transition hover:text-slate-900 dark:hover:text-white">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
