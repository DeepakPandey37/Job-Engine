const Application = require("../models/application");
const Job = require("../models/job");

exports.applyJob = async (req, res) => {
    try {
        const userId = req.id; // assuming logged in user's id comes from req.id
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            });
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You can only apply once",
                success: false
            });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "No job found",
                success: false
            });
        }
        // new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });
        // push new application into job's applications array
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(200).json({
            message: "Application saved",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

exports.getAppliedJob = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!applications || applications.length === 0) {
            return res.status(400).json({
                message: "No application found",
                success: false
            });
        }
        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Total people applied for job
exports.getApplications = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }
        return res.status(200).json({
            job, 
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const {status} = req.body;  // status from the form or client
        const applicationId = req.params.id; // which application to update
        if (!status) {
            return res.status(404).json({
                message: 'Status not found.',
                success: false
            });
        }
        const applicationToUpdate = await Application.findById(applicationId);
        applicationToUpdate.status = status.toLowerCase();
        await applicationToUpdate.save();
        return res.status(200).json({
            message: 'Status updated successfully.',
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
