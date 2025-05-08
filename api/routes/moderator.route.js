import express from "express";
import { 
  getModerators,
  getModerator, 
  createModerator, 
  updateModerator, 
  deleteModerator, 
  getAdminProfile,
  updateAdminProfile
} from "../controllers/moderator.controller.js";

const router = express.Router();

// Moderator routes
router.get("/list", getModerators);
router.get("/single/:id", getModerator);
router.post("/create", createModerator);
router.put("/update/:id", updateModerator);
router.delete("/remove/:id", deleteModerator);

// Admin profile routes with different paths to avoid conflicts
router.get("/admin/:id", getAdminProfile);
router.put("/admin/update/:id", updateAdminProfile);

export default router;