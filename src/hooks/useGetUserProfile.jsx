import { setallAppliedJobs, setAlljobs } from '@/redux/jobSlice';
import { APPLICATION_API_ENDPOINT } from '@/utils/api'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import React from 'react'

const useGetUserProfile = () => {
    const dispatch = useDispatch();
     useEffect(()=>{
        const fetchAppliedJobs = async()=>{
            try{
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`,{withCredentials:true});
                if(res.data.success){
                    //console.log(res);
                 dispatch(setallAppliedJobs(res.data.applications));
                }
             }catch(error){
            console.log(error);
             }
        }
        fetchAppliedJobs();
     },[])
}

export default useGetUserProfile