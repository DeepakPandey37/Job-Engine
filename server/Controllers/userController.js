const User = require("../models/User");
const  bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");
exports.register = async(req,res)=>{
 try{
    const {fullname , email , password , phoneNumber , role } = req.body;
    if(!fullname || !email || !password || !phoneNumber || !role ) {
        return res.status(400).json({
           message:"all fileds are required",
           success: false,
        });
    }
    const file = req.file;
    const fileuri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileuri.content);
     const user = await User.findOne({email});
     if(user){
        return res.status(400).json({
            message:"user already exists",
            success: false,
         });
     }
       const hashedPassword = await bcrypt.hash(password,10);
       await User.create(
        {
            fullname,
            email,
            password : hashedPassword,
            phoneNumber,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        }
       );
       return res.status(201).json({
        message: "Account created successfully.",
        success: true
    });
    }catch(error){
     console.log(error);
     return res.status(400).json({
        message: "Error at user controller.",
        success: false
    });
 }
};

exports.login = async(req,res) =>{
   try{ const { email , password  , role } = req.body;
    if( !email || !password  || !role ) {
        return res.status(400).json({
           message:"all fileds are required",
           success: false,
        });
    }
    const user = await User.findOne({email});
     if(!user){
        return res.status(400).json({
            message:"Incorrect email or password",
            success: false,
         });
     }

     const isPasswordMatch = await bcrypt.compare(password , user.password);
    if(!isPasswordMatch){ 
        return res.status(400).json({
        message:"Incorrect email or password",
        success: false,
     })};
     if(role != user.role){
        return res.status(400).json({
            message:"Incorrect account type",
            success: false,
     })};

     const tokendata = {
        userId: user._id,
     } 
     const token = await jwt.sign(tokendata, process.env.SECRET_KEY, {expiresIn:'1d'});
     const payload = {
  _id: user._id,
  fullname: user.fullname,
  email: user.email,
  phoneNumber: user.phoneNumber,
  role: user.role,
  profile: {
    profilePhoto: user.profile?.profilePhoto || "",
    resume: user.profile?.resume || "",
    resumeOriginalName: user.profile?.resumeOriginalName || "",
    bio: user.profile?.bio || "",
    skills: user.profile?.skills || [],
  },
};


     return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
        message:"welcomeback",
        payload,
        success:true,
     })
}catch(error){
    console.log(error);
    return res.status(400).json({
        message: "Error at user controller.",
        success: false
    });
}
}

exports.logout = async (req,res)=>{
    try{
    return res.status(200).cookie("token", "" , {maxAge:0}).json({
        message:"logged out successfully",
        success:true,
    });
    }catch(error){
      console.log(error);
      return res.status(400).json({
        message: "Error in logout.",
        success: false
    });
    }
}
/* exports.updateProfile = async (req,res)=>{
   
        try {
            const { fullname, email, phoneNumber, bio, skills } = req.body;
            
            const file = req.file;
          

                const fileuri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileuri.content);
           
        
            let skillsArray;
            if(skills){
                 skillsArray = Array.isArray(skills) ? skills : String(skills).split(",");
            }
            const userId = req.id; 
            let user = await User.findById(userId);
    
            if (!user) {
                return res.status(400).json({
                    message: "User not found.",
                    success: false
                })
            }
            // updating data
            if(fullname) user.fullname = fullname
            if(email) user.email = email
            if(phoneNumber)  user.phoneNumber = phoneNumber
            if(bio) user.profile.bio = bio
            if(skills) user.profile.skills = skillsArray
           if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname
           }
           
    
    
            await user.save();
    
            user = {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
    
            return res.status(200).json({
                message:"Profile updated successfully.",
                user,
                success:true
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "error in update profile backend.",
                success: false
            });
        }
    } */
  exports.updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    

    // Accessing uploaded files from multer
    const resumeFile = req.files?.resume?.[0];
    const profilePhotoFile = req.files?.profilePhoto?.[0];

    let resumeUrl, profilePhotoUrl;

    // Upload resume to Cloudinary
    if (resumeFile) {
      const fileUri = getDataUri(resumeFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
   resource_type: "auto",
  public_id: resumeFile.originalname.replace(/\.[^/.]+$/, ""), // sets the name including the extension
  use_filename: true,           // ensures original filename is kept
  unique_filename: false,
   type: "upload"    
});
      resumeUrl = cloudResponse.secure_url;
    }

    // Upload profile photo to Cloudinary
    if (profilePhotoFile) {
      const fileUri = getDataUri(profilePhotoFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    // Convert skills string to array if needed
    const skillsArray = skills
      ? Array.isArray(skills)
        ? skills
        : String(skills).split(",")
      : [];

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found.", success: false });
    }

    // Update fields if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    if (resumeUrl) user.profile.resume = resumeUrl;
    if (resumeFile) user.profile.resumeOriginalName = resumeFile.originalname;
    if (profilePhotoUrl) user.profile.profilePhoto = profilePhotoUrl;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error updating profile.",
      success: false
    });
  }
};
