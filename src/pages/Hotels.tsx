
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/integrations/supabase/types-db';
import { useToast } from '@/components/ui/use-toast';
import VenuePageLayout from '@/components/VenuePageLayout';
import CategorySection from '@/components/CategorySection';
import VenueSection from '@/components/VenueSection';
import VenueGrid from '@/components/VenueGrid';

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
  const { toast } = useToast();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [nearbyHotels, setNearbyHotels] = useState<Hotel[]>([]);
  const [bestHotels, setBestHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  // Find active category name
  const activeCategoryName = activeCategory 
    ? categories.find(cat => cat.id === activeCategory)?.name 
    : undefined;

  useEffect(() => {
    fetchHotels();
  }, [activeCategory, toast]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('hotels')
        .select('*');
      
      // Add category filter if active
      if (activeCategory) {
        query = query.eq('category', activeCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setHotels(data || []);

      if (data) {
        // For nearby hotels, we'll simulate by taking a random subset
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setNearbyHotels(shuffled.slice(0, 6));
        
        // Sort by rating for "best" hotels
        const sorted = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setBestHotels(sorted.slice(0, 6));
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
        title="Nearby Hotels" 
        venues={nearbyHotels} 
        venueType="hotel"
        onViewAll={() => handleViewAll('nearby')}
      />
      <VenueSection 
        title="Best Hotels" 
        venues={bestHotels} 
        venueType="hotel"
        onViewAll={() => handleViewAll('best')}
      />
    </>
  );

  // Content for the "Nearby" tab
  const nearbyContent = (
    <VenueGrid 
      title="Nearby Hotels" 
      venues={nearbyHotels} 
      venueType="hotel" 
    />
  );

  // Content for the "Best" tab
  const bestContent = (
    <VenueGrid 
      title="Best Hotels" 
      venues={bestHotels} 
      venueType="hotel" 
    />
  );

  return (
    <VenuePageLayout
      title="Hotels"
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

export default Hotels;
