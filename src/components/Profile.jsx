import React, { useState } from "react";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Pen, Mail, Contact } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import AppliedJobsTable from "./AppliedJobsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetUserProfile from "@/hooks/useGetUserProfile";


const Profile = () => {
  useGetUserProfile();
 // const skills = ["html", "css", "js", "reactjs"];
 const isResume=true;
 const {user} = useSelector(store=> store.auth);
 const [open , setOpen]=useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage 
  className="rounded-full object-cover h-full w-full" src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>
              {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button className="text-right" variant="outline" onClick={()=> setOpen(true)}>
            <Pen />
          </Button>
        </div>

        <div className="my-6">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            {/* Replace Contact with a valid icon or component */}
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
          {user?.profile?.skills ? (
            user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
          ) : (
            <span>No skills found</span>
          )}

          </div>
          <div className="grid  w-full max-w-sm items-center gap-2"> 
            <Label className="text-md font-bold">Resume</Label>
            {
              isResume?<a target='blank' href={user?.profile?.resume} className="text-blue-600 ">{
                user?.profile?.resumeOriginalName}</a> : <span>No resume found</span>
            }
          </div>
          <div>
            <h1> Applied Jobs</h1>
            {/* applied job table */}
            <AppliedJobsTable/>
          </div>
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
