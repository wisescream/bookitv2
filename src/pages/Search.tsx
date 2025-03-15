
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Restaurant, Hotel, Spa } from '@/integrations/supabase/types-db';
import VenueCard from '@/components/VenueCard';

type SearchResult = 
  | (Restaurant & { type: 'restaurant' })
  | (Hotel & { type: 'hotel' })
  | (Spa & { type: 'spa' });

const Search = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search query required",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Search for restaurants
      const { data: restaurants, error: restaurantError } = await supabase
        .from('restaurants')
        .select('*')
        .ilike('name', `%${searchQuery}%`);
      
      if (restaurantError) throw restaurantError;
      
      // Search for hotels
      const { data: hotels, error: hotelError } = await supabase
        .from('hotels')
        .select('*')
        .ilike('name', `%${searchQuery}%`);
      
      if (hotelError) throw hotelError;
      
      // Search for spas
      const { data: spas, error: spaError } = await supabase
        .from('spas')
        .select('*')
        .ilike('name', `%${searchQuery}%`);
      
      if (spaError) throw spaError;

      // Combine and format results
      const formattedResults: SearchResult[] = [
        ...(restaurants || []).map(r => ({ ...r, type: 'restaurant' as const })),
        ...(hotels || []).map(h => ({ ...h, type: 'hotel' as const })),
        ...(spas || []).map(s => ({ ...s, type: 'spa' as const }))
      ];
      
      setResults(formattedResults);
      
      if (formattedResults.length === 0) {
        toast({
          title: "No results found",
          description: `No matches found for "${searchQuery}"`,
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "There was an error processing your search",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-xl font-bold">Search</h1>
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Search for restaurants, hotels, or spas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            onClick={handleSearch} 
            disabled={loading}
            className="bg-foodapp-primary hover:bg-foodapp-primary/90"
          >
            <SearchIcon size={18} />
          </Button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 px-6 pb-20">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-200 rounded-xl h-48 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-3">{results.length} results found</p>
                <div className="grid grid-cols-2 gap-4">
                  {results.map((result) => (
                    <VenueCard
                      key={`${result.type}-${result.id}`}
                      id={result.id}
                      name={result.name}
                      address={result.address}
                      city={result.city}
                      imageUrl={result.image_url || ''}
                      rating={'rating' in result ? result.rating : undefined}
                      price={
                        'price_per_night' in result
                          ? result.price_per_night
                          : 'price_per_session' in result
                          ? result.price_per_session
                          : undefined
                      }
                      priceLabel={
                        'price_per_night' in result
                          ? 'From'
                          : 'price_per_session' in result
                          ? 'Session'
                          : undefined
                      }
                      type={result.type}
                    />
                  ))}
                </div>
              </div>
            ) : (
              searchQuery && !loading && (
                <div className="flex flex-col items-center justify-center h-52 mt-8">
                  <SearchIcon size={48} className="text-gray-300 mb-2" />
                  <p className="text-gray-500">No results found. Try a different search term.</p>
                </div>
              )
            )}
            
            {!searchQuery && !loading && (
              <div className="flex flex-col items-center justify-center h-52 mt-8">
                <SearchIcon size={48} className="text-gray-300 mb-2" />
                <p className="text-gray-500">Start searching for venues</p>
              </div>
            )}
          </>
        )}
      </main>
    </motion.div>
  );
};

export default Search;
