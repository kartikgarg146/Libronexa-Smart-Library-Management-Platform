import express from "express";
import {
  requestBook,
  approveRequest,
  rejectRequest,
  returnBook,
  getAllRequests,
  getUserBorrowHistory,
  getOverdueBooks,
  getDashboardStats,
} from "../controllers/requestController";

import { protect } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/adminMiddleware";

const router = express.Router();

router.post("/", protect, requestBook);

router.put("/approve/:id", protect, isAdmin, approveRequest);
router.put("/reject/:id", protect, isAdmin, rejectRequest);

router.put("/return/:id", protect, returnBook);

router.get("/", protect, isAdmin, getAllRequests);

router.get("/history", protect, getUserBorrowHistory);
router.get("/admin/stats", protect, isAdmin, getDashboardStats);
router.get("/overdue", protect, isAdmin, getOverdueBooks);

export default router;