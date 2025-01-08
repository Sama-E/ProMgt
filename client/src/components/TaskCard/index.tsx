import React from "react";
import Image from "next/image";

import { Task, Comment } from "@/state/api";
import { format } from "date-fns";
import CommentCard from "../CommentCard";

type Props = {
  task: Task;
  comment: Comment;
};



const TaskCard = ({ task }: Props) => {
  console.log(task.comments);
  const comments = task.comments

  return (
    <div className="flex flex-col m-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white w-2/5">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`/${task.attachments[0].fileURL}`}
                // src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}
      {/* <p>
        <strong>ID:</strong> {task.id}
      </p> */}
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {task.description || "No description provided"}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags || "No tags"}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
      </p>
      <p>
        <strong>Author:</strong>{" "}
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p>
        <strong>Assignee:</strong>{" "}
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
      <p>
        <section className="rounded-lg border-1 border-gray-600 my-4 w-full">
          <h3 className="text-md font-bold mb-1">Comments</h3>
          {/* Comment Form */}
          <form className="">
          <div className="mb-4">
              <textarea id="comment" name="comment" className="border border-gray-600 p-3 w-full rounded" required></textarea>
          </div>

          <button type="submit" className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600">
              Comment
          </button>
          </form>
        <ul role="list" className="grid grid-cols-1 gap-4 divide-y divide-gray-100">
          {comments?.map((comment: Comment) => <CommentCard key={comment.id} comment={comment} />)}
        </ul>
        </section>
      </p>
    </div>
  );
};

export default TaskCard;