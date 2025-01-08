"use client"

import React from 'react'

import Header from '@/components/Header'
import OneTaskCard from '@/components/OneTaskCard'
import { useGetOneTaskQuery } from '@/state/api';

type Props = {
  params: { id: string };
  };

const OneTask = ({ params }: Props) => {
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
      <Header name="Task" />
      <OneTaskCard task={task}/>
    </div>
  )
}

export default OneTask