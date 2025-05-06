import express from "express";
import { getStats, getRecentOrders, getAllUsers } from "../controllers/home.controller.js";
import { deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/stats", getStats);

router.get("/recent-orders", getRecentOrders);
router.get("/users", getAllUsers); // New route for fetching all users
router.delete("/:id", deleteUser);

export default router;