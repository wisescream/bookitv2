
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, Clock, Star, CalendarRange } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TripAdvisorRating from './TripAdvisorRating';
import BottomNavigation from './BottomNavigation';

type VenueDetailLayoutProps = {
  id: string;
  name: string;
  address: string;
  city: string;
  imageUrl: string | null;
  rating: number | null;
  description?: string | null;
  openTime?: string;
  closeTime?: string;
  category?: string | null;
  children: ReactNode;
  type: 'restaurant' | 'hotel' | 'spa';
  price?: number;
  priceLabel?: string;
  tripadvisorRating?: number | null;
  tripadvisorReviewsCount?: number | null;
  tripadvisorLastUpdated?: string | null;
};

const VenueDetailLayout: React.FC<VenueDetailLayoutProps> = ({
  name,
  address,
  city,
  imageUrl,
  rating,
  description,
  openTime,
  closeTime,
  category,
  children,
  price,
  priceLabel,
  tripadvisorRating,
  tripadvisorReviewsCount,
  tripadvisorLastUpdated
}) => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    // Find the booking tab and click it
    const bookingTrigger = document.querySelector('[value="book"], [value="book-a-table"], [value="book-a-room"], [value="book-a-session"]') as HTMLButtonElement;
    if (bookingTrigger) {
      bookingTrigger.click();
      // Scroll to the booking form
      setTimeout(() => {
        bookingTrigger.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with image */}
      <div className="relative">
        <div 
          className="h-48 w-full bg-gray-300 bg-cover bg-center" 
          style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
        >
          {!imageUrl && (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No image available
            </div>
          )}
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-4 left-4 rounded-full bg-white/80"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={24} />
        </Button>
      </div>

      {/* Venue details */}
      <div className="px-6 py-4 bg-white">
        <h1 className="text-xl font-bold">{name}</h1>
        
        {category && (
          <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-xs my-2">
            {category}
          </span>
        )}
        
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <MapPin size={16} className="mr-1" />
          <span>{address}, {city}</span>
        </div>
        
        {(openTime && closeTime) && (
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock size={16} className="mr-1" />
            <span>Open {openTime} - {closeTime}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center space-x-3">
            {tripadvisorRating ? (
              <TripAdvisorRating 
                rating={tripadvisorRating}
                reviewsCount={tripadvisorReviewsCount}
                lastUpdated={tripadvisorLastUpdated}
              />
            ) : rating ? (
              <div className="flex items-center">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm ml-1">{rating.toFixed(1)}</span>
              </div>
            ) : null}
          </div>
          
          {price && (
            <div className="text-sm font-medium">
              {priceLabel} ${price}
            </div>
          )}
        </div>
        
        {description && (
          <div className="mt-4 text-sm text-gray-600">
            {description}
          </div>
        )}

        {/* Reservation Button */}
        <Button 
          className="w-full mt-5 py-6 text-base"
          onClick={scrollToBooking}
        >
          <CalendarRange className="mr-2" /> Make a Reservation
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 py-4 pb-24 bg-gray-50">
        {children}
      </div>

      <BottomNavigation />
    </motion.div>
  );
};

export default VenueDetailLayout;
