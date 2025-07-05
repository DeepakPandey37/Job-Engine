import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "../../utils/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setloading, setUser } from "@/redux/authslice";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";



const Login = () => {
   const [input, setInput] = useState({
      
      email:"",
      password:"",  
      role:"",
     
  
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading} = useSelector(store=>store.auth);
    const changeEventHandler = (e)=> {
     setInput({...input, [e.target.name] :e.target.value});
    }
   
    const submitHandler = async(e)=>{
      e.preventDefault();
      console.log("Axios check:", axios);
     
      
      try{
        dispatch(setloading(true));
        const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
         headers:{
           "Content-Type": "application/json"
         },
        withCredentials:true,
        });
        if(res.data.success){
          dispatch(setUser(res.data.payload))
         navigate("/")
         toast.success(res.data.message);
        }
      }catch(error){
        toast.error(error.response.data.message);
          console.log(error);
      }finally{
        dispatch(setloading(false));
       }
   } 
  return (
    <div>
      <Navbar />
      <div className=" flex items-center justify-center mx-auto max-w-7xl">
        <form onSubmit={submitHandler} className="w-1/2 bg-gray-50  rounded-md p-4 my-10 ">
          <h1 className="font-bold text-xl mb-5"> Login</h1>
         
          <div className="my-2">
            <Label>Email</Label>
             <Input type="email"
                         value={input.email}            
                         name="email"
                         onChange={changeEventHandler}
                         placeholder="Email"
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
          
          </div>
          {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
          
          <span> Already have an account? <Link to={"/signup"} className="text-blue-700"> Signup </Link> </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
