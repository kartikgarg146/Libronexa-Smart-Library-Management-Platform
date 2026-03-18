import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import requestRoutes from "./routes/requestRoutes";
import { protect } from "./middleware/authMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/requests", requestRoutes);

/* TEST ROUTES */

app.get("/", (req, res) => {
  res.send("Libronexa API running");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "Protected route accessed" });
});

export default app;