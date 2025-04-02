import { Router } from "express";
import {
  createBug,
  getBugs,
  getUserBugs,
  updateBugStatus,
  updateBugPriority,
  getOneBug,
} from "../controllers/bugController";

const router = Router();

router.get("/", getBugs);
router.post("/", createBug);
router.patch("/:bugId/status", updateBugStatus);
router.patch("/:bugId/priority", updateBugPriority);
router.get("/user/:userId", getUserBugs);
router.get("/:bugId", getOneBug);

export default router;