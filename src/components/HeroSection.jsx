import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setsearchQuery } from '@/redux/jobSlice'
const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query , setQuery] = useState("");
  const searchJobHandler = ()=>{
         dispatch(setsearchQuery(query));
         navigate("/browse");
  }
  return (
    <div  className='text-center'>
      <div className='mt-14 '>
      <span className=' text-xl py-2 px-2 rounded-xl font-normal bg-gray-100 mx-auto '> Rated <span className='text-red-700 font-extrabold'>R </span>Job Website </span>
      <h1 className='font-bold text-4xl mt-6'>What Are you waiting for? <br/>Just Hit on Search, & Get Your  <span className='text-red-600'>Dream</span><br/> <span className='text-purple-700 text-5xl'> 
        Job Today</span></h1>
        <p className='font-light text-grey-100 mt-6'>we are the best job website ever exist i bet you can't find better than us, so Join now </p>
      </div>
      <div className='mx-auto flex w-1/4 border-gray-100 mt-4 rounded-lg '>
 
    <div className="flex w-full max-w-sm items-center ">
      <Input type="text" placeholder="Search for Your dream Job" onChange={(e)=> setQuery(e.target.value)} />
      <Button type="submit" className="rounded-r-full ml-0.5 bg-purple-600" onClick={searchJobHandler}  ><Search className=''/></Button>
    </div>
  
      </div>
      


    </div>
  )
}
 //4:52 (from hero section)
export default HeroSection