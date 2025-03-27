import React from 'react'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from 'date-fns';

import { useAppSelector } from '@/app/redux';
import { useGetBugsQuery } from '@/state/api';
import Header from '@/components/Header';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

type Props = {
    id: string;
    setIsModalNewBugOpen: (isOpen: boolean) => void;
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
          format(new Date(params.value), 'MM.dd.yy')
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 130,
      renderCell: (params) => 
        format(new Date(params.value), 'MM.dd.yy')
    },
    {
      field: "author",
      headerName: "Author",
      width: 150,
      renderCell: (params) => params.value?.username || "Unknown",
    },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 150,
      renderCell: (params) => params.value?.username || "Unassigned",
    },
  ];

  const TableView = ({ id, setIsModalNewBugOpen }: Props) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const {
      data: bugs,
      error,
      isLoading,
    } = useGetBugsQuery({ projectId: Number(id) });
  
    if (isLoading) return <div>Loading...</div>;
    if (error || !bugs) return <div>An error occurred while fetching bugs</div>;

    // console.log(bugs)

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewBugOpen(true)}
            >
              Add Bug
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={bugs || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  )
}

export default TableView