import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import AdminJobsTable from './AdminJobsTable';
import { useNavigate } from 'react-router-dom';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setsearchJob } from '@/redux/jobSlice';
import { useDispatch } from 'react-redux';

const AdminJobs = () => {
  useGetAllAdminJobs(); // fetch all jobs
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchJob(input)); // dispatch the search input
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <div className="flex justify-between my-10">
          <Input
            className="w-fit"
            placeholder="Search for Role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
