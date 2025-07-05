import { createSlice } from "@reduxjs/toolkit";
const applicantSlice = createSlice({
    name:"ApplicantSlice",
    initialState:{
     applicants:[],
    },
    reducers:{
      setApplicants:(state,action)=>{
        state.applicants =action.payload;
      }
    },
});
export const{setApplicants} = applicantSlice.actions;
export default applicantSlice.reducer;
