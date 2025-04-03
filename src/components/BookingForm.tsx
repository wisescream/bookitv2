
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CalendarIcon, Clock } from 'lucide-react';

type BookingFormProps = {
  venueId: string;
  venueType: 'restaurant' | 'hotel' | 'spa';
  venueName: string;
};

const BookingForm: React.FC<BookingFormProps> = ({ venueId, venueType, venueName }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>('12:00');
  const [guests, setGuests] = useState<number>(2);
  const [serviceType, setServiceType] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [loading, setLoading] = useState(false);

  // Time slots for restaurants and spas
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  // Service types for spas
  const spaServices = [
    'Massage', 'Facial', 'Body Treatment', 'Manicure/Pedicure', 
    'Hair Styling', 'Sauna', 'Wellness Package'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: 'Error',
        description: 'Please select a date',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      
      const userId = (await supabase.auth.getUser()).data.user?.id;
      
      if (!userId) {
        toast({
          title: 'Authentication Error',
          description: 'You must be logged in to make a booking',
          variant: 'destructive',
        });
        return;
      }

      let bookingResult;
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      if (venueType === 'restaurant') {
        bookingResult = await supabase
          .from('bookings')
          .insert({
            user_id: userId,
            restaurant_id: venueId,
            booking_date: formattedDate,
            booking_time: time,
            guests: guests,
            status: 'confirmed'
          });
      } else if (venueType === 'hotel') {
        if (!checkOutDate) {
          toast({
            title: 'Error',
            description: 'Please select a check-out date',
            variant: 'destructive',
          });
          return;
        }
        
        const formattedCheckOutDate = format(checkOutDate, 'yyyy-MM-dd');
        
        bookingResult = await supabase
          .from('hotel_bookings')
          .insert({
            user_id: userId,
            hotel_id: venueId,
            check_in_date: formattedDate,
            check_out_date: formattedCheckOutDate,
            guests: guests,
            status: 'confirmed'
          });
      } else if (venueType === 'spa') {
        if (!serviceType) {
          toast({
            title: 'Error',
            description: 'Please select a service type',
            variant: 'destructive',
          });
          return;
        }
        
        bookingResult = await supabase
          .from('spa_bookings')
          .insert({
            user_id: userId,
            spa_id: venueId,
            booking_date: formattedDate,
            booking_time: time,
            service_type: serviceType,
            status: 'confirmed'
          });
      }

      if (bookingResult?.error) {
        throw bookingResult.error;
      }

      toast({
        title: 'Booking Confirmed',
        description: `Your booking at ${venueName} has been confirmed.`,
      });
      
      navigate('/orders');
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: 'Booking Failed',
        description: 'There was an error processing your booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              id="date"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </PopoverContent>
        </Popover>
      </div>

      {venueType === 'hotel' && (
        <div>
          <Label htmlFor="checkOutDate">Check-out Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                id="checkOutDate"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOutDate ? format(checkOutDate, 'PPP') : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                initialFocus
                disabled={(day) => 
                  day < (date || new Date(new Date().setHours(0, 0, 0, 0)))
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {(venueType === 'restaurant' || venueType === 'spa') && (
        <div>
          <Label htmlFor="time">Time</Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger id="time">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {venueType === 'spa' && (
        <div>
          <Label htmlFor="serviceType">Service Type</Label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger id="serviceType">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {spaServices.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label htmlFor="guests">Number of Guests</Label>
        <Input
          id="guests"
          type="number"
          min="1"
          max="20"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Processing...' : 'Confirm Booking'}
      </Button>
    </form>
  );
};

export default BookingForm;
