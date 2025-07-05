import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from "react-redux";
import { setsearchQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Haldwani", "UP", "Chennai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend", "Backend", "UI/UX", "Animator"],
  },
  {
    filterType: "Salary",
    array: ["10-20k", "40-50k", "70-80k", "1 Lakh+"],
  },
];

const FilterPart = () => {
  const [selectedValue , setSelectedValue]= useState('');
  const dispatch = useDispatch();
  const changeHandler =(value)=>{
 setSelectedValue(value);
  }
  useEffect(()=>{
    dispatch(setsearchQuery(selectedValue))
  },[selectedValue])
  return (
    <div className="p-6 bg-white rounded-md shadow-md w-full max-w-max">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Jobs</h2>
      <hr className="mb-6 border-gray-300" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700">{data.filterType}</h3>
            {data.array.map((item, idx) => {
      const itemId = `r${index}-${idx}`;
      return (
        <div key={idx} className="flex items-center space-x-2">
          <RadioGroupItem value={item} id={itemId} />
          <Label htmlFor={itemId} className="text-gray-600">
            {item}
          </Label>
        </div>
      );
    })}

          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
//13:22

export default FilterPart;
