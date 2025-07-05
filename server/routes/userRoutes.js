const express = require("express");
const { login, logout, register, updateProfile} = require("../Controllers/userController.js");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const singleUpload = require("../middlewares/multer.js");
const multiUpload = require("../middlewares/Multi.js");
//multiUpload

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(multiUpload,isAuthenticated,updateProfile);

module.exports = router;