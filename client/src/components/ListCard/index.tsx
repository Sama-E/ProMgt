import Image from 'next/image'
import React from 'react'

import { Task } from "@/state/api";
import { format } from "date-fns";

type Props = {
  task: Task;
};

const ListCard = ({ task }: Props) => {
  return (
    <>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
        {task.attachments && task.attachments.length > 0 && (
          <div>
          {task.attachments && task.attachments.length > 0 && (
            <Image 
              className="size-12 flex-none rounded-full bg-gray-50" 
              src={`/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={100}
              height={50}
            />
          )}
          </div>
        )}
          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-500">{task.title}</p>
            <p className="mt-1 truncate text-xs/5 text-gray-500">{task.status}</p>
          </div>
        </div>
        <div className="sm:flex sm:flex-col sm:items-end">
          <p className="text-sm/6 text-gray-500">{task.priority}</p>
          
          <p className="mt-1 text-xs/5 text-gray-500">Due: <time>{task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}</time></p>
        </div>
      </li>
    </>
  );
}

export default ListCard