const express = require('express');
const router = express.Router();
const { analyzeJobLegitimacy } = require('../Controllers/jobAnalysisController');

router.post('/analyze-job', analyzeJobLegitimacy);

module.exports = router;

/* 
Next target
add in index file
const newsAnalysisRoutes = require('./routes/newsRoutes');
//in api section
app.use("/api/v1/news",newsAnalysisRoutes);
npm install googleapis @google/generative-ai dotenv
//in env
GOOGLE_CLOUD_API_KEY=YOUR_GOOGLE_CLOUD_API_KEY
CUSTOM_SEARCH_ENGINE_ID=YOUR_CUSTOM_SEARCH_ENGINE_ID
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

//react se form se data lena hai then backend me apis ko dena hai,aur speech feature bhi integrate krna hai

*/