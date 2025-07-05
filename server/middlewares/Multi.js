const multer = require("multer");

const storage = multer.memoryStorage();

// Accept two fields: 'resume' and 'profilePic', each with max count 1
const multiUpload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);

module.exports = multiUpload;
