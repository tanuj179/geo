'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/authService';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuthStatus = () => {
      const user = authService.getCurrentUser();
      if (user) {
        setIsAuthenticated(true);
        setUsername(user.username);
      } else {
        setIsAuthenticated(false);
        setUsername(null);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUsername(null);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-800">
            GeoDataApp
          </div>
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">
                  Welcome, {username}
                </span>
                <Link 
                  href="/dashboard" 
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/map" 
                  className="text-green-600 hover:text-green-800 transition"
                >
                  Map
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="text-green-600 hover:text-green-800 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Welcome to GeoDataApp
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage and visualize your geospatial data with ease. 
            Create, upload, and analyze geographic information seamlessly.
          </p>
          
          <div className="flex justify-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  href="/map" 
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg 
                             hover:bg-blue-700 transition duration-300 
                             shadow-md hover:shadow-lg"
                >
                  Go to Map
                </Link>
                <Link 
                  href="/dashboard" 
                  className="px-8 py-3 bg-green-600 text-white rounded-lg 
                             hover:bg-green-700 transition duration-300 
                             shadow-md hover:shadow-lg"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg 
                             hover:bg-blue-700 transition duration-300 
                             shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
                <Link 
                  href="/register" 
                  className="px-8 py-3 bg-green-600 text-white rounded-lg 
                             hover:bg-green-700 transition duration-300 
                             shadow-md hover:shadow-lg"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 GeoDataApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}