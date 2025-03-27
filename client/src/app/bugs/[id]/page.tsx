"use client"

import React, { useState } from 'react'

import Header from '@/components/Header'
import OneBugCard from '@/components/OneBugCard'
import { useGetOneTaskQuery, useGetOneBugQuery } from '@/state/api';
import ModalNewComment from '@/components/ModalNewComment';

type Props = {
  params: { id: string };
  };

const OneBug = ({ params }: Props) => {
  const [isModalNewCommentOpen, setIsModalNewCommentOpen] = useState(false);
  const { id } = params;
    const {
      data: bug,
      isLoading,
      error,
    } = useGetOneBugQuery({ bugId: Number(id) });

    console.log(bug)

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading bug</div>;
  }

  // If the bug doesn't exist or there is no data
  if (!bug) {
    return <div>Bug not found</div>;
  }
  return (
    <div className="flex w-full flex-col p-8">
      <ModalNewComment
        isOpen={isModalNewCommentOpen}
        onClose={() => setIsModalNewCommentOpen(false)}
      />
      <Header
        name="Bug"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewCommentOpen(true)}
          >
            Add Comment
          </button>
        }
      />
      <OneBugCard bug={bug}/>
    </div>
  )
}

export default OneBug