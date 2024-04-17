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
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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

  const handleFoodChoiceClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

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
      <section>
        <div className="filter-foods-container center">
          {foods.map((food, index) => (
            <FoodChoice key={index} 
            data={food} 
            isActive={index === activeIndex}
            onClick={() => handleFoodChoiceClick(index)}/>
          ))}
          <button className="gen-filter-btn">
            <FaList size={20} />
            <p>Filter</p>
          </button>
        </div>
      </section>
      <section>
        <div className="restaurants-cards-container">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.ID} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </div>
  )
}
);