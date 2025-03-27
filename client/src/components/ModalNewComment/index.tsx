import React, { useState } from 'react'
import { format } from "date-fns";

import { Task, Bug, Comment, useCreateCommentMutation } from '@/state/api';
import Modal from '../Modal';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    id?: string | null;
  };

const ModalNewComment = ({ isOpen, onClose, id = null }: Props) => {
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [text, setText] = useState("");
  const [taskId, setTaskId] = useState("");
  const [bugId, setBugId] = useState("");
  const [userId, setUserId] = useState("");


  const handleSubmit = async () => {
    // if (!text || !userId || !(id !== null || taskId) || !(id !== null || bugId)) return;

    await createComment({
      text,
      taskId: Number(taskId),
      bugId: Number(bugId),
      userId: 1, 
    });
  };

  const isFormValid = () => {
    return text && userId && !(id !== null || taskId || bugId);
  };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Comment">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          className={inputStyles}
          placeholder="Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600`}
        //     ${
        //     !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
        //   }`}
        //   disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Comment"}
        </button>
      </form>
    </Modal>
  )
}

export default ModalNewComment