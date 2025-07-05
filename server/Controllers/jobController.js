const Job = require("../models/job");
//jobs by admin
exports.Postjob = async(req,res)=>{
 try{
  const {title, description, position, jobType, location, salary, requirements, companyId,experienceLevel} = req.body;
 const userId = req.id;
  if(!title||  !description|| !position  ||!jobType ||!location ||!salary ||!requirements ||!companyId ||!experienceLevel){
    return res.status(400).json({
        message:"all fields are requred",
        success:false
    });
  }
  const jobdata = {
    title, 
    description, 
    position,
     jobType,
      location, 
      salary,
       requirements, 
       company:companyId,
       experienceLevel,
       created_by:userId
  };
  await Job.create(jobdata);
  return res.status(201).json({
    message:"job created successfully",
    success:true
});}catch(error){
    console.log(error);
}

} 
//student ke liye hai

exports.getAllJob = async(req,res)=>{
    try{
  const keyword = req.query.keyword || "";
   const query = {
    $or:[
        {title:{$regex:keyword , $options:"i"}},
        {description:{$regex:keyword , $options:"i"}}
    ]
   }
   const jobs= await Job.find(query).populate({path:"company"}).sort({createdAt:-1});
     if(!jobs){
      return res.status(200).json({
        message:"No jobs found",
        success:false
      });
     }
     return res.status(200).json({
      jobs,
      success:true
     });




    }catch{
 console.log(error);
    }
}
//student ke liye hai
exports.getJobById = async(req,res)=>{
  try{
  const jobId = req.params.id;
  const job = await Job.findById(jobId).populate({
    path:"applications",
  });
  if(!job){
    return res.status(400).json({
      message:"no job found",
      success:false
    });
  }
  return res.status(201).json({
    job,
    success:true
  });

}catch(error){
  console.log(error);
  }
}

//total created by admin
exports.getAdminJobs = async(req,res)=>{
  try{
  const adminId = req.id;
  const jobs = await Job.find({created_by:adminId}).populate({
    path:'company',
  
  });
  if(!jobs){
    return res.status(400).json({
      message:"no job found",
      success:false
    });
  }
  return res.status(201).json({
    jobs,
    success:true
  });
  }catch(error){

  }
}
// Update job by admin - with validation and error handling
exports.updateJob = async(req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;
    
    // Validate jobId
    if (!jobId || jobId === 'undefined' || jobId === 'null') {
      return res.status(400).json({
        message: "Invalid job ID provided",
        success: false
      });
    }
    
    const {title, description, position, jobType, location, salary, requirements, experienceLevel} = req.body;
    
    // Find the job first to check if it exists and if the admin owns it
    const existingJob = await Job.findById(jobId);
    
    if(!existingJob) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }
    
    
    
    // Update only the fields that are provided
    const updateData = {};
    
    if(title) updateData.title = title;
    if(description) updateData.description = description;
    if(position !== undefined && position !== null) updateData.position = position;
    if(jobType) updateData.jobType = jobType;
    if(location) updateData.location = location;
    if(salary) updateData.salary = salary;
    if(requirements) updateData.requirements = requirements;
    if(experienceLevel) updateData.experienceLevel = experienceLevel;
    
    // Update the job
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $set: updateData },
      { new: true } // Return the updated document
    );
    
    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      job: updatedJob
    });
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error", 
      error: error.message, // Include the error message for debugging
      success: false
    });
  }
}