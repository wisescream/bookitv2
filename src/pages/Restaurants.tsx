
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Restaurant } from '@/integrations/supabase/types-db';
import { useToast } from '@/components/ui/use-toast';
import VenuePageLayout from '@/components/VenuePageLayout';
import CategorySection from '@/components/CategorySection';
import VenueSection from '@/components/VenueSection';
import VenueGrid from '@/components/VenueGrid';
import { fetchVenuesRatings } from '@/services/tripAdvisorService';

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
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  // Find active category name
  const activeCategoryName = activeCategory 
    ? categories.find(cat => cat.id === activeCategory)?.name 
    : undefined;

  useEffect(() => {
    fetchRestaurants();
  }, [activeCategory, toast]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      
      // Fetch TripAdvisor ratings
      await fetchVenuesRatings('restaurant');
      
      let query = supabase
        .from('restaurants')
        .select('*');
      
      // Add category filter if active
      if (activeCategory) {
        query = query.eq('category', activeCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setRestaurants(data || []);

      // For nearby restaurants, we'll simulate by taking a random subset
      if (data) {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setNearbyRestaurants(shuffled.slice(0, 6));
        
        // For best restaurants, sort by rating
        const sorted = [...data].sort((a, b) => {
          const ratingA = a.tripadvisor_rating || a.rating || 0;
          const ratingB = b.tripadvisor_rating || b.rating || 0;
          return ratingB - ratingA;
        });
        setBestRestaurants(sorted.slice(0, 6));
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(prevCategory => 
      prevCategory === categoryId ? undefined : categoryId
    );
  };

  const handleClearFilter = () => {
    setActiveCategory(undefined);
  };

  const handleViewAll = (section: string) => {
    console.log(`View all ${section}`);
    setActiveTab('all');
  };

  // Content for the "All" tab
  const allContent = (
    <>
      <CategorySection 
        categories={categories} 
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />
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
      activeCategory={activeCategory}
      activeCategoryName={activeCategoryName}
      onTabChange={handleTabChange}
      onClearFilter={handleClearFilter}
      allContent={allContent}
      nearbyContent={nearbyContent}
      bestContent={bestContent}
    />
  );
};

export default Restaurants;
