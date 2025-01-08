import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get Tasks of a Project
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving tasks: ${error.message}` });
  }
};

//Create a Task for a Project with Project Author User and Assigned Project Users
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a task: ${error.message}` });
  }
};

//Update Task Status
export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },
    });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
};

//Update Task Priority
export const updateTaskPriority = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { taskId } = req.params;
    const { priority } = req.body;
    try {
      const updatedTask = await prisma.task.update({
        where: {
          id: Number(taskId),
        },
        data: {
          priority: priority,
        },
      });
      res.json(updatedTask);
    } catch (error: any) {
      res.status(500).json({ message: `Error updating task: ${error.message}` });
    }
  };

//Get Tasks by Signed-in User
export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) },
        ],
      },
      include: {
        // Include the 'author' (task creator) and 'assignee' (person assigned)
        author: {
          select: {
            username: true, // Only select 'username' from the 'author' user
          },
        },
        assignee: {
          select: {
            username: true, // Only select 'username' from the 'assignee' user
          },
        },
        // Include comments with the username of the user who commented
        comments: {
          include: {
            user: {
              select: {
                username: true, // Fetch the 'username' from the 'user' who created the comment
              },
            },
          },
        },
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user's tasks: ${error.message}` });
  }
};

//Get One Task
export const getOneTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(taskId)
      },
      include: {
        comments: true,
      },
    });
    res.json(task);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving task: ${error.message}` });
  }
};