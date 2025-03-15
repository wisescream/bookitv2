
export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
};

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  city: string;
  image_url: string | null;
  open_time: string;
  close_time: string;
  created_at: string;
};

export type Hotel = {
  id: string;
  name: string;
  address: string;
  city: string;
  image_url: string | null;
  description: string | null;
  price_per_night: number;
  rating: number | null;
  created_at: string;
};

export type Spa = {
  id: string;
  name: string;
  address: string;
  city: string;
  image_url: string | null;
  description: string | null;
  price_per_session: number;
  rating: number | null;
  created_at: string;
};

export type Booking = {
  id: string;
  user_id: string;
  restaurant_id: string;
  booking_date: string;
  booking_time: string;
  guests: number;
  status: string;
  created_at: string;
  restaurant?: Restaurant;
};

export type HotelBooking = {
  id: string;
  user_id: string;
  hotel_id: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  status: string;
  created_at: string;
  hotel?: Hotel;
};

export type SpaBooking = {
  id: string;
  user_id: string;
  spa_id: string;
  booking_date: string;
  booking_time: string;
  service_type: string;
  status: string;
  created_at: string;
  spa?: Spa;
};

export type FoodItem = {
  id: string;
  name: string;
  restaurant_id: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string;
  created_at: string;
};
