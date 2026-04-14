"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-8 py-20">
        
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* BRAND */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Vietnam Travel
            </h2>
            <p className="text-sm leading-relaxed">
              Discover Vietnam’s beauty, culture, and unforgettable journeys.
              Your trusted travel companion.
            </p>
          </div>

          {/* COLUMN 1 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-black transition-colors duration-200"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black transition-colors duration-200"
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black transition-colors duration-200"
                >
                  Travel Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 2 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-black transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="hover:text-black transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-black transition-colors duration-200"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-200 my-12" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* COPYRIGHT */}
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} Vietnam Travel. All rights reserved.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-6">
            <Facebook className="w-5 h-5 text-gray-500 hover:text-black hover:scale-110 transition-all duration-200 cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-500 hover:text-black hover:scale-110 transition-all duration-200 cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-500 hover:text-black hover:scale-110 transition-all duration-200 cursor-pointer" />
            <Youtube className="w-5 h-5 text-gray-500 hover:text-black hover:scale-110 transition-all duration-200 cursor-pointer" />
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;