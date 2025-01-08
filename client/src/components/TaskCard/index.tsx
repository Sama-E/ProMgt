import React from "react";
import Image from "next/image";

import { Task, Comment, useGetOneTaskQuery } from "@/state/api";
import { format } from "date-fns";
import CommentCard from "../CommentCard";
import Link from "next/link";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const comments = task.comments

  return (
    <Link href={`/tasks/${task.id}`}>
    <div className="flex flex-col m-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white w-2/5">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <b>Attachments:</b>
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
        <b>ID:</b> {task.id}
      </p> */}
      <p>
        <b>Title:</b> {task.title}
      </p>
      <p>
        <b>Description:</b>{" "}
        {task.description || "No description provided"}
      </p>
      <p>
        <b>Status:</b> {task.status}
      </p>
      <p>
        <b>Priority:</b> {task.priority}
      </p>
      <p>
        <b>Tags:</b> {task.tags || "No tags"}
      </p>
      <p>
        <b>Start Date:</b>{" "}
        {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
      </p>
      <p>
        <b>Due Date:</b>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
      </p>
      <p>
        <b>Author:</b>{" "}
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p>
        <b>Assignee:</b>{" "}
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
      <p>
        <section className="rounded-lg border-1 border-gray-600 my-4 w-full">
          <ul role="list" className="grid grid-cols-1 gap-4 divide-y divide-gray-200">
            {comments?.map((comment: Comment) => <CommentCard key={comment.id} comment={comment} />)}
          </ul>
        </section>
      </p>
    </div>
  </Link>
  );
};

export default TaskCard;