import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  issues: [],
  error: "",
  loading: true,
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    loadIssues: () => initialState,
    loadIssuesError: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
    loadIssuesSuccess: (state, { payload }) => ({
      ...state,
      issues: payload,
      loading: false,
    }),
  },
});

export const {
  loadIssues,
  loadIssuesError,
  loadIssuesSuccess,
} = issueSlice.actions;

export default issueSlice.reducer;
