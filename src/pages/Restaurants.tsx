
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Restaurant } from '@/integrations/supabase/types-db';
import { useToast } from '@/components/ui/use-toast';
import VenuePageLayout from '@/components/VenuePageLayout';
import CategorySection from '@/components/CategorySection';
import VenueSection from '@/components/VenueSection';
import VenueGrid from '@/components/VenueGrid';

// Restaurant categories
const categories = [
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'steakhouse', name: 'Steak Houses', icon: '🥩' },
  { id: 'italian', name: 'Italian', icon: '🍝' },
  { id: 'mexican', name: 'Mexican', icon: '🌮' },
  { id: 'chinese', name: 'Chinese', icon: '🥢' },
  { id: 'indian', name: 'Indian', icon: '🍛' },
];

const Restaurants = () => {
  const { toast } = useToast();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<Restaurant[]>([]);
  const [bestRestaurants, setBestRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*');
        
        if (error) throw error;
        
        setRestaurants(data || []);

        // For demo purposes, we'll randomly assign these to nearby and best
        if (data) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setNearbyRestaurants(shuffled.slice(0, 4));
          
          // Sort by name for "best" (in a real app, this would be by rating)
          const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
          setBestRestaurants(sorted.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        toast({
          title: 'Error',
          description: 'Failed to load restaurants',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [toast]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleViewAll = (section: string) => {
    console.log(`View all ${section}`);
    setActiveTab('all');
  };

  // Content for the "All" tab
  const allContent = (
    <>
      <CategorySection categories={categories} />
      <VenueSection 
        title="Nearby Restaurants" 
        venues={nearbyRestaurants} 
        venueType="restaurant"
        onViewAll={() => handleViewAll('nearby')}
      />
      <VenueSection 
        title="Best Restaurants" 
        venues={bestRestaurants} 
        venueType="restaurant"
        onViewAll={() => handleViewAll('best')}
      />
    </>
  );

  // Content for the "Nearby" tab
  const nearbyContent = (
    <VenueGrid 
      title="Nearby Restaurants" 
      venues={nearbyRestaurants} 
      venueType="restaurant" 
    />
  );

  // Content for the "Best" tab
  const bestContent = (
    <VenueGrid 
      title="Best Restaurants" 
      venues={bestRestaurants} 
      venueType="restaurant" 
    />
  );

  return (
    <VenuePageLayout
      title="Restaurants"
      loading={loading}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      allContent={allContent}
      nearbyContent={nearbyContent}
      bestContent={bestContent}
    />
  );
};

export default Restaurants;
