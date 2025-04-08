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
exports.createComment = exports.getComments = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//Get Comments
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId, bugId } = req.query;
    try {
        const whereCondition = {};
        // If taskId is provided, filter by taskId
        if (taskId) {
            whereCondition.taskId = Number(taskId); // Make sure taskId is a number
        }
        // If bugId is provided, filter by bugId
        if (bugId) {
            whereCondition.bugId = Number(bugId); // Make sure bugId is a number
        }
        // Fetch comments with the dynamically created whereCondition
        const comments = yield prisma.comment.findMany({
            where: whereCondition, // Dynamic filtering
            include: {
                author: {
                    select: {
                        firstName: true, // Fetch firstName of the author (User)
                        lastName: true, // Fetch lastName of the author (User)
                    },
                },
            },
        });
        // Send back the fetched comments as JSON
        res.json(comments);
    }
    catch (error) {
        // Handle any errors that occur during the database query
        console.error(error); // You can log the error for debugging purposes
        res.status(500).json({ message: "Error retrieving comments." });
    }
});
exports.getComments = getComments;
//Create Comments
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, taskId, bugId, userId } = req.body;
    try {
        const newComment = yield prisma.comment.create({
            data: {
                text,
                taskId,
                bugId,
                userId,
            },
        });
        res.status(201).json(newComment);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating a comment: ${error.message}` });
        // .json({ message: "Error creating a comment." });
    }
});
exports.createComment = createComment;
