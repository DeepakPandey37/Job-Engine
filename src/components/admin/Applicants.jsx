import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/utils/api'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/redux/applicantSlice'

const Applicants = () => {
  const params = useParams();
  const {applicants} = useSelector((store)=> store.applicants);
  const dispatch = useDispatch();
  useEffect( ()=>{
    
      const fetchApplicants = async ()=>{
        try{
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,{withCredentials:true});
        if(res.data.success){
         // console.log(res);
          dispatch(setApplicants(res.data.job))
       //  toast.success(res.data.message);
        }
      }catch(error){
        console.log(error);
        toast.error(error.response.data.message);
      }     
    }
    fetchApplicants();
  },[])
  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto">
        <div className="">
        <h1 className='font-bold text-2xl'>Applicants {applicants?.applications?.length}</h1>

        </div>
        <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicants