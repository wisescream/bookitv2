
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Spa } from '@/integrations/supabase/types-db';
import { useToast } from '@/components/ui/use-toast';
import VenuePageLayout from '@/components/VenuePageLayout';
import CategorySection from '@/components/CategorySection';
import VenueSection from '@/components/VenueSection';
import VenueGrid from '@/components/VenueGrid';

// Spa categories
const categories = [
  { id: 'massage', name: 'Massage', icon: '💆' },
  { id: 'facial', name: 'Facial', icon: '😊' },
  { id: 'sauna', name: 'Sauna', icon: '🧖' },
  { id: 'wellness', name: 'Wellness', icon: '🧘' },
  { id: 'therapy', name: 'Therapy', icon: '🌿' },
  { id: 'beauty', name: 'Beauty', icon: '💅' },
];

const Spas = () => {
  const { toast } = useToast();
  const [spas, setSpas] = useState<Spa[]>([]);
  const [nearbySpas, setNearbySpas] = useState<Spa[]>([]);
  const [bestSpas, setBestSpas] = useState<Spa[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  // Find active category name
  const activeCategoryName = activeCategory 
    ? categories.find(cat => cat.id === activeCategory)?.name 
    : undefined;

  useEffect(() => {
    fetchSpas();
  }, [activeCategory, toast]);

  const fetchSpas = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('spas')
        .select('*');
      
      // Add category filter if active
      if (activeCategory) {
        query = query.eq('category', activeCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setSpas(data || []);

      if (data) {
        // For nearby spas, we'll simulate by taking a random subset
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setNearbySpas(shuffled.slice(0, 6));
        
        // Sort by rating for "best" spas
        const sorted = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setBestSpas(sorted.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching spas:', error);
      toast({
        title: 'Error',
        description: 'Failed to load spas',
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
        title="Nearby Spas" 
        venues={nearbySpas} 
        venueType="spa"
        onViewAll={() => handleViewAll('nearby')}
      />
      <VenueSection 
        title="Best Spas" 
        venues={bestSpas} 
        venueType="spa"
        onViewAll={() => handleViewAll('best')}
      />
    </>
  );

  // Content for the "Nearby" tab
  const nearbyContent = (
    <VenueGrid 
      title="Nearby Spas" 
      venues={nearbySpas} 
      venueType="spa" 
    />
  );

  // Content for the "Best" tab
  const bestContent = (
    <VenueGrid 
      title="Best Spas" 
      venues={bestSpas} 
      venueType="spa" 
    />
  );

  return (
    <VenuePageLayout
      title="Spas"
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

export default Spas;
