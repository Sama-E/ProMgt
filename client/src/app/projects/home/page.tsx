"use client";

import React from "react";
import { format } from 'date-fns';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Priority,
  Project,
  Task,
  Bug,
  useGetProjectsQuery,
  useGetTasksQuery,
  useGetBugsQuery,
} from "@/state/api";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useAppSelector } from "@/app/redux";

const taskColumns: GridColDef[] = [
  { 
    field: "title", 
    headerName: "Title", 
    width: 200 
  },
  { 
    field: "status", 
    headerName: "Status", 
    width: 150 
  },
  { 
    field: "priority", 
    headerName: "Priority", 
    width: 150 
  },
  { 
    field: "dueDate", 
    headerName: "Due Date", 
    width: 150,
      renderCell: (params) => 
        format(new Date(params.value), 'MM.dd.yy') 
  },
  ];

  const bugColumns: GridColDef[] = [
    { 
      field: "title", 
      headerName: "Title", 
      width: 200 
    },
    { 
      field: "status", 
      headerName: "Status", 
      width: 150 
    },
    { 
      field: "priority", 
      headerName: "Priority", 
      width: 150 
    },
    { 
      field: "dueDate", 
      headerName: "Due Date", 
      width: 150,
        renderCell: (params) => 
          format(new Date(params.value), 'MM.dd.yy') 
    },
    ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
  // TASKS
  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") });

  // BUGS
  const {
    data: bugs,
    isLoading: bugsLoading,
    isError: bugsError,
  } = useGetBugsQuery({ projectId: parseInt("1") })
  
  // PROJECTS
  const { data: projects, isLoading: isProjectsLoading } = useGetProjectsQuery();

  // DARK MODE?
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || isProjectsLoading) return <div>Loading..</div>;
  if (tasksError || !tasks || !projects) return <div>Error fetching data</div>;

  if (bugsLoading || isProjectsLoading) return <div>Loading..</div>;
  if (bugsError || !bugs || !projects) return <div>Error fetching data</div>;

  // Priority Tasks
  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
        const { priority } = task;
        acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
        return acc;
    }, {},);

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
  name: key,
  count: priorityCount[key],
  }));

  // Priority Bugs
  const priorityBugCount = bugs.reduce(
    (acc: Record<string, number>, bug: Bug) => {
        const { priority } = bug;
        acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
        return acc;
    }, {},);

  const bugDistribution = Object.keys(priorityBugCount).map((key) => ({
  name: key,
  count: priorityBugCount[key],
  }));

  // Project Status
  const statusCount = projects.reduce(
    (acc: Record<string, number>, project: Project) => {
      // Ensure that endDate is not null or undefined
      const endDate = project.endDate ? new Date(project.endDate) : null;
      
      // Get today's date
      const today = new Date();
  
      // If endDate is before today, it's completed; otherwise, it's active
      const status = endDate && endDate <= today ? "Completed" : "Active";
  
      // Increment the count for the respective status
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, 
    {}
  );
  
  // Convert the status count into an array of objects
  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));
  

  // Merge the two datasets based on the 'name' field
  const combinedData = taskDistribution.map(task => {
    const correspondingBug = bugDistribution.find(bug => bug.name === task.name);
    return {
      name: task.name,
      taskCount: task.count,
      bugCount: correspondingBug ? correspondingBug.count : 0, // Default to 0 if no matching bug data
    };
  });

  // Chart Colors
  const chartColors = isDarkMode
  ? {
      bar: "#8884d8",
      barGrid: "#303030",
      pieFill: "#4A90E2",
      text: "#FFFFFF",
      taskBar: "#FF7F50", // Example color for tasks
      bugBar: "#8884d8",  // Example color for bugs
      }
  : {
      bar: "#8884d8",
      barGrid: "#E0E0E0",
      pieFill: "#82ca9d",
      text: "#000000",
      taskBar: "#FF7F50",
      bugBar: "#8884d8",
    };

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
      <Header name="Project Management Dashboard" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* PROJECTS */}
          <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Project Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                {projectStatus.map((entry, index) => (
                    <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    />
                ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Tasks and Bugs
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.barGrid} />
                <XAxis dataKey="name" stroke={chartColors.text} />
                <YAxis stroke={chartColors.text} />
                <Tooltip
                  contentStyle={{
                    width: "min-content",
                    height: "min-content",
                  }}
                />
                <Legend />
                {/* Bar for Tasks */}
                <Bar dataKey="taskCount" fill={chartColors.taskBar} name="Tasks" />
                {/* Bar for Bugs */}
                <Bar dataKey="bugCount" fill={chartColors.bugBar} name="Bugs" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* TASKS */}
          {/* <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskDistribution}>
                <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
                />
                <XAxis dataKey="name" stroke={chartColors.text} />
                <YAxis stroke={chartColors.text} />
                <Tooltip
                contentStyle={{
                    width: "min-content",
                    height: "min-content",
                }}
                />
                <Legend />
                <Bar dataKey="count" fill={chartColors.taskBar} />
              </BarChart>
            </ResponsiveContainer>
          </div> */}

          {/* BUGS */}
          {/* <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Bugs Priority Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bugDistribution}>
                <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
                />
                <XAxis dataKey="name" stroke={chartColors.text} />
                <YAxis stroke={chartColors.text} />
                <Tooltip
                contentStyle={{
                    width: "min-content",
                    height: "min-content",
                }}
                />
                <Legend />
                <Bar dataKey="count" fill={chartColors.bugBar} />
              </BarChart>
            </ResponsiveContainer>
          </div> */}

          {/* TASKS TABLE */}
          <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Your Tasks
            </h3>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={tasks}
                columns={taskColumns}
                checkboxSelection
                loading={tasksLoading}
                getRowClassName={() => "data-grid-row"}
                getCellClassName={() => "data-grid-cell"}
                className={dataGridClassNames}
                sx={dataGridSxStyles(isDarkMode)}
              />
            </div>
          </div>

          {/* BUGS TABLE */}
          <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
            My Bugs
            </h3>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={bugs}
                columns={bugColumns}
                checkboxSelection
                loading={bugsLoading}
                getRowClassName={() => "data-grid-row"}
                getCellClassName={() => "data-grid-cell"}
                className={dataGridClassNames}
                sx={dataGridSxStyles(isDarkMode)}
              />
            </div>
          </div>
        </div>
    </div>
  );
};

export default HomePage;