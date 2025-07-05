import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useSelector } from 'react-redux'
const AppliedJobsTable = () => {
  const {allAppliedJobs} = useSelector(store=>store.job)
  return (
    <div>
        <Table>
  <TableCaption>A list of Applied Jobs.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Date</TableHead>
      <TableHead>Job-Role</TableHead>
      <TableHead>Company</TableHead>
      <TableHead className="text-right">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   
      {
        allAppliedJobs?.map((item)=>(
          <TableRow key={item._id}>

    <TableCell className="font-medium"> {new Date(item?.createdAt).toLocaleString()}</TableCell>
      <TableCell>{item?.job?.title}</TableCell>
      <TableCell>{item?.job?.company?.name}</TableCell>
      <TableCell className="text-right">{
    item?.status}</TableCell>
          
    </TableRow>
        ))
      }
      
  </TableBody>
</Table>

    </div>
  )
}

export default AppliedJobsTable
//13:00