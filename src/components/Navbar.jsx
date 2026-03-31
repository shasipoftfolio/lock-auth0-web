import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth0Lock } from '../context/Auth0LockContext';
import Auth0LoginButton from './Auth0LoginButton';
import UserProfile from './UserProfile';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth0Lock();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">MyApp</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition font-semibold">
              Home
            </a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition font-semibold">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition font-semibold">
              Pricing
            </a>
          </div>

          {/* Auth Buttons/User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <>
                <Auth0LoginButton />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-semibold">
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <a href="#home" className="block text-gray-700 hover:text-blue-600 font-semibold">
              Home
            </a>
            <a href="#features" className="block text-gray-700 hover:text-blue-600 font-semibold">
              Features
            </a>
            <a href="#pricing" className="block text-gray-700 hover:text-blue-600 font-semibold">
              Pricing
            </a>

            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <>
                <Auth0LoginButton />
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-semibold">
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}