import { memo, useCallback, useEffect, useState } from "react"
import useRestaurants from "../api/restaurants";
import { Restaurant } from "../interfaces";

export default memo(function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAll } = useRestaurants();

  const refreshRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAll();
      setRestaurants(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [getAll]);

  useEffect(() => {
    refreshRestaurants();
  }, []);

  return (
    <>
      {/* {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.cuisine}</p>
          <p>{restaurant.address}</p>
        </div>
      ))} */}
    </>
  )
}
);