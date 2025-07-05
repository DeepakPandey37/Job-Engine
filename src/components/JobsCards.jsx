import React from 'react'
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const JobsCards = ({job}) => { 
  const navigate = useNavigate(); 
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-gray-100 mt-5 gap-4 border-2 cursor-pointer'>
      <div className=''>
        <h1 className=' text-xl font-bold '>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'> India </p>
      </div>
      <div className=''>
        <h1 className='font-bold text-lg'>{job?.title}</h1>
        <p className='text-sm text-gray-500'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-4 mt-5'>
      <Badge variant="ghost" className="text-red-700 font-bold"> Positions:{job?.position}</Badge>
      <Badge variant="ghost" className="text-indigo-800  font-bold">{job?.jobType}</Badge>
      <Badge variant="ghost" className="text-green-700 font-bold">{
    job?.salary} LPA</Badge>


      </div>
    </div>
  )
}

export default JobsCards
