
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/integrations/supabase/types-db';
import VenueCard from '@/components/VenueCard';
import { useToast } from '@/components/ui/use-toast';

const Hotels = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('*');
        
        if (error) throw error;
        
        setHotels(data || []);
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
            {hotels.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-foodapp-muted">No hotels found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {hotels.map((hotel) => (
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
          </>
        )}
      </main>
    </motion.div>
  );
};

export default Hotels;
