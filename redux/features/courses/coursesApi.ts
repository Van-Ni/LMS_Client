import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "course",
                method: "POST",
                body: data,
                credentials: "include" as const,
                headers: {
                    "Content-Type": `multipart/form-data;`
                }
            }),
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: "course/admin/all-courses",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        deleteCourse: builder.mutation({
            query: ({ id }) => ({
                url: `course/admin/delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const
            }),
        }),
    }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation } = courseApi;
