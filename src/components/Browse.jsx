import React, { useEffect } from 'react'
//const randomJobs = [1,2,3,4,5,6]
import Jobspart from './Jobspart'
import Navbar from './shared/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { setsearchQuery } from '@/redux/jobSlice'
const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const {alljobs} = useSelector(store=>store.job);
  
  useEffect(()=>{
    return ()=>{
      dispatch(setsearchQuery(""));
    }
  },[]);
  return (
    <div>
        <Navbar/>
        <div className="max-w-7xl mx-auto my-10 ">
       
            <h1 className='font-bold text-2xl'>Search Results ({alljobs.length})</h1>
           <div className="grid grid-cols-3 gap-5 mt-7">
            {
                alljobs.map((job)=>{
                    return <div>
                        <Jobspart key={job._id} job={job}/>
                        </div>
                })
            }

           </div>
        </div>
    </div>
  )
}

export default Browse