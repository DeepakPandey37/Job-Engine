import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Send,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Search,
  Link
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


// API endpoint
const JOBNEWS_API_ENDPOINT = "http://localhost:4000/api/v1/jobcheck/analyze-job";

function LoadingDots() {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="h-1.5 w-1.5 rounded-full bg-white"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: dot * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export function JobScamAnalyzer() {
  const [jobText, setJobText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeJob = async () => {
    if (!jobText.trim()) {
      setError('Please enter a job description');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(JOBNEWS_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobText }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to analyze job posting');
      }

      setResult({
        analysis: data.result,
        searchResults: data.searchResults || []
      });
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
      console.error('Error analyzing job:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (analysis) => {
    if (!analysis) return null;
    
    if (analysis.includes("Likely Fake")) {
      return <XCircle className="h-8 w-8 text-destructive" />;
    } else if (analysis.includes("Potentially Misleading") || analysis.includes("Needs More Information")) {
      return <AlertTriangle className="h-8 w-8 text-amber-500" />;
    } else if (analysis.includes("Likely Real")) {
      return <CheckCircle className="h-8 w-8 text-emerald-500" />;
    } else {
      return <Info className="h-8 w-8 text-blue-500" />;
    }
  };

  const getStatusText = (analysis) => {
    if (!analysis) return "Unknown";
    
    if (analysis.includes("Likely Fake")) {
      return "Likely Fake Job";
    } else if (analysis.includes("Potentially Misleading")) {
      return "Potentially Misleading";
    } else if (analysis.includes("Needs More Information")) {
      return "Needs More Information";
    } else if (analysis.includes("Likely Real")) {
      return "Likely Real Job";
    } else {
      return "Analysis Complete";
    }
  };

  const getStatusBadge = (analysis) => {
    if (!analysis) return "outline";
    
    if (analysis.includes("Likely Fake")) {
      return "destructive";
    } else if (analysis.includes("Potentially Misleading") || analysis.includes("Needs More Information")) {
      return "warning";
    } else if (analysis.includes("Likely Real")) {
      return "success";
    } else {
      return "outline";
    }
  };

  const formatAnalysisText = (text) => {
    if (!text) return "";
    
    // Split by newlines and map to paragraphs
    return text.split('\n').filter(line => line.trim()).map((line, index) => (
      <p key={index} className="text-sm text-muted-foreground mb-2">{line}</p>
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-3xl mx-auto px-4 py-8"
    >
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <ShieldAlert className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-center">Job Scam Detector</h1>
      </motion.div>
      
      <motion.p 
        variants={itemVariants}
        className="text-muted-foreground text-center mb-8 max-w-xl mx-auto"
      >
        Paste a job description below to verify its legitimacy. Our AI will cross-reference it with online sources 
        to help identify potential scams.
      </motion.p>
      
      <motion.div 
        variants={itemVariants}
        className="bg-card border rounded-xl shadow-sm p-6"
      >
        <div className="space-y-6">
          <div>
            <label className="text-lg font-medium block mb-2">
              Job Description
            </label>
            <Textarea
              placeholder="Paste the job description or details here..."
              className="min-h-[150px] resize-none"
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
            />
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </div>
          
          <div className="flex justify-end">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={analyzeJob} 
                className="px-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center"
                  >
                    <span className="mr-2">Analyzing</span>
                    <LoadingDots />
                  </motion.div>
                ) : (
                  <div className="flex items-center">
                    <span className="mr-2">Verify Job</span>
                    <Search className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {result && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-8"
        >
          <Card className="border-2 border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.analysis)}
                  <CardTitle className="text-xl">{getStatusText(result.analysis)}</CardTitle>
                </div>
                <Badge 
                  variant={getStatusBadge(result.analysis)} 
                  className="ml-2"
                >
                  {getStatusText(result.analysis).toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <motion.div variants={itemVariants} className="my-4">
                <h3 className="font-medium mb-2">AI Analysis</h3>
                <div className="bg-secondary/30 p-4 rounded-md">
                  {formatAnalysisText(result.analysis)}
                </div>
              </motion.div>

              {result.searchResults && result.searchResults.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <motion.div variants={itemVariants}>
                    <h3 className="font-medium mb-2">Search Results</h3>
                    <div className="space-y-3">
                      {result.searchResults.map((item, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="flex flex-col gap-1 border rounded-md p-3"
                        >
                          <div className="flex items-center gap-2">
                            <Link className="h-4 w-4 text-blue-500" />
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline font-medium"
                            >
                              {item.title}
                            </a>
                          </div>
                          <p className="text-sm text-muted-foreground ml-6">{item.snippet}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
              
              <Separator className="my-4" />
              
              <motion.div variants={itemVariants} className="text-center">
                <p className="text-sm text-muted-foreground">
                  This analysis is meant as a guide only. Always verify job opportunities
                  through the company's official website or trusted contacts.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}