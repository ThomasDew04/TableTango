import { memo, useCallback, useEffect, useState } from "react";
import BreadCrumb from "../components/diverse/BreadCrumb";
import useFavorites from "../api/favorites";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Restaurant } from "../interfaces";
import RestaurantCard from "../components/diverse/RestaurantCard";
import { FaHeart } from "react-icons/fa";
import Success from "../components/Success";

export default memo(function Favorites() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<null | string>(null);
    const { getFavorites, deleteFavorite } = useFavorites();
    const user_id = JSON.parse(localStorage.getItem("user")!).ID;

    const refreshFavorites = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFavorites(user_id);
        setRestaurants(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setError(null)
        }, 5000);
      }
    }, [getFavorites]);
    
    useEffect(() => {
      refreshFavorites();
    }, []);

    const remove = async (restaurant_id: number) => {
      try {
        setLoading(true);
        setError(null);
        await deleteFavorite(user_id, restaurant_id);
        setRestaurants((restaurants) => restaurants.filter((restaurant) => restaurant.ID !== restaurant_id));
        setSuccess("Favorite removed!");
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setSuccess(null)
          setError(null)
        }, 5000);
      }
    };

    return (
      <div className="favorites-page">
          <Loader loading={loading} />
          <Error error={error} />
          <Success success={success} />
          <BreadCrumb page="Favorites"/>
          <div className="favorites-container">
          {restaurants.length === 0 ? 
              <p className="no-res">No favorites yet, go explore!</p> 
              : 
              restaurants.map((restaurant) => (
              <div className="fav-card" key={restaurant.ID}>
                  <RestaurantCard restaurant={restaurant} />
                  <button onClick={() => remove(restaurant.ID)}><FaHeart size={25} /></button>
              </div>
          ))}
          </div>
      </div>
    );
});