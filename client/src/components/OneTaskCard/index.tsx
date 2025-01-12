import React, { useState } from 'react'
import { format } from "date-fns";

import { Task, Comment, useCreateCommentMutation, useGetCommentsForTaskQuery } from '@/state/api';
import Image from 'next/image';
import CommentCard from '../CommentCard';

type Props = {
  task: Task;
  comment: Comment;
  };

const OneTaskCard = ({ task }: Props) => {
  const [newComment, setNewComment] = useState<string>('');  // Local state for the comment input
  const [createComment, { isLoading, isError, isSuccess, error }] = useCreateCommentMutation(); // Hook for creating a comment
  const [text, setText] = useState("");
  // const { data: comments, isLoading: commentsLoading, error: commentsError } = useGetCommentsForTaskQuery({ taskId });

  const comments = task.comments;
  const taskId = task.id;

  // Handle comment submission
  const handleSubmit = async () => {
    if (!newComment.trim()) return; // Don't submit if comment is empty

    try {
      // Submit the new comment
      await createComment({
        text, 
        taskId,
        userId: 1
      });
      setNewComment('');  // Clear the textarea after submission
    } catch (err) {
      console.error('Failed to submit comment:', err);
    }
  };

  return (
    <div className="max-w-xl rounded overflow-hidden shadow-lg bg-white">
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          // src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={200}
          height={100}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{task.title}</div>
          <p className="text-gray-700 text-base">
          {task.description || "No description provided"}
          </p>
      </div>
      <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{task.priority}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{task.status}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{task.tags}</span>
      </div>
      <section className="rounded-lg border-1 border-gray-600 p-3 my-4 w-full">
        <h3 className="text-md font-bold mb-1">Comments</h3>
        {/* Comment Form
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <div className="mb-4">
            <textarea
              id="comment"
              name="comment"
              className="border border-gray-600 p-3 w-4/5 rounded"
              value={text}
              onChange={(e) => setText(e.target.value)} // Handle comment input change
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            disabled={isLoading}  // Disable button while submitting
          >
            {isLoading ? 'Submitting...' : 'Comment'}
          </button>
        </form>

        {isError && <p className="text-red-500 mt-2">Failed to submit comment. Please try again.</p>}
        {isSuccess && <p className="text-green-500 mt-2">Comment added successfully!</p>} */}

      <ul role="list" className="grid grid-cols-1 gap-4 divide-y divide-gray-100 ">
        {comments?.map((comment: Comment) => <CommentCard key={comment.id} comment={comment} />)}
      </ul>
      </section>
    </div>
  )
}

export default OneTaskCard