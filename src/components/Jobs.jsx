import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterPart from "./FilterPart";
import Jobspart from "./Jobspart";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { alljobs, searchQuery } = useSelector((store) => store.job);
  const [filterjobs, setFilterjobs] = useState(alljobs);
  useEffect(() => {
    if (searchQuery) {
      const filteredResult = alljobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.salary.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterjobs(filteredResult);
    } else {
      setFilterjobs(alljobs);
    }
  }, [searchQuery, alljobs]);
  return (
    <div>
      <Navbar />
      <div className="w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* Left Filter Section */}
          <div className="w-[20%]">
            <FilterPart />
          </div>

          {/* Right Jobs List */}
          {alljobs.length <= 0 ? (
            <span>No jobs found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterjobs.map((job, index) => (
                  <motion.div
                    key={job?._id}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Jobspart job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
