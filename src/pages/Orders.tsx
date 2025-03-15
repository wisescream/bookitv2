import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar, Clock, Users, Check, X, Clock3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';
import { Booking } from '@/integrations/supabase/types-db';

const Orders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            restaurant:restaurant_id (
              name,
              address,
              image_url
            )
          `)
          .eq('user_id', user.id)
          .order('booking_date', { ascending: false });
        
        if (error) throw error;
        
        const typedBookings = (data || []).map(booking => ({
          ...booking,
          status: booking.status as 'confirmed' | 'cancelled' | 'pending'
        }));
        
        setBookings(typedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your bookings',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, toast]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Check size={18} className="text-green-500" />;
      case 'cancelled':
        return <X size={18} className="text-red-500" />;
      case 'pending':
        return <Clock3 size={18} className="text-amber-500" />;
      default:
        return null;
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
          <h1 className="text-xl font-bold">My Bookings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-20">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-200 rounded-xl h-24 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Calendar size={48} className="text-gray-300 mb-2" />
                <p className="text-gray-500">You don't have any bookings yet</p>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/restaurants')}
                  className="mt-4"
                >
                  Browse Restaurants
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div 
                    key={booking.id}
                    className="bg-white rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="h-16 w-16 bg-gray-200 rounded-lg bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${booking.restaurant.image_url || '/placeholder.svg'})` }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{booking.restaurant.name}</h3>
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-xs">
                            {getStatusIcon(booking.status)}
                            <span className="capitalize">{booking.status}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{booking.restaurant.address}</p>
                        
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{format(new Date(booking.booking_date), 'PPP')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{booking.booking_time.substring(0, 5)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </motion.div>
  );
};

export default Orders;
