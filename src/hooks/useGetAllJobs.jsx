import React, { useEffect } from 'react'
import { JOB_API_ENDPOINT } from '@/utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { setAlljobs } from '@/redux/jobSlice';
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';


const useGetAllJobs = () => {
  const {searchQuery} = useSelector(store=>store.job);
    const dispatch= useDispatch();
 useEffect(()=>{
          const fetchalljobs= async()=>{
            try{
  const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`,{withCredentials: true, } );
  if(res.data.success){
 dispatch(setAlljobs(res.data.jobs));

  }
            }catch(error){
              console.log(error);
              
          }
            
          }
          fetchalljobs();    
 },[]);
}

export default useGetAllJobs