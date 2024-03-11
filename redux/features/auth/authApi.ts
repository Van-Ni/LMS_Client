import { apiSlice } from "../api/apiSlice"; // Assuming this is the correct import path
import { userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {
    // Define the structure of your registration data here
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "user/registration", // Corrected typo in the URL
                method: "POST",
                body: data,
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userRegistration({ token: result.data.activationToken }));
                } catch (error) {
                    console.log(error);
                    // Handle error if needed
                }
            },
        }),
        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                method: "POST",
                url: "user/activate-user",
                body: {
                    activation_token,
                    activation_code
                }
            }),
        }),
    }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;
