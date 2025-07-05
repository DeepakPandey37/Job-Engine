import React from 'react'
import JobsCards from './JobsCards';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const LatestJobs = () => {
  const { alljobs } = useSelector((store) => store.job);
 

  return (
    <div> 
      <div>
        <span className='ml-10 text-4xl font-bold'>
          Highest Rated & Latest <span className="font-bold text-purple-700">Jobs</span>
        </span>
      </div>

      <div className='grid grid-cols-3 gap-4 mt-3 ml-7'>
        {
          alljobs?.length !== 0
          ? alljobs.slice(0, 6).map((item, index) => (
              <JobsCards  key={item._id || index} job={item} />
            ))
          : <span>No jobs found</span>
        }
      </div>
    </div>
  );
};

export default LatestJobs;
