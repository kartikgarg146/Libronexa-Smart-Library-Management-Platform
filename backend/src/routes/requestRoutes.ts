import express from "express";
import {
  requestBook,
  approveRequest,
  returnBook,
} from "../controllers/requestController";

import { protect } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/adminMiddleware";
import { getAllRequests } from "../controllers/requestController";
import { getUserBorrowHistory } from "../controllers/requestController";
import { getOverdueBooks } from "../controllers/requestController";
import { getDashboardStats } from "../controllers/requestController";

const router = express.Router();

router.post("/", protect, requestBook);

router.put("/approve/:id", protect, isAdmin, approveRequest);

router.put("/return/:id", protect, returnBook);

router.get("/", protect, isAdmin, getAllRequests);

router.get("/history", protect, getUserBorrowHistory);
router.get("/admin/stats", protect, isAdmin, getDashboardStats);
router.get("/overdue", protect, isAdmin, getOverdueBooks);

export default router;