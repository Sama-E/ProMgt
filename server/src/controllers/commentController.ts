import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// TASKS or BUGS COMMENTS
//Get Comments
export const getComments = async (req: Request, res: Response): Promise<void> => {
  const { taskId } = req.query;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        taskId: Number(taskId),
      },
      // include: {
      //   author: Number(authorUserId),
      // },
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
      bugId,
      authorUserId,
    } = req.body;
    try {
      const newComment = await prisma.comment.create({
        data: {
          text,
          taskId,
          bugId,
          authorUserId,
        },
      });
      res.status(201).json(newComment);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error creating a comment: ${error.message}` });
    }
  };


  //Get One Comment
  export const getOneComment = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { commentId } = req.params;
    try {
      const comment = await prisma.comment.findUnique({
        where: {
          id: Number(commentId)
        },
        // include: {
        //   user: { // Include the associated user data
        //     select: {
        //       username: true, // Only select the username
        //       firstName: true,
        //       lastName: true,
        //     },
        //   },
        // },
      });
      if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }
  
      // You can now access comment.user.username
      // res.json({
      //   id: comment.id,
        // text: comment.text,
        // username: comment.user?.username, // Access username from the user relation
      // });
      res.json(comment)
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error retrieving comment: ${error.message}` });
    }
  };