import { Router } from "express";
import {
  createComment,
  // getComments,
} from "../controllers/commentController";

const router = Router();

// router.get("/:taskId", getComments);
router.post("/", createComment);

export default router;
