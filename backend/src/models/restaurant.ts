// Define the interface for the restaurant entity
interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  address: string;
  pricerange: number;
  openinghours: string;
  description: string;
  images: string;
}

export default Restaurant;
