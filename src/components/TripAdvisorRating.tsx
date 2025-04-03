
import React from 'react';
import { Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type TripAdvisorRatingProps = {
  rating: number | null;
  reviewsCount?: number | null;
  lastUpdated?: string | null;
  className?: string;
};

const TripAdvisorRating: React.FC<TripAdvisorRatingProps> = ({ 
  rating, 
  reviewsCount, 
  lastUpdated,
  className = ''
}) => {
  if (!rating) return null;

  // Format the last updated date if available
  const formattedDate = lastUpdated 
    ? new Date(lastUpdated).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }) 
    : null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center ${className}`}>
            <div className="flex items-center">
              <img 
                src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" 
                alt="TripAdvisor" 
                className="h-4 mr-1" 
              />
              <div className="flex items-center">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs ml-1 font-medium">{rating.toFixed(1)}</span>
                {reviewsCount && (
                  <span className="text-xs ml-1 text-gray-500">({reviewsCount})</span>
                )}
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>TripAdvisor Rating: {rating.toFixed(1)}/5</p>
          {reviewsCount && <p>{reviewsCount} reviews</p>}
          {formattedDate && <p>Last updated: {formattedDate}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TripAdvisorRating;
