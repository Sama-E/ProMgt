import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get Comments
export const getComments = async (req: Request, res: Response): Promise<void> => {
  const { taskId, bugId } = req.query;

  try {
    const whereCondition: any = {};

    // If taskId is provided, filter by taskId
    if (taskId) {
      whereCondition.taskId = Number(taskId);  // Make sure taskId is a number
    }

    // If bugId is provided, filter by bugId
    if (bugId) {
      whereCondition.bugId = Number(bugId);  // Make sure bugId is a number
    }

    // Fetch comments with the dynamically created whereCondition
    const comments = await prisma.comment.findMany({
      where: whereCondition, // Dynamic filtering
      include: {
        author: {
          select: {
            firstName: true,  // Fetch firstName of the author (User)
            lastName: true,   // Fetch lastName of the author (User)
          },
        },
      },
    });

    // Send back the fetched comments as JSON
    res.json(comments);

  } catch (error: any) {
    // Handle any errors that occur during the database query
    console.error(error);  // You can log the error for debugging purposes
    res.status(500).json({ message: "Error retrieving comments." });
  }
};

  

//Create Comments
export const createComment = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { 
        text, 
        taskId, 
        bugId, 
        userId 
    } = req.body;
    try {
      const newComment = await prisma.comment.create({
        data: {
            text,
            taskId,
            bugId,
            userId,
        },
      });
      res.status(201).json(newComment);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error creating a comment: ${error.message}` });
        // .json({ message: "Error creating a comment." });
    }
  };