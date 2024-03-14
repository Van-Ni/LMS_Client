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
        editProfile: builder.mutation({
            query: ({ name }) => ({
                url: "user/update-user-info",
                method: "PUT",
                body: {
                    name
                },
                credentials: "include" as const
            }),
        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "user/update-user-password",
                method: "PUT",
                body: {
                    oldPassword, newPassword
                },
                credentials: "include" as const
            }),
        }),
    }),
});

export const { useUpdateAvatarMutation, useEditProfileMutation, useUpdatePasswordMutation } = userApi;
