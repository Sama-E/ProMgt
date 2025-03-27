import React from "react";
import Image from "next/image";

import { Bug, Comment, useGetOneBugQuery } from "@/state/api";
import { format } from "date-fns";
import CommentCard from "../CommentCard";
import Link from "next/link";

type Props = {
  bug: Bug;
};

const BugCard = ({ bug }: Props) => {
  const comments = bug.comments

  return (
    <Link href={`/bugs/${bug.id}`}>
    <div className="flex flex-col m-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white w-2/5">
      {bug.attachments && bug.attachments.length > 0 && (
        <div>
          <b>Attachments:</b>
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
        <b>ID:</b> {bug.id}
      </p> */}
      <p>
        <b>Title:</b> {bug.title}
      </p>
      <p>
        <b>Description:</b>{" "}
        {bug.description || "No description provided"}
      </p>
      <p>
        <b>Status:</b> {bug.status}
      </p>
      <p>
        <b>Priority:</b> {bug.priority}
      </p>
      <p>
        <b>Tags:</b> {bug.tags || "No tags"}
      </p>
      <p>
        <b>Start Date:</b>{" "}
        {bug.startDate ? format(new Date(bug.startDate), "P") : "Not set"}
      </p>
      <p>
        <b>Due Date:</b>{" "}
        {bug.dueDate ? format(new Date(bug.dueDate), "P") : "Not set"}
      </p>
      <p>
        <b>Author:</b>{" "}
        {bug.author ? bug.author.username : "Unknown"}
      </p>
      <p>
        <b>Assignee:</b>{" "}
        {bug.assignee ? bug.assignee.username : "Unassigned"}
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

export default BugCard;