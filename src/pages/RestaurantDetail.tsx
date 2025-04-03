
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Restaurant, FoodItem } from '@/integrations/supabase/types-db';
import VenueDetailLayout from '@/components/VenueDetailLayout';
import BookingForm from '@/components/BookingForm';
import { Card, CardContent } from '@/components/ui/card';
import { fetchVenueRating } from '@/services/tripAdvisorService';

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('menu');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (!id) return;
        
        // Fetch restaurant details
        const { data: restaurantData, error: restaurantError } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', id)
          .single();
        
        if (restaurantError) throw restaurantError;
        setRestaurant(restaurantData);
        
        // Fetch menu items
        const { data: menuData, error: menuError } = await supabase
          .from('food_items')
          .select('*')
          .eq('restaurant_id', id);
        
        if (menuError) throw menuError;
        setMenuItems(menuData || []);
        
        // Fetch TripAdvisor rating
        if (restaurantData && !restaurantData.tripadvisor_rating) {
          fetchVenueRating(id, 'restaurant');
        }
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load restaurant information',
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
  
  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold mb-2">Restaurant Not Found</h2>
          <p className="text-gray-500">The restaurant you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <VenueDetailLayout
      id={restaurant.id}
      name={restaurant.name}
      address={restaurant.address}
      city={restaurant.city}
      imageUrl={restaurant.image_url}
      rating={restaurant.rating}
      openTime={restaurant.open_time}
      closeTime={restaurant.close_time}
      category={restaurant.category}
      type="restaurant"
      tripadvisorRating={restaurant.tripadvisor_rating}
      tripadvisorReviewsCount={restaurant.tripadvisor_reviews_count}
      tripadvisorLastUpdated={restaurant.tripadvisor_last_updated}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="book">Book a Table</TabsTrigger>
        </TabsList>
        
        <TabsContent value="menu">
          {menuItems.length > 0 ? (
            <div className="space-y-4">
              {menuItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                      <div className="font-medium">${item.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No menu items available</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="book">
          <Card>
            <CardContent className="p-4">
              <BookingForm 
                venueId={restaurant.id}
                venueType="restaurant"
                venueName={restaurant.name}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </VenueDetailLayout>
  );
};

export default RestaurantDetail;
