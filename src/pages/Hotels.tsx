
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, Home, Menu, User, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/integrations/supabase/types-db';
import VenueCard from '@/components/VenueCard';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Hotel categories
const categories = [
  { id: 'luxury', name: 'Luxury', icon: '✨' },
  { id: 'boutique', name: 'Boutique', icon: '🏨' },
  { id: 'resort', name: 'Resorts', icon: '🌴' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'budget', name: 'Budget', icon: '💰' },
  { id: 'familyfriendly', name: 'Family', icon: '👨‍👩‍👧‍👦' },
];

const Hotels = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [nearbyHotels, setNearbyHotels] = useState<Hotel[]>([]);
  const [bestHotels, setBestHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('*');
        
        if (error) throw error;
        
        setHotels(data || []);

        // For demo purposes, we'll randomly assign these to nearby and best
        // In a real app, this would use geolocation and ratings
        if (data) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setNearbyHotels(shuffled.slice(0, 4));
          
          // Sort by rating for "best" hotels
          const sorted = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
          setBestHotels(sorted.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
        toast({
          title: 'Error',
          description: 'Failed to load hotels',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [toast]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleViewAll = (section: string) => {
    // In a real app, this would navigate to a filtered view
    console.log(`View all ${section}`);
    // For now, just set tab to 'all'
    setActiveTab('all');
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
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
          <h1 className="text-xl font-bold">Hotels</h1>
          <div className="ml-auto">
            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-white shadow-sm">
              <Search size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-20">
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-200 rounded-xl h-48 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
                <TabsTrigger value="best">Best</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-6">
                {/* Categories Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">Categories</h2>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant="outline"
                        className="flex flex-col items-center py-3 h-auto"
                      >
                        <span className="text-xl mb-1">{category.icon}</span>
                        <span className="text-xs">{category.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Nearby Hotels Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">Nearby Hotels</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs flex items-center p-0"
                      onClick={() => handleViewAll('nearby')}
                    >
                      View All
                      <ChevronRight size={14} className="ml-1" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {nearbyHotels.slice(0, 4).map((hotel) => (
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
                    ))}
                  </div>
                </div>

                {/* Best Hotels Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">Best Hotels</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs flex items-center p-0"
                      onClick={() => handleViewAll('best')}
                    >
                      View All
                      <ChevronRight size={14} className="ml-1" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {bestHotels.slice(0, 4).map((hotel) => (
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
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nearby">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold">Nearby Hotels</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {nearbyHotels.map((hotel) => (
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
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="best">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold">Best Hotels</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {bestHotels.map((hotel) => (
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
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
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
    </motion.div>
  );
};

export default Hotels;
