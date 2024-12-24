
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Quick Links Section */}
          <div>
            <h3 className="text-[#10a37f] text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faqs" className="text-gray-300 hover:text-[#10a37f] transition duration-300">FAQs</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-[#10a37f] transition duration-300">Blog</a>
              </li>
              <li>
                <a href="/help-center" className="text-gray-300 hover:text-[#10a37f] transition duration-300">Help Center</a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-[#10a37f] transition duration-300">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-[#10a37f] transition duration-300">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div>
            <h3 className="text-[#10a37f] text-lg font-semibold mb-4">Connect with Us</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://facebook.com/chanda" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#10a37f] transition duration-300"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/chanda" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#10a37f] transition duration-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/company/chanda" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#10a37f] transition duration-300"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/chanda" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#10a37f] transition duration-300"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-[#10a37f] text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <span className="block">Email:</span>
                <a href="mailto:support@chanda.com" className="text-gray-300 hover:text-[#10a37f] transition duration-300">
                  support@fundhive.com
                </a>
              </li>
              <li className="text-gray-300">
                <span className="block">Phone:</span>
                <a href="tel:+1234567890" className="text-gray-300 hover:text-[#10a37f] transition duration-300">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="text-gray-300">
                <span className="block">Address:</span>
                <p>123 Blockchain Street</p>
                <p>Crypto City, CC 12345</p>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} FundHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


