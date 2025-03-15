
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type VenueHeaderProps = {
  title: string;
};

const VenueHeader: React.FC<VenueHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="px-6 pt-6 pb-4">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 p-0 h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-white shadow-sm">
            <Search size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default VenueHeader;
