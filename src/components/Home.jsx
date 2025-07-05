import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import { useDispatch } from 'react-redux';
import HeroSection from './HeroSection'
import CategoryCrousel from './ui/CategoryCrousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { clearFilters } from '@/redux/jobSlice';
const Home = () => {
  const dispatch = useDispatch();
  useGetAllJobs();
   useEffect(() => {
    dispatch(clearFilters());
  }, [dispatch]);
  return (
    <div>
        <Navbar/>
           <HeroSection/>
           <CategoryCrousel/>
           <LatestJobs/>
           <div className='mt-7'>
           <Footer/>
           </div>
          
    </div>
  )
}

export default Home