import express from "express";
import { 
  getModerators,
  getModerator, 
  createModerator, 
  updateModerator, 
  deleteModerator 
} from "../controllers/moderator.controller.js";

const router = express.Router();

router.get("/list", getModerators);        // Get all moderators
router.get("/single/:id", getModerator);   // Get single moderator
router.post("/create", createModerator);   // Create new moderator
router.put("/update/:id", updateModerator);// Update moderator
router.delete("/remove/:id", deleteModerator); // Delete moderator

export default router;