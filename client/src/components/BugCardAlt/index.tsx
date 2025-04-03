import React from "react";
import Image from "next/image";

import { Bug } from "@/state/api";
import { format } from "date-fns";

type Props = {
  bug: Bug;
};


const BugCardAlt = ({ bug }: Props) => {

  return (
    <div className="m-3 max-w-sm w-full border rounded shadow bg-white dark:bg-dark-secondary dark:text-white">

        <div className="p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="font-bold text-l mb-2"> {bug.title}</div>
              <p><strong>Description:</strong> {bug.description || "No description provided"}</p>
              <p><strong>Tags:</strong> {bug.tags || "No tags"}</p>
              {/* <p><strong>Priority:</strong> {bug.priority}</p> */}
              <p><strong>Author:</strong>
              {bug.author ? bug.author.username : "Unknown"}
              </p>
              <p><strong>Assignee</strong>
              {bug.assignee ? bug.assignee.username : "Unassigned"}
              </p>
              <p><strong>Start Due:</strong>{bug.startDate ? format(new Date(bug.startDate), "P") : "Not set"}</p>
              <p><strong>Due Due:</strong>{bug.dueDate ? format(new Date(bug.dueDate), "P") : "Not set"}</p>
            </div>
            <div className="flex items-center">
              <p><span className="inline-block border rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{bug.priority}</span>
              </p>
              <p><span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{bug.status}</span></p>
            </div>
        </div>
    </div> 
  )
}

export default BugCardAlt