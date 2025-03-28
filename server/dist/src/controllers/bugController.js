"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneBug = exports.getUserBugs = exports.updateBugPriority = exports.updateBugStatus = exports.createBug = exports.getBugs = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//Get Bugs of a Project
const getBugs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.query;
    try {
        const bugs = yield prisma.bug.findMany({
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
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving bugs: ${error.message}` });
    }
});
exports.getBugs = getBugs;
//Create a Bug for a Project with Project Author User and Assigned Project Users
const createBug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
    try {
        const newBug = yield prisma.bug.create({
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
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating a bug: ${error.message}` });
    }
});
exports.createBug = createBug;
//Update Bug Status
const updateBugStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bugId } = req.params;
    const { status } = req.body;
    try {
        const updatedBug = yield prisma.bug.update({
            where: {
                id: Number(bugId),
            },
            data: {
                status: status,
            },
        });
        res.json(updatedBug);
    }
    catch (error) {
        res.status(500).json({ message: `Error updating bug: ${error.message}` });
    }
});
exports.updateBugStatus = updateBugStatus;
//Update Bug Priority
const updateBugPriority = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bugId } = req.params;
    const { priority } = req.body;
    try {
        const updatedBug = yield prisma.bug.update({
            where: {
                id: Number(bugId),
            },
            data: {
                priority: priority,
            },
        });
        res.json(updatedBug);
    }
    catch (error) {
        res.status(500).json({ message: `Error updating bug: ${error.message}` });
    }
});
exports.updateBugPriority = updateBugPriority;
//Get Bugs by Signed-in User
const getUserBugs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const bugs = yield prisma.bug.findMany({
            where: {
                OR: [
                    { authorUserId: Number(userId) },
                    { assignedUserId: Number(userId) },
                ],
            },
            include: {
                // Include the 'author' (Bug creator) and 'assignee' (person assigned)
                author: {
                    select: {
                        username: true, // Only select 'username' from the 'author' user
                        firstName: true,
                        lastName: true,
                    },
                },
                assignee: {
                    select: {
                        username: true, // Only select 'username' from the 'assignee' user
                        firstName: true,
                        lastName: true,
                    },
                },
                // Include comments with the username of the user who commented
                comments: {
                    include: {
                        commentAuthor: {
                            select: {
                                username: true, // Fetch the 'username' from the 'user' who created the comment
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
        res.json(bugs);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving user's bugs: ${error.message}` });
    }
});
exports.getUserBugs = getUserBugs;
//Get One Bug
const getOneBug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bugId } = req.params;
    try {
        const bug = yield prisma.bug.findUnique({
            where: {
                id: Number(bugId)
            },
            include: {
                comments: true,
                attachments: true,
            },
        });
        res.json(bug);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving bug: ${error.message}` });
    }
});
exports.getOneBug = getOneBug;
