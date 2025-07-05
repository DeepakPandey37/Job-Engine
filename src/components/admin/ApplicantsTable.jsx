
import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/api";
import { toast } from "sonner";

const ApplicantsTable = () => {
  const {applicants} = useSelector(store=> store.applicants);
  const actionselect = ["Accepted","rejected"];
  const statusHandler = async (id,status)=>{
    try{
      axios.defaults.withCredentials=true;
       const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,{status},{withCredentials:true});
       if(res.data.success){
         toast.success(res.data.message);
       }
    }catch(error){
     console.log(error);
    }
  }
  return (
    <div className="">
      <Table>
        <TableCaption>List of your Job Applicants</TableCaption>
        
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {
            applicants?.applications?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>
                  <a
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                </TableCell>
                <TableCell>{item?.applicant?.phoneNumber || "N/A"}</TableCell>
                <TableCell>{new Date(item?.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-gray-100 shadow-2xl items-center justify-center font-semibold">
                      {actionselect.map((status, index) => (
                        <div key={index} onClick={()=>statusHandler(item?._id,status)} className="cursor-pointer hover:bg-gray-200 p-1 rounded">
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
            
          }
         
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
