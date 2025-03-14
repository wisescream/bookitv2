
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Home, Menu, User, Hotel, Utensils, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Restaurant, Hotel, Spa } from '@/integrations/supabase/types-db';
import VenueCard from '@/components/VenueCard';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [spas, setSpas] = useState<Spa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch restaurants
        const { data: restaurantData, error: restaurantError } = await supabase
          .from('restaurants')
          .select('*')
          .limit(4);
        
        if (restaurantError) throw restaurantError;
        setRestaurants(restaurantData || []);

        // Fetch hotels
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('*')
          .limit(4);
        
        if (hotelError) throw hotelError;
        setHotels(hotelData || []);

        // Fetch spas
        const { data: spaData, error: spaError } = await supabase
          .from('spas')
          .select('*')
          .limit(4);
        
        if (spaError) throw spaError;
        setSpas(spaData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="px-6 pt-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foodapp-text">BOOKIT</h1>
            <div className="flex items-center text-foodapp-primary mt-1">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm font-medium">Casablanca, Morocco</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-white shadow-sm">
            <Search size={20} />
          </Button>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Welcome to BOOKIT</h2>
          <p className="text-foodapp-muted text-sm">
            Find and book your favorite venues in Casablanca
          </p>
        </div>
      </header>

      {/* Categories */}
      <section className="px-6 py-4">
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline"
            className="flex flex-col h-auto py-3 bg-white"
            onClick={() => navigate('/restaurants')}
          >
            <Utensils size={24} className="mb-2 text-foodapp-primary" />
            <span>Restaurants</span>
          </Button>
          <Button 
            variant="outline"
            className="flex flex-col h-auto py-3 bg-white"
            onClick={() => navigate('/hotels')}
          >
            <Hotel size={24} className="mb-2 text-foodapp-primary" />
            <span>Hotels</span>
          </Button>
          <Button 
            variant="outline"
            className="flex flex-col h-auto py-3 bg-white"
            onClick={() => navigate('/spas')}
          >
            <Sparkles size={24} className="mb-2 text-foodapp-primary" />
            <span>Spas</span>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-20">
        {/* Restaurants Section */}
        <section className="my-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Nearby Restaurants</h3>
            <Button 
              variant="link" 
              className="text-foodapp-primary p-0"
              onClick={() => navigate('/restaurants')}
            >
              See All
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((item) => (
                <div key={item} className="bg-gray-200 rounded-xl h-36 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {restaurants.slice(0, 2).map((restaurant) => (
                <VenueCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  address={restaurant.address}
                  city={restaurant.city}
                  imageUrl={restaurant.image_url}
                  type="restaurant"
                />
              ))}
            </div>
          )}
        </section>
        
        {/* Hotels Section */}
        <section className="my-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Popular Hotels</h3>
            <Button 
              variant="link" 
              className="text-foodapp-primary p-0"
              onClick={() => navigate('/hotels')}
            >
              See All
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((item) => (
                <div key={item} className="bg-gray-200 rounded-xl h-36 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {hotels.slice(0, 2).map((hotel) => (
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
          )}
        </section>

        {/* Spas Section */}
        <section className="my-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Relaxing Spas</h3>
            <Button 
              variant="link" 
              className="text-foodapp-primary p-0"
              onClick={() => navigate('/spas')}
            >
              See All
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((item) => (
                <div key={item} className="bg-gray-200 rounded-xl h-36 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {spas.slice(0, 2).map((spa) => (
                <VenueCard
                  key={spa.id}
                  id={spa.id}
                  name={spa.name}
                  address={spa.address}
                  city={spa.city}
                  imageUrl={spa.image_url}
                  rating={spa.rating}
                  price={spa.price_per_session}
                  priceLabel="Session"
                  type="spa"
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
        <Button variant="ghost" className="flex flex-col items-center p-1 h-auto">
          <Home size={20} className="text-foodapp-primary" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center p-1 h-auto">
          <Search size={20} className="text-gray-400" />
          <span className="text-xs mt-1">Search</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center p-1 h-auto">
          <Menu size={20} className="text-gray-400" />
          <span className="text-xs mt-1">Orders</span>
        </Button>
        <Button 
          variant="ghost" 
          className="flex flex-col items-center p-1 h-auto"
          onClick={() => navigate('/auth')}
        >
          <User size={20} className="text-gray-400" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
      </nav>
    </motion.div>
  );
};

export default Index;
