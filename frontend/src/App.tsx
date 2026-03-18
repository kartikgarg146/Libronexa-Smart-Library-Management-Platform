import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import AdminDashboard from "./pages/AdminDashboard";
import MyBooks from "./pages/MyBooks";
import AdminRequests from "./pages/AdminRequests";
import OverdueBooks from "./pages/OverdueBooks";
import AdminBooks from "./pages/AdminBooks";

function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/books" element={<Books />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/mybooks" element={<MyBooks />} />
      <Route path="/admin/requests" element={<AdminRequests />} />
      <Route path="/admin/overdue" element={<OverdueBooks />} />
      <Route path="/admin/books" element={<AdminBooks />} />

    </Routes>
  );
}

export default App;