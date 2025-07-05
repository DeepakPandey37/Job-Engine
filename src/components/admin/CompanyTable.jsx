import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import useGetAllCompany from '@/hooks/useGetAllCompany'
import { setfilter } from '@/redux/companySlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const formattedDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const CompanyTable = () => {
  useGetAllCompany();
  const navigate = useNavigate();

  const {companies,filter} = useSelector(store=>store.company);
    const [filtercompany , setFiltercompany] = useState(companies);
    useEffect(()=>{
      const filteredCompany = companies.length>=0 && companies.filter((company)=>{
        if(!filter){
          return true
        }
        return company?.name?.toLowerCase().includes(filter.toLowerCase());
      })
      setFiltercompany(filteredCompany);
    },[filter, companies])
  
  return (
    <div>
      <div className="">
        <Table>
          <TableCaption>A list of your Companies.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              filtercompany?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="4" className="text-center">No companies found</TableCell>
                </TableRow>
              ) : (
                filtercompany?.map((company) => (
                  <TableRow key={company._id}>
                    <TableCell className="font-medium">
                      <Avatar>
                        <AvatarImage
                          src={company.logo}
                          className="w-10 h-10 rounded-full"
                        />
                      </Avatar>
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{formattedDate(company.createdAt)}</TableCell>
                    <TableCell className="text-right content-center">
                      <Popover>
                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                        <PopoverContent className='w-32'>
                          <div className="flex items-center gap-2 w-fit cursor-pointer" onClick={() => navigate(`/admin/companies/${company._id}`)}>
                            <Edit2 />
                            <span>Edit</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              )
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CompanyTable
//10-25:30