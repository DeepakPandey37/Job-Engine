import { Button } from "@/components/ui/button"
import Navbar from "./components/shared/Navbar"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Home from "./components/Home"
import HeroSection from "./components/HeroSection"
import AdminJobs from "./components/admin/AdminJobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CompanyUpdate from "./components/admin/CompanyUpdate"
import { CreateCompany } from "./components/admin/CreateCompany"
import Jobs from "./components/Jobs"
import PostJobs from "./components/admin/PostJobs"
import UpdateJobs from "./components/admin/UpdateJobs"
import Applicants from "./components/admin/Applicants"
import ProtectedRoute from "./components/ProtectedRoute"
import { JobScamAnalyzer } from "./components/JobScamAnalyzer"

function App() {
  const appRouter = createBrowserRouter([
    {
      path :"/",
      element:<Home/>
    },
    {
      path :"/login",
      element:<Login/>
    },
    
    {
      path :"/signup",
      element:<Signup/>
    },
    {
      path :"/jobs",
      element:<Jobs/>
    },
    {
      path :"/browse",
      element:<Browse/>
    },
    {
      path :"/profile",
      element:<Profile/>
    },
    {
      path :"/description/:id",
      element:<JobDescription/>
    },
    {
      path :"/jobcheck",
      element:<JobScamAnalyzer/>
    },
    //admin components
    {
      path :"/admin/companies",
      element: <ProtectedRoute> <Companies/> </ProtectedRoute> 
    },
    {
      path :"/admin/companies/create",
      element:<ProtectedRoute><CreateCompany/></ProtectedRoute>
      
    },
    {
      path :"/admin/companies/:id",
      element:<ProtectedRoute><CompanyUpdate/></ProtectedRoute>
    },
    {
      path :"/admin/jobs",
      element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
    },
    {
      path :"/admin/jobs/create",
      element:<ProtectedRoute><PostJobs/></ProtectedRoute>
    },
    {
      path :"/admin/jobs/:id",
      element:<ProtectedRoute><UpdateJobs/></ProtectedRoute>
    },
    {
      path :"/admin/jobs/:id/applicants",
      element:<ProtectedRoute><Applicants/></ProtectedRoute>
    },
    
  ])
  return (
   <>
   <RouterProvider router= {appRouter}/>
   </>
  )
}

export default App
