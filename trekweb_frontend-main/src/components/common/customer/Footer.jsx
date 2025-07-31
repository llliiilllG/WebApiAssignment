import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaBicycle, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FaBicycle size={32} className="text-green-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">RIDER'S CHOICE</h3>
                <p className="text-xs text-gray-400 font-medium tracking-wider">PREMIUM MOTORCYCLES</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for premium motorcycles and exceptional riding experiences. Discover amazing bikes at exclusive deals.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/riderschoice" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/riderschoice" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram size={20} />
              </a>
              <a href="https://twitter.com/riderschoice" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.linkedin.com/company/riderschoice" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white border-b border-green-500 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="footer-link">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/packages" className="footer-link">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Browse Bikes
                </Link>
              </li>
              <li>
                <Link to="/review" className="footer-link">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="footer-link">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white border-b border-green-500 pb-2">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="footer-link">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="footer-link">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white border-b border-green-500 pb-2">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Banglamukhi Height Colony</p>
                  <p className="text-gray-300 text-sm">Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+977 9869667433</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">koiralagaurav22@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Rider's Choice. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">Follow us:</span>
              <a href="https://www.facebook.com/riderschoice" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                Facebook
              </a>
              <a href="https://www.instagram.com/riderschoice" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                Instagram
              </a>
              <a href="https://twitter.com/riderschoice" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-link {
          @apply w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-600 transition-all duration-300 transform hover:scale-110;
        }
        
        .footer-link {
          @apply flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
