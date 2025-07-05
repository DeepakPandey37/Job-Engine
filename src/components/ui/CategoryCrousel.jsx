import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Item } from '@radix-ui/react-radio-group'
import { Button } from './button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setsearchQuery } from '@/redux/jobSlice'



const category = [
    "Frontend Developer",
    "Backend Developer",
    "fullstack Developer",
    "devops Developer",
    "api Developer"
]
const CategoryCrousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const searchJobHandler = (query)=>{
         dispatch(setsearchQuery(query));
         navigate("/browse");
  }
  return (
    <div>
<Carousel className="w-full max-w-xl mx-auto my-10"  opts={{
    align: "start",
    loop: true,

  }}>
  <CarouselContent>
    {
        category.map((cat,index)=>(
            <CarouselItem  className="md:basis-1/2 lg:basis-1/3" key={index}> <Button onClick={()=>searchJobHandler(cat)} className="bg-white text-gray-700 " variant="ghost" >{cat}</Button> 
            </CarouselItem>
        ))

        
    }
    
  </CarouselContent>
  <CarouselNext/>
    <CarouselPrevious/>
</Carousel>

    </div>
  )
}

export default CategoryCrousel