import { createSlice } from "@reduxjs/toolkit"; // Corrected import statement

const initialState = {
    user: "",
    token: ""// Initial state should contain the user property initialized to null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action) => {
            state.token = action.payload.token;
        },
        userLoggedIn: (state, action) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user; // Added user assignment
        },
        userLoggedOut: (state) => {
            state.token = ""; // Reset token
            state.user = ""; // Reset user
        },
    },
});

export const { userRegistration, userLoggedIn } = authSlice.actions;

export default authSlice.reducer;
