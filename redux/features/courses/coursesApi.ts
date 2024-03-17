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
    }),
});

export const { useCreateCourseMutation } = courseApi;
