const { google } = require('googleapis');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Google APIs
const customsearch = google.customsearch('v1');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // Use 'gemini-1.5-pro' for better accuracy

// Perform a Google search for job validation
async function performGoogleSearch(query) {
  try {
    const response = await customsearch.cse.list({
      q: query,
      cx: process.env.CUSTOM_SEARCH_ENGINE_ID,
      auth: process.env.GEMINI_API_KEY, // You can use Gemini API key here instead of Google Cloud API key
      num: 3
    });

    if (response.data.items) {
      return response.data.items.map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet
      }));
    }

    return [];
  } catch (error) {
    console.error('Google Search Error:', error.message);
    return [];
  }
}

// Use Gemini to evaluate the legitimacy of the job post
async function analyzeJobWithGemini(userJobText, searchResults) {
  const context = searchResults.length
    ? searchResults.map(r => `Source: ${r.title}\nSnippet: ${r.snippet}`).join('\n\n')
    : "No relevant search results found.";

  const prompt = `
You are an expert in identifying job scams. A user submitted the following job vacancy message:

--- Job Message ---
${userJobText}
--- End Job Message ---

Cross-reference it with the following search results:

--- Search Results ---
${context}
--- End Search Results ---

Evaluate if this job post is:

- "Likely Real"
- "Likely Fake"
- "Potentially Misleading"
- "Needs More Information"

Provide a brief explanation highlighting whether the company and job title appear in trusted sources, and whether anything looks suspicious.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini Analysis Error:', error.message);
    return 'Error analyzing job posting.';
  }
}

// Route handler for analyzing job legitimacy
exports.analyzeJobLegitimacy = async (req, res) => {
  try {
    const { jobText } = req.body;

    if (!jobText) {
      return res.status(400).json({ message: 'Job text is required.', success: false });
    }

    const searchResults = await performGoogleSearch(jobText);
    const analysisResult = await analyzeJobWithGemini(jobText, searchResults);

    res.status(200).json({
      message: 'Analysis complete.',
      result: analysisResult,
      searchResults,
      success: true
    });
  } catch (error) {
    console.error('Error during job analysis:', error.message);
    res.status(500).json({
      message: 'Failed to analyze the job posting.',
      success: false,
      error: error.message
    });
  }
};
