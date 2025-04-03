
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Spa } from '@/integrations/supabase/types-db';
import VenueDetailLayout from '@/components/VenueDetailLayout';
import BookingForm from '@/components/BookingForm';
import { Card, CardContent } from '@/components/ui/card';
import { fetchVenueRating } from '@/services/tripAdvisorService';

const SpaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [spa, setSpa] = useState<Spa | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('details');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (!id) return;
        
        // Fetch spa details
        const { data: spaData, error: spaError } = await supabase
          .from('spas')
          .select('*')
          .eq('id', id)
          .single();
        
        if (spaError) throw spaError;
        setSpa(spaData);
        
        // Fetch TripAdvisor rating if not already present
        if (spaData && !spaData.tripadvisor_rating) {
          fetchVenueRating(id, 'spa');
        }
      } catch (error) {
        console.error('Error fetching spa data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load spa information',
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
  
  if (!spa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold mb-2">Spa Not Found</h2>
          <p className="text-gray-500">The spa you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <VenueDetailLayout
      id={spa.id}
      name={spa.name}
      address={spa.address}
      city={spa.city}
      imageUrl={spa.image_url}
      rating={spa.rating}
      description={spa.description}
      category={spa.category}
      type="spa"
      price={spa.price_per_session}
      priceLabel="Session"
      tripadvisorRating={spa.tripadvisor_rating}
      tripadvisorReviewsCount={spa.tripadvisor_reviews_count}
      tripadvisorLastUpdated={spa.tripadvisor_last_updated}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="details">Services</TabsTrigger>
          <TabsTrigger value="book">Book a Session</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">About this spa</h3>
              <p className="text-sm text-gray-600">
                {spa.description || 'No detailed description available for this spa.'}
              </p>
              
              <h3 className="font-medium mt-4 mb-2">Services Offered</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-sm">Massage Therapy</h4>
                    <p className="text-xs text-gray-500">Relaxing full body massage</p>
                  </div>
                  <div className="text-sm font-medium">$60</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-sm">Facial Treatment</h4>
                    <p className="text-xs text-gray-500">Rejuvenating facial care</p>
                  </div>
                  <div className="text-sm font-medium">$75</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-sm">Body Scrub</h4>
                    <p className="text-xs text-gray-500">Exfoliating body treatment</p>
                  </div>
                  <div className="text-sm font-medium">$85</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-sm">Aromatherapy</h4>
                    <p className="text-xs text-gray-500">Essential oil therapy</p>
                  </div>
                  <div className="text-sm font-medium">$55</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="book">
          <Card>
            <CardContent className="p-4">
              <BookingForm 
                venueId={spa.id}
                venueType="spa"
                venueName={spa.name}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </VenueDetailLayout>
  );
};

export default SpaDetail;
