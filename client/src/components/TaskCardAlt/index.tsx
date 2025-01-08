import React from "react";
import Image from "next/image";

import { Task } from "@/state/api";
import { format } from "date-fns";

type Props = {
  task: Task;
};


const TaskCardAlt = ({ task }: Props) => {
  console.log(task)
  return (
    <div className="m-3 max-w-sm w-full border rounded shadow bg-white dark:bg-dark-secondary dark:text-white">

        <div className="p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="font-bold text-l mb-2"> {task.title}</div>
              <p><strong>Description:</strong> {task.description || "No description provided"}</p>
              <p><strong>Tags:</strong> {task.tags || "No tags"}</p>
              {/* <p><strong>Priority:</strong> {task.priority}</p> */}
              <p><strong>Author:</strong>
              {task.author ? task.author.username : "Unknown"}
              </p>
              <p><strong>Assignee</strong>
              {task.assignee ? task.assignee.username : "Unassigned"}
              </p>
              <p><strong>Start Due:</strong>{task.startDate ? format(new Date(task.startDate), "P") : "Not set"}</p>
              <p><strong>Due Due:</strong>{task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}</p>
            </div>
            <div className="flex items-center">
              <p><span className="inline-block border rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{task.priority}</span>
              </p>
              <p><span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{task.status}</span></p>
            </div>
        </div>
    </div> 
  )
}

export default TaskCardAlt