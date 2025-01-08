import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get Comments of a Task
export const getComments = async (req: Request, res: Response): Promise<void> => {
  const { taskId } = req.query;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        taskId: Number(taskId),
      },
    });
    res.json(comments);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving comments: ${error.message}` });
  }
};

//Create a Comment for a Task with Task Author User
export const createComment = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const {
      text,
      taskId,
      userId,
    } = req.body;
    try {
      const newComment = await prisma.comment.create({
        data: {
          text,
          taskId,
          userId,
        },
      });
      res.status(201).json(newComment);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error creating a comment: ${error.message}` });
    }
  };