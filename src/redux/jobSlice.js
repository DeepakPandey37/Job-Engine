import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobSlice",
  initialState: {
    alljobs: [],
    singleJob: null,
    allAdminJobs: [],
    searchJob: " ",
    allAppliedJobs: [],
    searchQuery: "",       // used for filtering
  },
  reducers: {
    setAlljobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setsingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setallAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setsearchJob: (state, action) => {
      state.searchJob = action.payload;
    },
    setallAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setsearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    // ✅ Simple filter reset action for Home page
    clearFilters: (state) => {
      state.searchQuery = "";
    },
  },
});

export const {
  setAlljobs,
  setsingleJob,
  setallAdminJobs,
  setsearchJob,
  setallAppliedJobs,
  setsearchQuery,
  clearFilters,        // ✅ Don't forget this
} = jobSlice.actions;

export default jobSlice.reducer;
