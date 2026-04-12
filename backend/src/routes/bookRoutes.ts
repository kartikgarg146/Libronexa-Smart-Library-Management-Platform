import express from "express";
import {
  addBook,
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
} from "../controllers/bookController";

import { protect } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/adminMiddleware";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);

router.post("/", protect, isAdmin, addBook);
router.put("/:id", protect, isAdmin, updateBook);

router.delete("/:id", protect, isAdmin, deleteBook);

export default router;