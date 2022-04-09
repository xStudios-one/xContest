import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLogged: false,
        isAdmin: false,
    },
    reducers: {
        login: (state) => {
            state.isLogged = true;
        },
        logout: (state) => {
            state.isLogged = false;
        },
        promote: (state) => {
            state.isAdmin = true;
        },
        demote: (state) => {
            state.isAdmin = false;
        },
    },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
