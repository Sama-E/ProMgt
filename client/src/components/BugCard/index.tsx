import React from "react";
import Image from "next/image";

import { Bug } from "@/state/api";
import { format } from "date-fns";
import CommentCard from "../CommentCard";

type Props = {
  bug: Bug;
};

const BugCard = ({ bug }: Props) => {
  const comments = bug.comments

  return (
    <div className="m-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {bug.attachments && bug.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            {bug.attachments && bug.attachments.length > 0 && (
              <Image
                src={`/${bug.attachments[0].fileURL}`}
                // src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${bug.attachments[0].fileURL}`}
                alt={bug.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}
      {/* <p>
        <strong>ID:</strong> {bug.id}
      </p> */}
      <p>
        <strong>Title:</strong> {bug.title}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {bug.description || "No description provided"}
      </p>
      <p>
        <strong>Status:</strong> {bug.status}
      </p>
      <p>
        <strong>Priority:</strong> {bug.priority}
      </p>
      <p>
        <strong>Tags:</strong> {bug.tags || "No tags"}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {bug.startDate ? format(new Date(bug.startDate), "P") : "Not set"}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {bug.dueDate ? format(new Date(bug.dueDate), "P") : "Not set"}
      </p>
      <p>
        <strong>Author:</strong>{" "}
        {bug.author ? `${bug.author.firstName} ${bug.author.lastName}` : "Unknown"}
      </p>
      <p>
        <strong>Assignee:</strong>{" "}
        {bug.assignee ? `${bug.assignee.firstName} ${bug.assignee.lastName}` : "Unassigned"}
      </p>
      <section className="rounded-lg border-1 border-gray-600 my-4 w-full">
          <ul role="list" className="grid grid-cols-1 gap-4 divide-y divide-gray-200">
            {/* {comments?.map((comment: Comment) => <CommentCard key={comment.id} comment={comment} />)} */}
          </ul>
        </section>
    </div>
  );
};

export default BugCard;