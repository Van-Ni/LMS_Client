import { PayloadAction, createSlice } from "@reduxjs/toolkit"; // Corrected import statement

const initialState = {
    user: "",
    token: ""// Initial state should contain the user property initialized to null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
        userLoggedIn: (state, action) => {
            console.log('🚀 ~ userLoggedIn action:', action)
            state.token = action.payload.accessToken;
            state.user = action.payload.user; // Added user assignment
        },
        userLoggedOut: (state) => {
            state.token = ""; // Reset token
            state.user = ""; // Reset user
        },
        userInfo: (state, action) => {
            state.user = action.payload.user;
        },
    },
});

export const { userRegistration, userLoggedIn, userInfo, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
