import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "companySlice",
  initialState: {
    singleCompany: null,
    companies:[],
    filter:" ",
  },
  reducers: {
    setsingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setcompanies: (state, action) => {
      state.companies = action.payload;
    },
    setfilter:(state,action)=>{
      state.filter = action.payload;
    }
  },
});

export const { setsingleCompany, setcompanies , setfilter } = companySlice.actions; // ✅ fix here
export default companySlice.reducer;
