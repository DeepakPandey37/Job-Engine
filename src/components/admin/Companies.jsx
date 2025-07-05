import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { setfilter } from '@/redux/companySlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const Companies = () => {
  useGetAllCompany();
  const [input , setInput] = useState("");
 const navigate = useNavigate();
 const dispatch = useDispatch();
 useEffect(()=>{
  dispatch(setfilter(input));
 },[input])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto '>
            <div className="flex justify-between my-10">

             <Input
             className= "w-fit"
             placeholder="Search Here"
             onChange={(e)=>setInput(e.target.value)}/>
             <Button onClick={()=> navigate("/admin/companies/create")}>New company</Button>

            </div>
             <CompanyTable/>
        </div>
        
    </div>
  )
}

export default Companies