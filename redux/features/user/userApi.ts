import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (formData) => ({
                url: "user/update-user-avatar",
                method: "PUT",
                body: formData,
                credentials: "include" as const,
            }),
        }),
    }),
});

export const { useUpdateAvatarMutation } = userApi;
