import express from "express";
import {
  getUsers,
  deleteUser,
  updateProfile,
} from "../controllers/userController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Protect all routes in this router
router.use(protect);

// GET /api/users - Get all users (admin/super_admin only)
router.get("/", authorize("admin", "super_admin"), getUsers);

// DELETE /api/users/:id - Delete user (super_admin only)
router.delete("/:id", authorize("super_admin"), deleteUser);

// PUT /api/users/profile - Update user profile (all authenticated users)
router.put("/profile", updateProfile);

export default router;
