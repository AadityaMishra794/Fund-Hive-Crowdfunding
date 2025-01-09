import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConnectWalletButton from "./Connectwallet";
import { Menu, X } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const HandleHome = () => {
    navigate("/home");
  };

  const HandleAbout = () => {
    navigate("/about");
  };

  // Close menu when clicking outside
  const handleClickOutside = (e) => {
    if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-button')) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative">
      <header className="flex justify-between items-center px-5 h-[70px] bg-white shadow-sm relative z-10">
        <div 
          onClick={HandleHome} 
          className="cursor-pointer ml-5 flex items-center h-[70px]"
        >
          <h1 className="text-[#10a37f] text-2xl font-orbitron m-0">FundHive</h1>
        </div>
        
        {/* Mobile Connect Button */}
        <div className="md:hidden">
          <ConnectWalletButton />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="" 
            className="text-gray-700 px-4 py-2 rounded-md font-orbitron hover:bg-gray-100 hover:text-[#10a37f] transition duration-300"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-gray-700 px-4 py-2 rounded-md font-orbitron hover:bg-gray-100 hover:text-[#10a37f] transition duration-300"
          >
            About
          </Link>
          <div className="ml-4">
            <ConnectWalletButton />
          </div>
        </nav>
      </header>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`
          absolute 
          right-5
          top-[70px]
          w-max 
          bg-white 
          shadow-lg 
          rounded-lg 
          transition-all 
          duration-300
          z-50
          md:hidden
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <div className="p-4 space-y-4">
          <Link 
            to="" 
            className="block text-gray-700 px-4 py-2 rounded-md font-orbitron hover:bg-gray-100 hover:text-[#10a37f] transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block text-gray-700 px-4 py-2 rounded-md font-orbitron hover:bg-gray-100 hover:text-[#10a37f] transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <div className="pt-2">
            <ConnectWalletButton />
          </div>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default Header;