import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export interface Project {
    id: number;
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status?: Status;
    priority?: Priority;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    points?: number;
    projectId: number;
    authorUserId?: number;
    assignedUserId?: number;
  
    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[];
}

export enum Status {
    ToDo = "To Do",
    WorkInProgress = "Work In Progress",
    UnderReview = "Under Review",
    Completed = "Completed",
}

export enum Priority {
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog",
}

export interface Comment {
    id: number;
    text: string;
    taskId: number;
    userId: number;
    user?: User;
}

export interface Attachment {
    id: number;
    fileURL: string;
    fileName: string;
    taskId: number;
    uploadedById: number;
}

export interface User {
    userId?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePictureUrl?: string;
    cognitoId?: string;
    teamId?: number;
    teamName?: string;
}

export interface Team {
    teamId: number;
    teamName: string;
    productOwnerUserId?: number;
    projectManagerUserId?: number;
}

export interface SearchResults {
    tasks?: Task[];
    projects?: Project[];
    users?: User[];
}

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        // prepareHeaders: async (headers) => {
        //     const session = await fetchAuthSession();
        //     const { accessToken } = session.tokens ?? {};
        //     if (accessToken) {
        //       headers.set("Authorization", `Bearer ${accessToken}`);
        //     }
        //     return headers;
        //   },
    }),
    reducerPath: "api",
    tagTypes: ["Projects", "Tasks", "Users", "Teams", "Comments", "Task"],
    endpoints: (build) => ({
        
        //PROJECTS
        //Get Projects - Array
        getProjects: build.query<Project[], void>({
            query: () => "projects",
            providesTags: ["Projects"],
        }),
        //Create Projects
        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "projects",
                method: "POST",
                body: project,
            }),
            invalidatesTags: ["Projects"],
        }),

        //TASKS
        //Get All Tasks - Array
        getTasks: build.query<Task[], { projectId: number }>({
            query: ({ projectId }) => `tasks?projectId=${projectId}`,
            providesTags: (result) =>
              result
                ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
                : [{ type: "Tasks" as const }],
        }),
        //Get Task by User - Array
        getTasksByUser: build.query<Task[], number>({
            query: (userId) => `tasks/user/${userId}`,
            providesTags: (result, error, userId) =>
                result
                ? result.map(({ id }) => ({ type: "Tasks", id }))
                : [{ type: "Tasks", id: userId }],
        }),
        //Get One Task
        getOneTask: build.query<Task, { taskId: number }>({
            query: ({ taskId }) => `tasks/${taskId}`,
            providesTags: (result, error, { taskId }) =>
              result
                ? [{ type: 'Task', id: taskId }]  // Cache the task by its ID
                : [],  // If no result (error or empty), don't cache
          }),
        //Create Task
        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks"],
        }),
        //Update Task Status
        updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
            query: ({ taskId, status }) => ({
                url: `tasks/${taskId}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (result, error, { taskId }) => [
                { type: "Tasks", id: taskId },
            ],
        }),
        //Update Task Priority
        updateTaskPriority: build.mutation<Task, { taskId: number; priority: string }>({
            query: ({ taskId, priority }) => ({
                url: `tasks/${taskId}/priority`,
                method: "PATCH",
                body: { priority },
            }),
            invalidatesTags: (result, error, { taskId }) => [
                { type: "Tasks", id: taskId },
            ],
        }),
        //Create Comment
        createComment: build.mutation<Comment, Partial<Comment>>({
            query: (comment) => ({
                url: "comments",
                method: "POST",
                body: comment,
            }),
            invalidatesTags: ["Comments"],
        }),
        //Create Comment for One Task
        // createComment: build.mutation<Comment, { taskId: number, text: string, userId: number, comment: Partial<Comment> }>({
        //     query: ({ taskId, comment }) => ({
        //       url: `tasks/${taskId}/comments`,
        //       method: "POST",
        //       body: comment,
        //     }),
        //     // Invalidate only the comments tag for the specific task
        //     invalidatesTags: (result, error, { taskId }) => [{ type: 'Comments', id: taskId }],
        //   }),          
        //Get Comments for One Task
        getCommentsForTask: build.query<Comment[], { taskId: number }>({
            query: ({ taskId }) => `tasks/${taskId}/comments`,  // Endpoint to fetch comments for a specific task
            providesTags: (result, error, { taskId }) => 
              result ? [{ type: 'Comments', id: taskId }] : [], // Cache comments by taskId
          }),
          
        

        //USERS
        //Get Users - Array
        getUsers: build.query<User[], void>({
            query: () => "users",
            providesTags: ["Users"],
        }),
        //Get Author User - Object
        // getAuthUser: build.query({
        //     queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        //         try {
        //         const user = await getCurrentUser();
        //         const session = await fetchAuthSession();
        //         if (!session) throw new Error("No session found");
        //         const { userSub } = session;
        //         const { accessToken } = session.tokens ?? {};
        
        //         const userDetailsResponse = await fetchWithBQ(`users/${userSub}`);
        //         const userDetails = userDetailsResponse.data as User;
        
        //         return { data: { user, userSub, userDetails } };
        //         } catch (error: any) {
        //         return { error: error.message || "Could not fetch user data" };
        //         }
        //     },
        // }),

        //TEAMS
        //Get Teams - Array
        getTeams: build.query<Team[], void>({
            query: () => "teams",
            providesTags: ["Teams"],
        }),

        //SEARCH
        search: build.query<SearchResults, string>({
            query: (query) => `search?query=${query}`,
        }),

    }),
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useGetTasksQuery,
    useGetOneTaskQuery,
    useCreateTaskMutation,
    useUpdateTaskStatusMutation,
    useUpdateTaskPriorityMutation,
    useCreateCommentMutation,
    useGetCommentsForTaskQuery,
    useSearchQuery,
    useGetUsersQuery,
    useGetTeamsQuery,
    useGetTasksByUserQuery,
    // useGetAuthUserQuery,
  } = api;