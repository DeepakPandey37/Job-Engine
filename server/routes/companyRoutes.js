const express = require("express");
const { registerCompany, getCompany, getCompanyById, updateCompany} = require("../Controllers/companyController.js");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const singleUpload = require("../middlewares/multer.js");


router.route("/registerCompany").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany);

module.exports = router;