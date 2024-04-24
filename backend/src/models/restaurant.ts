// Define the interface for the restaurant entity
export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  address: string;
  pricerange: number;
  openinghours: string;
  description: string;
  images: string;
}

export interface Timeslot {
  id: number;
  restaurat_id: number;
  start_time: string;
}
