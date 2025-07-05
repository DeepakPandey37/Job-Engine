const express = require("express");
const { applyJob, getAppliedJob, getApplications, updateStatus} = require("../Controllers/applicationController.js");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated.js");


router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJob);
router.route("/:id/applicants").get(isAuthenticated, getApplications);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

module.exports = router;