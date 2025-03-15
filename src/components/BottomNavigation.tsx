
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Search, Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
      <Button 
        variant="ghost" 
        className="flex flex-col items-center p-1 h-auto"
        onClick={() => navigate('/home')}
      >
        <Home size={20} className="text-gray-400" />
        <span className="text-xs mt-1">Home</span>
      </Button>
      <Button 
        variant="ghost" 
        className="flex flex-col items-center p-1 h-auto"
        onClick={() => navigate('/search')}
      >
        <Search size={20} className="text-gray-400" />
        <span className="text-xs mt-1">Search</span>
      </Button>
      <Button 
        variant="ghost" 
        className="flex flex-col items-center p-1 h-auto"
        onClick={() => navigate('/orders')}
      >
        <Menu size={20} className="text-gray-400" />
        <span className="text-xs mt-1">Orders</span>
      </Button>
      <Button 
        variant="ghost" 
        className="flex flex-col items-center p-1 h-auto"
        onClick={() => navigate('/profile')}
      >
        <User size={20} className="text-gray-400" />
        <span className="text-xs mt-1">Profile</span>
      </Button>
    </nav>
  );
};

export default BottomNavigation;
