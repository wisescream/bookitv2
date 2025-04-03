
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/integrations/supabase/types-db';
import VenueDetailLayout from '@/components/VenueDetailLayout';
import BookingForm from '@/components/BookingForm';
import { Card, CardContent } from '@/components/ui/card';
import { fetchVenueRating } from '@/services/tripAdvisorService';

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('details');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (!id) return;
        
        // Fetch hotel details
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('*')
          .eq('id', id)
          .single();
        
        if (hotelError) throw hotelError;
        setHotel(hotelData);
        
        // Fetch TripAdvisor rating if not already present
        if (hotelData && !hotelData.tripadvisor_rating) {
          fetchVenueRating(id, 'hotel');
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load hotel information',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
      </div>
    );
  }
  
  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold mb-2">Hotel Not Found</h2>
          <p className="text-gray-500">The hotel you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <VenueDetailLayout
      id={hotel.id}
      name={hotel.name}
      address={hotel.address}
      city={hotel.city}
      imageUrl={hotel.image_url}
      rating={hotel.rating}
      description={hotel.description}
      category={hotel.category}
      type="hotel"
      price={hotel.price_per_night}
      priceLabel="From"
      tripadvisorRating={hotel.tripadvisor_rating}
      tripadvisorReviewsCount={hotel.tripadvisor_reviews_count}
      tripadvisorLastUpdated={hotel.tripadvisor_last_updated}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="book">Book a Room</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">About this hotel</h3>
              <p className="text-sm text-gray-600">
                {hotel.description || 'No detailed description available for this hotel.'}
              </p>
              
              <h3 className="font-medium mt-4 mb-2">Amenities</h3>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Free WiFi
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Swimming Pool
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Room Service
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Breakfast
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Air Conditioning
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Fitness Center
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="book">
          <Card>
            <CardContent className="p-4">
              <BookingForm 
                venueId={hotel.id}
                venueType="hotel"
                venueName={hotel.name}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </VenueDetailLayout>
  );
};

export default HotelDetail;
