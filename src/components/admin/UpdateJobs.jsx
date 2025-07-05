import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
// Redux no longer needed since we're not selecting companies
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from 'axios';
import { JOB_API_ENDPOINT } from '@/utils/api';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const UpdateJob = () => {
    // We no longer need companies from the store
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const jobId = params.id;
    
    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState(null);
    const [input, setInput] = useState({
        title: "",
        description: "",
        position: 0,
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        companyId: ""
    });

    // Fetch job data on component mount
    useEffect(() => {
        const fetchJobData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    const jobData = res.data.job;
                    setJob(jobData);
                    setInput({
                        title: jobData.title || "",
                        description: jobData.description || "",
                        position: jobData.position || 0,
                        requirements: jobData.requirements || "",
                        salary: jobData.salary || "",
                        location: jobData.location || "",
                        jobType: jobData.jobType || "",
                        experienceLevel: jobData.experienceLevel || "",
                        companyId: jobData.companyId || ""
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch job details");
            } finally {
                setLoading(false);
            }
        };

        if (jobId) {
            fetchJobData();
        }
    }, [jobId]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_ENDPOINT}/update/${jobId}`, input, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message || "Job updated successfully");
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update job");
        } finally {
            setLoading(false);
        }
    };

    // Company selection removed as requested

    if (loading && !job) {
        return (
            <div>
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <p className="text-lg">Loading job details...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <h1 className='text-center text-4xl font-bold p-5'>Update Job Details</h1>
            <div className="flex items-center w-screen my-5 justify-center">
                <form onSubmit={submitHandler} className='border rounded-md border-gray-200 p-5 bg-gray-50 shadow-2xl w-full max-w-2xl'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-2"
                                placeholder="Job Title"
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
                            <Label htmlFor="positions">Positions</Label>
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
                                name="requirements"
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
                            <Label htmlFor="experience">Experience (Years)</Label>
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
                        {/* Company selection removed as requested */}
                    </div>
                    <div className="flex gap-4 mt-6">
                        <Button 
                            type="submit" 
                            className="px-6 py-3 flex-1"
                            disabled={loading}
                            onClick={() => navigate("/")}
                        >
                            {/* {loading ? "Updating..." : "Update Job"} */}
                            Update Jobs

                        </Button>
                        <Button 
                            type="button" 
                            variant="outline"
                            className="px-6 py-3 flex-1"
                            onClick={() => navigate("/admin/jobs")}
                        >
                            Cancel
                        </Button>
                    </div>
                  
                </form>
            </div>
        </div>
    );
};

export default UpdateJob;