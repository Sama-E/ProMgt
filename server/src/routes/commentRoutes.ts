import { Router } from "express";
import {
  createComment,
  getOneComment,
  // getComments,
} from "../controllers/commentController";

const router = Router();

// router.get("/:taskId", getComments);
router.post("/", createComment);
router.get("/:commentId", getOneComment);

export default router;
