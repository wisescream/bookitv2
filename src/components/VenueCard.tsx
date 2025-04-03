
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import TripAdvisorRating from './TripAdvisorRating';

type VenueCardProps = {
  id: string;
  name: string;
  address: string;
  city: string;
  imageUrl: string | null;
  rating?: number | null;
  price?: number;
  priceLabel?: string;
  type: 'restaurant' | 'hotel' | 'spa';
  tripadvisorRating?: number | null;
  tripadvisorReviewsCount?: number | null;
  tripadvisorLastUpdated?: string | null;
};

const VenueCard: React.FC<VenueCardProps> = ({
  id,
  name,
  address,
  city,
  imageUrl,
  rating,
  price,
  priceLabel,
  type,
  tripadvisorRating,
  tripadvisorReviewsCount,
  tripadvisorLastUpdated,
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/${type}/${id}`);
  };

  return (
    <Card 
      className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <div 
        className="h-32 bg-gray-200 bg-cover bg-center" 
        style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
      >
        {!imageUrl && (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-base truncate">{name}</h3>
        <div className="flex items-center text-xs text-foodapp-muted mt-1">
          <MapPin size={12} className="mr-1" />
          <span className="truncate">{address}, {city}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          {tripadvisorRating ? (
            <TripAdvisorRating 
              rating={tripadvisorRating}
              reviewsCount={tripadvisorReviewsCount}
              lastUpdated={tripadvisorLastUpdated}
            />
          ) : rating ? (
            <div className="flex items-center">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-xs ml-1">{rating.toFixed(1)}</span>
            </div>
          ) : (
            <div></div>
          )}
          {price && (
            <div className="text-xs font-medium">
              {priceLabel} ${price}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VenueCard;
