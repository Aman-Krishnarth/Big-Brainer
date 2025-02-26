import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
    name: "article",
    initialState: {
        articles: [],
    },
    reducers: {
        setArticles: (state, action) => {
            console.log("set articles waale mein hu");
            console.log(action);
            state.articles = action.payload;
            console.log("set kar diya hai");
            console.log(state.articles)
        },
    },
});

export const { setArticles } = articleSlice.actions;

export default articleSlice.reducer;
