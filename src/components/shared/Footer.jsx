import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-10 mt-12">
      <div className="w-11/12 max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-6 border-b border-gray-700 pb-6">
        
        {/* Company Info */}
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-semibold text-lg">Job Engine</h2>
          <p>Your career starts here. Explore jobs, post listings, and grow your network.</p>
          <div className="flex gap-3 text-lg mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-white"><FaFacebook /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><FaLinkedin /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold">Quick Links</h3>
          <Link to="/jobs" className="hover:text-white">Find Jobs</Link>
          <Link to="/post-job" className="hover:text-white">Post a Job</Link>
          <Link to="/about" className="hover:text-white">About Us</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold">Support</h3>
          <Link to="/help-center" className="hover:text-white">Help Center</Link>
          <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
        </div>
      </div>

      <div className="w-11/12 max-w-6xl mx-auto mt-4 text-center text-gray-500">
        © {new Date().getFullYear()} Job Engine · Made with ❤️ by Deepak Pandey
      </div>
    </footer>
  );
};

export default Footer;
