import { Request } from 'mssql';

// Define the interface for the restaurant entity
interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  address: string;
}

export default Restaurant;
