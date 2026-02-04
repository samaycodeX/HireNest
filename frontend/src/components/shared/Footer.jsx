import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">

        {/* TOP */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Hire
              <span className="bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent">
                Nest
              </span>
            </h2>

            <p className="mt-3 text-sm text-gray-400 max-w-sm leading-relaxed">
              Discover jobs, connect with companies, and build your career faster.
            </p>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4">
            {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label="Social link"
                  className="
                    flex items-center justify-center
                    w-9 h-9
                    rounded-full
                    bg-gray-800
                    text-gray-400
                    transition-all duration-300 ease-out
                    hover:bg-gradient-to-r hover:from-fuchsia-400 hover:to-fuchsia-600
                    hover:text-white
                    hover:scale-110
                    focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40
                  "
                >
                  <Icon size={15} />
                </a>
              )
            )}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-400 font-medium">HireNest</span>. All
            rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
