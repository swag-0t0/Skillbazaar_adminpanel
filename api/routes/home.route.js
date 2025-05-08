import express from "express";
import { getStats, getRecentOrders, getAllUsers } from "../controllers/home.controller.js";
import { deleteUser } from "../controllers/home.controller.js";
import { getTransactionData } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/stats", getStats);

router.get("/recent-orders", getRecentOrders);
router.get("/users", getAllUsers); // New route for fetching all users
router.get("/transactions", getTransactionData); // New route for transaction data
router.delete("/:id", deleteUser);

export default router;