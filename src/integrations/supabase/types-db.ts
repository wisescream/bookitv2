
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
