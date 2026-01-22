
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bell } from 'lucide-react';
import { SITE_NAME, CATEGORIES } from '../constants';
import { toast } from 'sonner';
import { testConnection } from '../services/geminiService';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    testConnection().then(result => {
      if (result.success) {
        toast.success("AI News Feed Connected", { position: "bottom-right", duration: 2000 });
      } else {
        toast.error("AI Feed Disconnected", {
          description: result.message || "Check API Key",
          position: "bottom-right",
          duration: 10000
        });
      }
    });
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-serif font-extrabold text-black tracking-tight">
              {SITE_NAME.split(' ')[0]}<span className="text-red-600">.</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/') ? 'text-black font-bold' : 'text-gray-500'} hover:text-black transition-colors`}>Home</Link>
            {CATEGORIES.slice(0, 4).map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                className={`${location.pathname.includes(cat.toLowerCase()) ? 'text-black font-bold' : 'text-gray-500'} hover:text-black transition-colors`}
              >
                {cat}
              </Link>
            ))}
            <Link to="/about" className={`${isActive('/about') ? 'text-black font-bold' : 'text-gray-500'} hover:text-black transition-colors`}>About</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => toast.info("Search feature coming soon!")} className="text-gray-500 hover:text-black"><Search size={20} /></button>
            <button onClick={() => toast.success("You're all caught up! No new notifications.")} className="text-gray-500 hover:text-black"><Bell size={20} /></button>
            <button onClick={() => toast.success("Welcome to the premium club!", { description: "Subscription confirmed." })} className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-all">
              Subscribe
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Home</Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
              >
                {cat}
              </Link>
            ))}
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">About</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
