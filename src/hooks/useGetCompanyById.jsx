import React, { useEffect } from 'react'
import { COMPANY_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/api'
import { useDispatch } from 'react-redux'
import { setAlljobs } from '@/redux/jobSlice';
import { toast, Toaster } from "sonner";
import axios from "axios";
import { setsingleCompany } from '@/redux/companySlice';


const useGetCompanyById = ({companyId}) => {
    const dispatch= useDispatch();
 useEffect(()=>{
          const fetchSingleCompany= async()=>{
            try{
  const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`,{withCredentials: true, } );
  if(res.data.success){
 dispatch(setsingleCompany(res.data.company));

  }
            }catch(error){
              console.log(error);
              toast.error("Failed to fetch jobs.");
          }
            
          }
          fetchSingleCompany();    
 },[companyId,dispatch]);
}

export default useGetCompanyById