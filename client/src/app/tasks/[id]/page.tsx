"use client"

import React, { useState } from 'react'

import Header from '@/components/Header'
import OneTaskCard from '@/components/OneTaskCard'
import { useGetOneTaskQuery } from '@/state/api';
import ModalNewComment from '@/components/ModalNewComment';

type Props = {
  params: { id: string };
  };

const OneTask = ({ params }: Props) => {
  const [isModalNewCommentOpen, setIsModalNewCommentOpen] = useState(false);
  const { id } = params;
    const {
      data: task,
      isLoading,
      error,
    } = useGetOneTaskQuery({ taskId: Number(id) });

    console.log(task)

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading task</div>;
  }

  // If the task doesn't exist or there is no data
  if (!task) {
    return <div>Task not found</div>;
  }
  return (
    <div className="flex w-full flex-col p-8">
      <ModalNewComment
        isOpen={isModalNewCommentOpen}
        onClose={() => setIsModalNewCommentOpen(false)}
      />
      <Header
        name="Task"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewCommentOpen(true)}
          >
            Add Comment
          </button>
        }
      />
      <OneTaskCard task={task}/>
    </div>
  )
}

export default OneTask