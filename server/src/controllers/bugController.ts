import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get Bugs of a Project
export const getBugs = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    const bugs = await prisma.bug.findMany({
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
    res.json(bugs);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving bugs: ${error.message}` });
  }
};

//Create a Bug for a Project with Project Author User and Assigned Project Users
export const createBug = async (
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
    const newBug = await prisma.bug.create({
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
    res.status(201).json(newBug);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a bug: ${error.message}` });
  }
};

//Update Bug Status
export const updateBugStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bugId } = req.params;
  const { status } = req.body;
  try {
    const updatedBug = await prisma.bug.update({
      where: {
        id: Number(bugId),
      },
      data: {
        status: status,
      },
    });
    res.json(updatedBug);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating bug: ${error.message}` });
  }
};

//Update Bug Priority
export const updateBugPriority = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { bugId } = req.params;
    const { priority } = req.body;
    try {
      const updatedBug = await prisma.bug.update({
        where: {
          id: Number(bugId),
        },
        data: {
          priority: priority,
        },
      });
      res.json(updatedBug);
    } catch (error: any) {
      res.status(500).json({ message: `Error updating bug: ${error.message}` });
    }
  };

//Get Bugs by Signed-in User
export const getUserBugs = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  try {
    const bugs = await prisma.bug.findMany({
      where: {
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) },
        ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    res.json(bugs);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user's tasks: ${error.message}` });
  }
};

//Get One Bug
export const getOneBug = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bugId } = req.params;
  try {
    const bug = await prisma.bug.findUnique({
      where: {
        id: Number(bugId)
      },
      include: {
        comments: true,
        attachments: true,
      },
    });
    res.json(bug);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving bug: ${error.message}` });
  }
};