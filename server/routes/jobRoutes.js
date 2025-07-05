const express = require("express");
const { Postjob, getAllJob, getJobById, getAdminJobs,updateJob} = require("../Controllers/jobController.js");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated.js");


router.route("/post").post(isAuthenticated,Postjob);
router.route("/get").get(isAuthenticated,getAllJob);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getAdminJobs").get(isAuthenticated,getAdminJobs);
router.route("/update/:id").put(isAuthenticated, updateJob);

module.exports = router;