import express from "express";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../controllers/manage.controller.js";

const router = express.Router();

router.post("/categories", addCategory); // Add a new category
router.get("/categories", getCategories); // Get all categories
router.delete("/categories/:id", deleteCategory); // Delete a category

export default router;