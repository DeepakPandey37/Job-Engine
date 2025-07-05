import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'


const CompanyUpdate = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
         name:"",
         description:"",
         website:"",
         location:"",
         file:null
  });
  const {singleCompany} = useSelector(store=>store.company);
  const navigate = useNavigate();
       const changeEventHandler =(e)=>{
        setInput({...input, [e.target.name]:[e.target.value]});
       }
       const changeFileHandler =(e)=>{
        const file = e.target.files?.[0];
          setInput({...input,file})
       }
       const submitHandler = async(e)=>{
                    e.preventDefault();
                    console.log(input);
                    const formdata = new FormData();
                    formdata.append("name",input.name);
                    formdata.append("description",input.description);
                    formdata.append("website",input.website);
                    formdata.append("location",input.location);
                   if(input.file){
                    formdata.append("file",input.file);
                   }

                   try{
                    const companyId = params.id;
                       const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${companyId}`,formdata,{
                        headers:{
                          "Content-Type":"multipart/form-data"
                        },
                        withCredentials:true,
                       })
                       if(res.data.success){
                        toast.success(res.data.success);
                        navigate("/admin/companies")
                       }
                   }catch(error){
                    console.log(error);
                    toast.error(error.response.data.message);
                   }
                    
                   useEffect(()=>{
                    setInput({
                      name: singleCompany.name||"",
                      description:singleCompany.website||"",
                      website:singleCompany.description||"",
                      location:singleCompany.location||"",
                      file:singleCompany.name||null,
                    })
                   },[singleCompany])
       }

  return (
    <div>
      <Navbar/>
      <div className='max-w-2xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                  <div className="">
                    <Button onClick={() => navigate("/admin/companies")}>
                      <ArrowLeft/>
                      <span>Back</span>
                    </Button>
                  <h1 className='font-bold text-2xl my-10 '>Setup Your Company</h1>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="">
                  <Label className='font-bold' >Company Name:</Label>
                  <Input
                  type="text"
                  name="name"
                  placeholder="Enter Company Name" 
                  value={input.name}
                  onChange={changeEventHandler}
                  className="w-fit "/>
                    </div>
                    <div className="">
                  <Label className='font-bold'>Description:</Label>
                  <Input
                  type="text"
                  name="description"
                  placeholder="Enter Your Description" 
                  value={input.description}
                  onChange={changeEventHandler}
                  className="w-fit "/>
                    </div>
                    <div className="">
                  <Label className='font-bold' >Website:</Label>
                  <Input
                  type="text"
                  name="website"
                  placeholder="Enter website Name" 
                  value={input.website}
                  onChange={changeEventHandler}
                  className="w-fit "/>
                    </div>
                    <div className="">
                  <Label className='font-bold' >Location:</Label>
                  <Input
                  type="text"
                  name="location"
                  placeholder="Enter Location" 
                  value={input.location}
                  onChange={changeEventHandler}
                  className="w-fit "/>
                    </div>
                    <div className="">
                  <Label className='font-bold'>Logo:</Label>
                  <Input
                  type="file"
              
                  accept="image/*"
                 
                  
                  onChange={changeFileHandler}
                 />
                    </div>
                  </div>
                 <Button type="submit" className="my-10 w-full">Update</Button>
                </form>
      </div>
    </div>
  )
}

export default CompanyUpdate
//9,47