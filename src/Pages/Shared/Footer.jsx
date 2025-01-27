import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaFirstAid,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 lg:py-10 md:py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding Section */}
          <div className="text-center md:text-left">
            <Link to='/'>
              {" "}
              <h3 className="text-2xl font-bold text-orange-500 mb-4">
                <FaFirstAid size={30} className="inline-block mr-1 pb-1" />{" "}
                MediCamp
              </h3>
            </Link>
            <p className="text-gray-400">
              Your trusted companion for healthcare solutions. Sign up and join
              us today to stay healthy and informed.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-orange-500">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/availableCamps" className="hover:underline">
                 Available Camps
                </Link>
              </li>
              <li>
                <a href="/services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and Social Media */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 text-orange-500">
              Get in Touch
            </h4>
            <p className="text-gray-400">Email: support@dochouse.com</p>
            <p className="text-gray-400 mb-4">Phone: +123 456 7890</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-orange-500 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-orange-500 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-orange-500 transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-orange-500 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MediCamp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
