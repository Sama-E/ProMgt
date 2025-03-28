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
exports.getOneComment = exports.createComment = exports.getComments = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// TASKS or BUGS COMMENTS
//Get Comments
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.query;
    try {
        const comments = yield prisma.comment.findMany({
            where: {
                taskId: Number(taskId),
            },
            // include: {
            //   author: Number(authorUserId),
            // },
        });
        res.json(comments);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving comments: ${error.message}` });
    }
});
exports.getComments = getComments;
//Create a Comment for a Task with Task Author User
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, taskId, bugId, authorUserId, } = req.body;
    try {
        const newComment = yield prisma.comment.create({
            data: {
                text,
                taskId,
                bugId,
                authorUserId,
            },
        });
        res.status(201).json(newComment);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating a comment: ${error.message}` });
    }
});
exports.createComment = createComment;
//Get One Comment
const getOneComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.params;
    try {
        const comment = yield prisma.comment.findUnique({
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
        res.json(comment);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving comment: ${error.message}` });
    }
});
exports.getOneComment = getOneComment;
