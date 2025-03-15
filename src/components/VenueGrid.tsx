
import React from 'react';
import VenueCard from '@/components/VenueCard';
import { Restaurant, Hotel, Spa } from '@/integrations/supabase/types-db';

type VenueGridProps = {
  title: string;
  venues: Restaurant[] | Hotel[] | Spa[];
  venueType: 'restaurant' | 'hotel' | 'spa';
};

const VenueGrid: React.FC<VenueGridProps> = ({ title, venues, venueType }) => {
  return (
    <>
      <div className="mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {venues.map((venue) => {
          if (venueType === 'restaurant') {
            const restaurant = venue as Restaurant;
            return (
              <VenueCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                address={restaurant.address}
                city={restaurant.city}
                imageUrl={restaurant.image_url}
                type="restaurant"
              />
            );
          } else if (venueType === 'hotel') {
            const hotel = venue as Hotel;
            return (
              <VenueCard
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                address={hotel.address}
                city={hotel.city}
                imageUrl={hotel.image_url}
                rating={hotel.rating}
                price={hotel.price_per_night}
                priceLabel="From"
                type="hotel"
              />
            );
          } else if (venueType === 'spa') {
            const spa = venue as Spa;
            return (
              <VenueCard
                key={spa.id}
                id={spa.id}
                name={spa.name}
                address={spa.address}
                city={spa.city}
                imageUrl={spa.image_url}
                rating={spa.rating}
                price={spa.price_per_session}
                priceLabel="From"
                type="spa"
              />
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default VenueGrid;
