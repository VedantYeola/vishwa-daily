
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { SITE_NAME, CATEGORIES } from '../constants';
import { toast } from 'sonner';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-extrabold text-black tracking-tight mb-4 block">
              {SITE_NAME}<span className="text-red-600">.</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Empowering global citizens with journalism that matters. Honest, insightful, and always independent.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-6">Categories</h3>
            <ul className="space-y-3">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <Link to={`/category/${cat.toLowerCase()}`} className="text-gray-500 hover:text-black text-sm transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-6">Information</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-500 hover:text-black text-sm transition-colors">About Us</Link></li>
              <li><a href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black text-sm transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-6">Join our Newsletter</h3>
            <p className="text-gray-500 text-sm mb-4">The best of {SITE_NAME}, delivered to your inbox.</p>
            <form
              className="flex flex-col space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Thanks for subscribing!", { description: "You've been added to our newsletter." });
              }}
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button type="submit" className="absolute right-2 top-1.5 text-gray-400 hover:text-black">
                  <Mail size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {SITE_NAME} Media Group. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms of Service</a>
            <a href="#" className="hover:text-black">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
