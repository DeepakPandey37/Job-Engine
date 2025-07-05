import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/api";
import { setloading, setUser } from "@/redux/authslice";
import { toast, Toaster } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {}, {
        withCredentials: true,
      });
  
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };
  
  
    const {user}= useSelector(store=>store.auth);
  return (
    <div className="bg-white ">
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16">
        <div className="font-mono text-2xl">
          <Link to={"/"}><h1 className="text-2xl font-bold"> Job <span className="text-purple-600"> Engine</span> </h1> </Link>
        </div>
        <div className="flex items-center gap-2">
          <ul className="flex flex-row gap-5 items-center font-mono text-2xl">
            {
              user &&user.role === 'recruiter'?  (
           <> 
            <li><Link to={"/admin/companies"}>Companies </Link></li>
            <li><Link to={"/admin/jobs"}>Jobs </Link></li>
           </>
              ) : (
                             <>
                              <li><Link to={"/"}>Home </Link></li>
            <li><Link to={"/jobs"}>Jobs </Link></li>
            <li><Link to={"/browse"}>Browse </Link></li>
                             </>
              )
            }
           
          </ul>
           { 
            !(user) ? (
              <div>
                <Link to={"/login"}> <Button variant={"link"}> Login</Button></Link>
                <Link to={"/signup"}>  <Button> signup</Button></Link>
 
                </div>
              //3:48
            ) : (  
            
              <Popover >
            <PopoverTrigger asChild>
              <Avatar>
              <AvatarImage
    src={user?.profile?.profilePhoto || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.fullname)}
    className="w-10 h-10 rounded-full"
  />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="flex gap-2 ">
                <Avatar>
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  className="w-10 h-10 rounded-full"
                />
              </Avatar>
              <div>
              <h4 className="font-medium"> {user?.fullname} </h4>
              <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
              </div>
               
                </div>
                <div className="flex mt-3 items-center">
                  <User2/>
                  <Button variant={"link"}> <Link to={"/profile"}>View profile </Link></Button>
                  <LogOut/>
                  <Button variant={"link"} onClick={logoutHandler}>Log Out </Button>
                </div>
           
            </PopoverContent>
          </Popover>
            )
           }
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
