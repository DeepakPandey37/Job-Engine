import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from './ui/avatar'
import { Badge } from "@/components/ui/badge"
import { Link, useNavigate } from 'react-router-dom'
const Jobspart = ({job}) => {
  const navigate = useNavigate();
  //const jobid = "id:122332";
  
  return (
    <div  className='p-5 rounded-xl shadow-2xl bg-white border border-gray-200'>
      {/* Top row with time and bookmark button */}
      <div  className='flex items-center justify-between'>
      <p>{new Date(job?.company?.createdAt).toLocaleDateString()}</p>
      <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Main content with avatar and job details */}
      <div className="flex items-start gap-4 my-4">
        {/* Avatar container */}
        <Button variant="outline" className="p-0" size="icon">
          <Avatar>
            <AvatarImage 
              src={job?.company?.logo}
              alt="Company Logo" 
            />
          </Avatar>
        </Button>

        {/* Job details container */}
        <div className="flex flex-col">
          {/* Company info */}
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">{job?.company?.name}</h1>
            <p className="text-sm text-gray-500">{job?.location}</p>
          </div>

          {/* Job title and description */}
          <div className="mt-2">
            <h1 className="font-bold text-xl">{job?.title}</h1>
            <p className="text-gray-700">
            {job?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className='flex items-center gap-4 mt-5'>
        <Badge variant="ghost" className="text-red-700 font-bold">{job?.position}</Badge>
        <Badge variant="ghost" className="text-indigo-800 font-bold">{
      job?.jobType}</Badge>
        <Badge variant="ghost" className="text-green-700 font-bold">{job?.salary}</Badge>
      </div>

      {/* Action buttons: Save for Later and Details */}
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline" className="flex-1">
          Save for Later
        </Button>
        <Button variant="default" className="flex-1" onClick={()=>navigate(`/description/${job?._id}`)}>
          Details
        </Button>
      </div>
    </div>
  )
}

export default Jobspart
