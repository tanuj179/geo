'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/authService';
import { User } from '@/types/user';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    authService.logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">GeoDataApp Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Link 
              href="/map" 
              className="text-green-600 hover:text-green-800 transition"
            >
              Map
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg 
                         hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* User Info Section */}
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl text-blue-600">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome, {user?.username}!
              </h2>
              <p className="text-gray-600">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Placeholder for future content */}
          <div className="w-full h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-xl">
              Dashboard content coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}