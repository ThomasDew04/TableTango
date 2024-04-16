import { memo, useCallback, useEffect, useState } from "react"
import useRestaurants from "../api/restaurants";
import { Restaurant } from "../interfaces";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { IoSearchOutline } from "react-icons/io5";

export default memo(function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
    <div className="restaurants-page">
      <Loader loading={loading} />
      <Error error={error} />
      <Error error={error} />
      <section>
        <div className="filter-input-container">
          <div>
            <label>Name</label>
            <input type="text" className="filter-input" placeholder="Mr. Sato"/>
          </div>
          <span />
          <div>
            <label>When</label>
            <input type="datetime-local" className="filter-input" />
          </div>
          <button>
            <IoSearchOutline size={30}/><p>Search</p>
          </button>
        </div>
      </section>

       {/* {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.cuisine}</p>
          <p>{restaurant.address}</p>
        </div>
      ))} */}
      
    </div>
  )
}
);