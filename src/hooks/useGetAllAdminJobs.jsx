import React, { useEffect } from 'react';
import { JOB_API_ENDPOINT } from '@/utils/api';
import { useDispatch } from 'react-redux';
import { setallAdminJobs } from '@/redux/jobSlice';
import { toast } from "sonner";
import axios from "axios";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`, {
          withCredentials: true,
        });
        console.log("ADMIN JOBS RESPONSE:", res.data);

        if (res.data.success) {
          dispatch(setallAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch jobs.");
      }
    };

    fetchAllJobs();
  }, [dispatch]); // Added dispatch here
};

export default useGetAllAdminJobs;
