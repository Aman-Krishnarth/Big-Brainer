import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            console.log("SET USER MEIN HU BRO");
            console.log(action);
            state.user = action.payload;
        },
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
