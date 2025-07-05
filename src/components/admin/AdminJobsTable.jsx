import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Edit2, EyeIcon, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const formattedDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { alljobs, searchJob } = useSelector((store) => store.job);

  const [filteredJobs, setFilteredJobs] = useState(alljobs);

  useEffect(() => {
    const filtered = alljobs.filter((job) => {
      if (!searchJob) return true;
      return job?.companyName?.toLowerCase().includes(searchJob.toLowerCase()) || job?.title?.toLowerCase().includes(searchJob.toLowerCase());
    });
    setFilteredJobs(filtered);
  }, [searchJob, alljobs]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your searched Jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs?.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">No jobs found</TableCell>
            </TableRow>
          ) : (
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell> 
                <TableCell>{job?.title}</TableCell> 
                <TableCell>{formattedDate(job?.company?.createdAt)}</TableCell> 
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        className="flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() => navigate(`/admin/jobs/${job._id}`)} 
                      >
                        <Edit2 />
                        <span>Edit</span>
                      </div>
                      <div className=" flex gap-2 font-bold mt-3" onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}>
                        <EyeIcon/>
                        <span >Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
