import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get Projects
export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error: any) {
    res
      .status(500)
    //   .json({ message: `Error retrieving projects: ${error.message}` });
      .json({ message: "Error retrieving projects." });
  }
};

//Create Project
export const createProject = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { name, description, startDate, endDate } = req.body;
    try {
      const newProject = await prisma.project.create({
        data: {
          name,
          description,
          startDate,
          endDate,
        },
      });
      res.status(201).json(newProject);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error creating a project: ${error.message}` });
        // .json({ message: "Error creating a project." });
    }
  };

//Get Projects by Signed-in User
// export const getUserProjects = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { userId } = req.params;
//   try {
//     const projects = await prisma.project.findMany({
//       where: {
//         OR: [
//           { authorUserId: Number(userId) },
//           { assignedUserId: Number(userId) },
//         ],
//       },
//       include: {
//         author: true,
//         assignee: true,
//       },
//     });
//     res.json(tasks);
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: `Error retrieving user's tasks: ${error.message}` });
//   }
// };