import { memo, useCallback, useEffect, useState } from "react"
import useRestaurants from "../api/restaurants";
import { Restaurant } from "../interfaces";
import Loader from "../components/Loader";
import Error from "../components/Error";
import foods from "../data/foodsData";
import { IoSearchOutline } from "react-icons/io5";
import FoodChoice from "../components/diverse/FoodChoice";
import { FaList } from "react-icons/fa";
import RestaurantCard from "../components/diverse/RestaurantCard";

export default memo(function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [availableRestaurants, setAvailableRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFood, setActiveFood] = useState<string | null>(null);  
  const [placeFilter, setPlaceFilter] = useState<string | null>(null);
  const { getAll, getAvailableRestaurantsByDate } = useRestaurants();

  const refreshRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAll();
      setRestaurants(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [getAll]);

  useEffect(() => {
    refreshRestaurants();
  }, []);

  const getAvailableRestaurants = useCallback(async (date: string) => {
    if (!date) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getAvailableRestaurantsByDate(date);
      setAvailableRestaurants(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [getAvailableRestaurantsByDate]);

  const filterRestaurants = (restaurantsArray: Restaurant[]) => {
    let restaurantsToFilter: Restaurant[];
    restaurantsArray.length > 0 ? restaurantsToFilter = restaurantsArray : restaurantsToFilter = restaurants;
  
    if (activeFood === null && !placeFilter) return restaurantsToFilter;
  
    // Filter by type of food
    let filteredRestaurants = restaurantsToFilter;
    if (activeFood !== null) {
      filteredRestaurants = restaurantsToFilter.filter((restaurant) =>
        restaurant.cuisine.toLowerCase() === activeFood.toLocaleLowerCase()
      );
    }
  
    // Filter by place
    if (placeFilter !== null && placeFilter.trim() !== '') {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        restaurant.address.toLowerCase().includes(placeFilter.toLocaleLowerCase())
      );
    }
  
    return filteredRestaurants;
  };  

  return (
    <div className="restaurants-page">
      <Loader loading={loading} />
      <Error error={error} />
      <section>
        <div className="filter-input-container">
          <div>
            <label>When</label>
            <input 
              type="date" 
              className="filter-input" 
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => getAvailableRestaurants(e.target.value)}
            />
          </div>
          <span />
          <div>
            <label>Place</label>
            <input type="text" 
              className="filter-input" 
              placeholder="Ghent"
              onChange={(e) => setPlaceFilter(e.target.value)} 
              />
          </div>
          <button>
            <IoSearchOutline size={30}/><p>Search</p>
          </button>
        </div>
      </section>
      <section>
        <div className="filter-foods-container center">
          {foods.map((food, index) => (
            <FoodChoice
              key={index}
              data={food}
              isActive={food.footnote.split(' ')[0] === activeFood}
              onClick={() => setActiveFood(food.footnote.split(' ')[0])}
            />
          ))}
          <button className="gen-filter-btn">
            <FaList size={20} />
            <p>Filter</p>
          </button>
        </div>
      </section>
      <section>
        <div className="restaurants-cards-container">
        {filterRestaurants(availableRestaurants).map((restaurant) => (
          <RestaurantCard key={restaurant.ID} restaurant={restaurant} />
        ))}
        </div>
      </section>
    </div>
  )
}
);