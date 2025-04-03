
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type VenueHeaderProps = {
  title: string;
  activeCategory?: string;
  activeCategoryName?: string;
  onClearFilter?: () => void;
};

const VenueHeader: React.FC<VenueHeaderProps> = ({ 
  title, 
  activeCategory, 
  activeCategoryName, 
  onClearFilter 
}) => {
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
      
      {activeCategory && activeCategoryName && (
        <div className="flex items-center mb-2">
          <div className="text-sm bg-primary/10 text-primary rounded-full px-3 py-1 flex items-center">
            {activeCategoryName}
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-1 h-5 w-5 p-0" 
              onClick={onClearFilter}
            >
              <X size={14} />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default VenueHeader;
