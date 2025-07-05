import React, { useEffect } from 'react'
import { COMPANY_API_ENDPOINT } from '@/utils/api'
import { useDispatch } from 'react-redux'
import { setcompanies } from '@/redux/companySlice'
import { toast, Toaster } from "sonner";
import axios from "axios";

const useGetAllCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setcompanies(res.data.companies));
        }
      } catch (error) {
        console.error(error);
          // <-- corrected here
      }
    };

    fetchCompanies();
  }, [dispatch]);

  // you can return something if you want
  return {};
}

export default useGetAllCompany;
