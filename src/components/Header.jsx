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

  return (
    <div>
      <header className="flex justify-between items-center px-5 h-[70px] bg-white shadow-sm ">
        
        <div 
          onClick={HandleHome} 
          className="cursor-pointer ml-5 flex items-center h-[200px] w-[200px]"
        >
          <h1 className="text-[#10a37f] text-2xl font-orbitron m-0">FundHive</h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-[70px] left-0 right-0 bg-white border-t md:hidden">
            <div className="flex flex-col w-full">
              <Link 
                to="/home" 
                className="px-5 py-4 border-b hover:bg-gray-50 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/bookings" 
                className="px-5 py-4 border-b hover:bg-gray-50 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Bookings
              </Link>
              <Link 
                to="/hosted" 
                className="px-5 py-4 border-b hover:bg-gray-50 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Hosted
              </Link>
              <Link 
                to="/about" 
                className="px-5 py-4 border-b hover:bg-gray-50 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="px-5 py-4">
                <ConnectWalletButton />
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;