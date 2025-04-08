"use client";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { format } from 'date-fns';

import { useAppSelector } from '@/app/redux';
import { Priority, Bug, useGetBugsByUserQuery } from '@/state/api';
import ModalNewBug from '@/components/ModalNewBug';
import Header from '@/components/Header';
import BugCard from '@/components/BugCard';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

type Props = {
    priority: Priority;
  };
  
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 100,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
          {params.value}
        </span>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 75,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 130,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 130,
      renderCell: (params) => 
          format(new Date(params.value), 'MM/dd/yy')
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 130,
      renderCell: (params) => 
        format(new Date(params.value), 'MM/dd/yy')
    },
    {
      field: "author",
      headerName: "Author",
      width: 150,
      renderCell: (params) => (params.value.firstName && params.value.lastName) ? `${params.value.firstName} ${params.value.lastName}` : "Unknown",
    },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 150,
      renderCell: (params) => (params.value.firstName && params.value.lastName) ? `${params.value.firstName} ${params.value.lastName}` : "Unassigned",
    },
  ];

const BugPriorityPage = ({priority}: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewBugOpen, setIsModalNewBugOpen] = useState(false);

  // const { data: currentUser } = useGetAuthUserQuery({});
  // const userId = currentUser?.userDetails?.userId ?? null;
  const userId = 1;

  const {
    data: bugs,
    isLoading,
    isError: isBugsError,
  } = useGetBugsByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredBugs = bugs?.filter(
    (bug: Bug) => bug.priority === priority,
  );

  if (isBugsError || !bugs) return <div>Error fetching bugs</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewBug
        isOpen={isModalNewBugOpen}
        onClose={() => setIsModalNewBugOpen(false)}
      />
      <Header
        name="Bugs"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewBugOpen(true)}
          >
            Add Bug
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div>Loading bugs...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredBugs?.map((bug: Bug) => (
            <BugCard key={bug.id} bug={bug} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredBugs && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredBugs}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  )
}

export default BugPriorityPage