import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/api";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setsingleCompany } from "@/redux/companySlice";

export const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyname] = useState("");
  const registerNewCompany = async () => {

    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/registerCompany`,
        {companyName},
        {
            headers: {
                'Content-Type': "application/json"
              },
              

          withCredentials: true,
        }
        
      );
      console.log(res);
      if(res?.data?.success){
        dispatch(setsingleCompany(res.data.company));
          toast.success(res.data.message);
          const companyId= res?.data?.company?._id;
          navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="">
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <div className="">
          <h1 className="font-bold text-2xl ">
            Enter The following details to register your company
          </h1>
          <p className="text-sm text-gray-400"> PS: You can change it later</p>
        </div>
        <div className="flex flex-col gap-3 my-10">
          <Label className="font-bold">Company Name:</Label>
          <Input
            type="text"
            placeholder="Enter Company Name"
            onChange={(e) => setCompanyname(e.target.value)}
          />
        </div>
        <div className="flex gap-6">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancle
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};
