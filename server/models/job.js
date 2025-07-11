const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    requirements:{
        type:String,
        required:true
    },
    experienceLevel:{
        type:Number,
        required:true
    },
    company:{
 type: mongoose.Schema.Types.ObjectId,
 ref:'Company'
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
           },
           applications:[{
            type: mongoose.Schema.Types.ObjectId,
           ref:'Application'
           }]
        },{timestamps:true})
const Job = mongoose.model("Job", jobSchema);
module.exports=Job;