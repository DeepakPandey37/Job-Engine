import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { USER_API_ENDPOINT } from "../../utils/api";

import axios from "axios";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [input, setInput] = useState({
    fullname:"",
    email:"",
    password:"",
    phoneNumber:"",
    role:"",
    file:""

  });
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const changeEventHandler = (e)=> {
   setInput({...input, [e.target.name] :e.target.value});
  }
  const changeFileHandler = (e)=>{
    setInput({...input, file:e.target.files?.[0]});
  }
  const submitHandler = async(e)=>{
     e.preventDefault();
     
     const formData = new FormData();
     formData.append("fullname", input.fullname);
     formData.append("email", input.email);
     formData.append("password", input.password);
     formData.append("phoneNumber", input.phoneNumber);
     formData.append("role", input.role);
     if(input.file){
      formData.append("file", input.file);
     }
     
     try{
      
       const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers:{
          "Content-Type": "multiple/form-data"
        },
       withCredentials:true,
       });
       if(res.data.success){
        navigate("/login")
        toast.success(res.data.message);
       }
     }catch(error){
         console.log(error);
     }
  }
    return (
    <div>
      <Navbar />
      <div className=" flex items-center justify-center mx-auto max-w-7xl">
        <form onSubmit={submitHandler} className="w-1/2 bg-gray-50  rounded-md p-4 my-10 ">
          <h1 className="font-bold text-xl mb-5"> SignUp</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input 
            type="text"
             placeholder="Enter full Name"
             value={input.fullname}            
             name="fullname"
             onChange={changeEventHandler}
             className="mt-2"
             />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email"
             value={input.email}            
             name="email"
             onChange={changeEventHandler}
             placeholder="Email"
             className="mt-2" />
          </div>
          <div className="my-2">
            <Label>PhoneNumber</Label>
            <Input type="number"
            value={input.phoneNumber}            
            name="phoneNumber"
            onChange={changeEventHandler} 
             placeholder="Phonenumber"
             className="mt-2" />
          </div>
          <div className="my-2 ">
            <Label>Password</Label>
            <Input type="Password" 
            value={input.password}            
            name="password"
            onChange={changeEventHandler}
            placeholder="password"
            className="mt-2" />
          </div>
          <div className=" my-2 flex justify-between ">
            <RadioGroup defaultValue="option-one" className="flex items-center gap-4 my-5 ">
              <div className="flex items-center space-x-2">
                <Input              
               type="radio"              
               value="student"           
               name="role"
               checked={input.role ==="student"}
               onChange={changeEventHandler}
               
               className="cursor-pointer"
                />
                
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input              
                type="radio"              
                value="recruiter"           
                name="role"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                
                className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>
                Profile
              </Label>
              <Input
              accept ="image/*"
              type="file"
              onChange={changeFileHandler}/>
            </div>
          </div>
          <Button type="submit" className="w-full my-4 mx-2">Signup</Button>
          <span> Already have an account? <Link to={"/login"} className="text-blue-700"> login </Link> </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
