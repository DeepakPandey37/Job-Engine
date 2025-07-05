import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { setloading } from '@/redux/authslice';
import axios from 'axios';
import { JOB_API_ENDPOINT } from '@/utils/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PostJobs = () => {
    const { companies } = useSelector(store => store.company);
    const navigate = useNavigate();
    const [loading , setLoading]= useState(false);
    const [input, setInput] = useState({
      title: "",
      description: "",
      position: 0, // was 'positions'
      requirements: "",
      salary: "",
      location: "",
      jobType: "",
      experienceLevel: "", // was 'experience'
      companyId: ""
  });
  

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
          setLoading(false);
          const res = await axios.post(`${JOB_API_ENDPOINT}/post`,input,{withCredentials: true,});
          if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/jobs")
          }
        }catch(error){
          console.log(error);
        }

     };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany?._id || "" }); //Added a check if selectedCompany exists
    };

    return (
        <div>
            <Navbar />
            <h1 className='text-center text-4xl font-bold p-5'>Enter Job Fields here </h1>
            <div className="flex items-center w-screen my-5 justify-center">

                <form onSubmit={submitHandler} className='border rounded-md border-gray-200 p-5 bg-gray-50 shadow-2xl w-full max-w-2xl'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Changed gap-7 to gap-6 for better spacing */}
                        <div className="">
                            <Label htmlFor="title">Title</Label> {/* Added htmlFor for accessibility */}
                            <Input
                                id="title" // Added id to match htmlFor
                                type="text"
                                name="title" // Added name attribute, important for form data
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-2" // Changed my-3 to my-2 for spacing consistency
                                placeholder="Job Title" // Added placeholder
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="my-2"
                                placeholder="Job Description"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="positions">Positions</Label> {/* Changed Label text */}
                            <Input
                                id="positions"
                                type="number"
                                name="position" 
                               value={input.position}
                                onChange={changeEventHandler}
                                className="my-2"
                                placeholder="Number of Positions"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="requirements">Requirements</Label>
                            <Input
                                id="requirements"
                                type="text"
                                name="requirements" // Changed name to "requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="my-2"
                                placeholder="Job Requirements"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                id="salary"
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-2"
                                placeholder="Salary Range"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="experience">Experience (Years)</Label> {/* Added unit */}
                            <Input
                                id="experience"
                                type="number"
                                name="experienceLevel" 
                                value={input.experienceLevel}
                                onChange={changeEventHandler}
                                className="my-2"
                                placeholder="Years of Experience"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="my-2"
                                placeholder="Job Location"
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="jobType">Job Type</Label>
                            <Input
                                id="jobType"
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="my-2"
                                placeholder="Full-time, Part-time, etc."
                            />
                        </div>
                        {companies.length > 0 && (
                            <div className="">
                                <Label htmlFor="company">Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger id="company" className="w-full my-2"> {/* Added id for label */}
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies?.map((company) => (
                                                <SelectItem key={company._id} value={company?.name.toLowerCase()}>{company?.name}</SelectItem> //Added key
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    <Button type="submit" className="px-6 py-3 mt-6 w-full">Post New Job </Button> {/* Increased padding */}
                    {companies.length === 0 && (
                        <p className='text-sm text-red-700 mt-2'>*Please register a company before posting jobs</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJobs;
//11:40