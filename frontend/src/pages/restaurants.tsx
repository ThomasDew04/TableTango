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
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFood, setActiveFood] = useState<string | null>(null);  
  const [placeFilter, setPlaceFilter] = useState<string | null>(null);
  const { getAll } = useRestaurants();

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

  const filterRestaurants = () => {
    if (activeFood === null && !placeFilter) return restaurants;

    // Filter by type of food
    let filteredRestaurants = restaurants;
    if (activeFood !== null) {
        filteredRestaurants = restaurants.filter((restaurant) => 
        restaurant.cuisine.toLowerCase() === activeFood.toLocaleLowerCase());
    }
    
    // Filter by place
    if (placeFilter !== null && placeFilter.trim() !== '') {
      filteredRestaurants = filteredRestaurants.filter((restaurant) => 
        restaurant.address.toLowerCase().includes(placeFilter.toLocaleLowerCase()));
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
            <label>Place</label>
            <input type="text" 
              className="filter-input" 
              placeholder="Ghent"
              onChange={(e) => setPlaceFilter(e.target.value)} 
              />
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
          {filterRestaurants().map((restaurant) => (
            <RestaurantCard key={restaurant.ID} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </div>
  )
}
);