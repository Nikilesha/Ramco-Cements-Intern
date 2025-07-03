
-- Create enum types for roles and statuses
CREATE TYPE public.user_role AS ENUM ('admin', 'manager', 'driver');
CREATE TYPE public.truck_status AS ENUM ('active', 'maintenance', 'inactive');
CREATE TYPE public.shipment_status AS ENUM ('pending', 'in_transit', 'delivered', 'delayed');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'driver',
  employee_id TEXT UNIQUE,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create trucks table
CREATE TABLE public.trucks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  truck_number TEXT UNIQUE NOT NULL,
  driver_id UUID REFERENCES public.profiles(id),
  status truck_status NOT NULL DEFAULT 'active',
  current_location_lat DECIMAL(10, 8),
  current_location_lng DECIMAL(11, 8),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create routes table
CREATE TABLE public.routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  origin_lat DECIMAL(10, 8) NOT NULL,
  origin_lng DECIMAL(11, 8) NOT NULL,
  destination_lat DECIMAL(10, 8) NOT NULL,
  destination_lng DECIMAL(11, 8) NOT NULL,
  distance_km DECIMAL(8, 2),
  estimated_duration_hours DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shipments table
CREATE TABLE public.shipments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_number TEXT UNIQUE NOT NULL,
  truck_id UUID REFERENCES public.trucks(id),
  route_id UUID REFERENCES public.routes(id),
  status shipment_status NOT NULL DEFAULT 'pending',
  cargo_weight DECIMAL(8, 2),
  pickup_time TIMESTAMP WITH TIME ZONE,
  delivery_time TIMESTAMP WITH TIME ZONE,
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create truck_locations table for GPS tracking
CREATE TABLE public.truck_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  truck_id UUID REFERENCES public.trucks(id) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  speed DECIMAL(5, 2),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trucks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.truck_locations ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins and managers can view all profiles" ON public.profiles
  FOR SELECT USING (get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for trucks
CREATE POLICY "Drivers can view assigned trucks" ON public.trucks
  FOR SELECT USING (driver_id = auth.uid() OR get_user_role(auth.uid()) IN ('admin', 'manager'));

CREATE POLICY "Admins and managers can manage trucks" ON public.trucks
  FOR ALL USING (get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for routes
CREATE POLICY "Authenticated users can view routes" ON public.routes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and managers can manage routes" ON public.routes
  FOR ALL USING (get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for shipments
CREATE POLICY "Users can view relevant shipments" ON public.shipments
  FOR SELECT USING (
    get_user_role(auth.uid()) IN ('admin', 'manager') OR
    EXISTS (SELECT 1 FROM public.trucks WHERE trucks.id = shipments.truck_id AND trucks.driver_id = auth.uid())
  );

CREATE POLICY "Admins and managers can manage shipments" ON public.shipments
  FOR ALL USING (get_user_role(auth.uid()) IN ('admin', 'manager'));

-- RLS Policies for truck_locations
CREATE POLICY "Users can view relevant truck locations" ON public.truck_locations
  FOR SELECT USING (
    get_user_role(auth.uid()) IN ('admin', 'manager') OR
    EXISTS (SELECT 1 FROM public.trucks WHERE trucks.id = truck_locations.truck_id AND trucks.driver_id = auth.uid())
  );

CREATE POLICY "Drivers can insert their truck locations" ON public.truck_locations
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.trucks WHERE trucks.id = truck_locations.truck_id AND trucks.driver_id = auth.uid())
  );

-- Trigger function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, employee_id)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(new.raw_user_meta_data ->> 'last_name', ''),
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'employee_id', '')
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_shipments_updated_at BEFORE UPDATE ON public.shipments
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
