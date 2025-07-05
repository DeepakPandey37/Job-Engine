const Company = require("../models/company");
const User = require("../models/User");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");
const mailSender = require("../utils/mailSender"); 

exports.registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company is already registered",
                success: false,
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id,
        });

        const users = await User.find({});
        const emailPromises = users.map((user) => {
            const body = `
                <h2>📢 New Job Alert!</h2>
                <p>A new company <strong>${companyName}</strong> has just registered.</p>
                <p>Check out job openings now!</p>
            `;

            return mailSender(user.email, "New Company Registered - Job Alert", body);
        });

        await Promise.all(emailPromises); // Wait for all emails to send

        return res.status(201).json({
            message: "Company created successfully, emails sent.",
            company,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error in company registration",
            success: false,
        });
    }
};

exports.getCompany = async (req,res)=>{
    try{
     //jo bhi user ne company register ki hogi vo linge 
     const userId = req.id;
     const companies = await Company.find({userId});
     if(!companies){
        return res.status(400).json({
            message:"no company found",
            success:false,
        });
     }
     return res.status(201).json({
        companies,
        success:true,
    });
    }catch(error){
    console.log(error);
    }
}
exports.getCompanyById =async (req,res)=>{
     try{
      const companyId = req.params.id; //company ki id ke basis pe uski full details show karinge 
      const company = await Company.findById(companyId);
      if(!company){
        return res.status(400).json({
            messgae:"no company found",
            success:false,
        });
      }
      return res.status(201).json({
       company,
        success:true,
    });
     }catch(error){
        console.log(error);
     }
}
exports.updateCompany = async (req,res)=>{
    try{
      const{name, description,website,location} = req.body;
      const file = req.file;
      const fileuri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileuri.content);
      const logo = cloudResponse.secure_url;
      const updatedData = {name, description,website,location,logo};
      
                    const company =await Company.findByIdAndUpdate( req.params.id,updatedData,{new:true});
                    if(!company){
                        return res.status(400).json({
                            messgae:"cant update details",
                            success:false,
                        });
                      }
                      return res.status(201).json({
                        message:"company updated successfully",
                      company,
                        success:true,
                    });

    }catch(error){
      console.log(error);
    }
}