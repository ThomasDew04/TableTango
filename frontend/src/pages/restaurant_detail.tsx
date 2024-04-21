import { memo, useCallback, useEffect, useState } from "react";
import useRestaurants from "../api/restaurants";
import { useParams } from "react-router";
import { Favorite, Restaurant } from "../interfaces";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { LuMoveLeft } from "react-icons/lu";
import { Link } from "react-router-dom";
import { PiForkKnifeFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { RiCoinsFill } from "react-icons/ri";
import { BsFillClockFill } from "react-icons/bs";
import useFavorites from "../api/favorites";
import { useAuth } from "../components/auth/AuthProvider";
import { FaHeartBroken, FaRegHeart } from "react-icons/fa";

function BackButton({}) {
    return (
    <Link to="/" className="back-btn">
        <LuMoveLeft size={30} />
        <p>Back</p>
    </Link>);
  }

export default memo(function Restaurant() {
    const [restaurant, setRestaurant] = useState<Restaurant>();
    const [favorites, setFavorites] = useState<Restaurant[]>([]);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { getById } = useRestaurants();
    const { addFavorite, getFavorites, deleteFavorite } = useFavorites();
    const { user } = useAuth();
    const { id } = useParams();

    const addFav = async () => {
      const favorite: Favorite = {
          user_id: user?.ID!,
          restaurant_id: restaurant?.ID!,
      }
      try {
          setLoading(true);
          setError(null);
          await addFavorite(favorite);
          refreshUserFavorites();
      } catch (error: any) {
          setError(error.message);
      } finally {
          setLoading(false);
      }
    };

    const removeFav = async () => {
      try {
          setLoading(true);
          setError(null);
          await deleteFavorite(user?.ID!, restaurant?.ID!);
          setFavorites((favorites) => favorites.filter((restaurant) => restaurant.ID !== restaurant?.ID));
      } catch (error: any) {
          setError(error.message);
      } finally {
          setLoading(false);
      }
    };

    const refreshRestaurant = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getById(id!);
        setRestaurant(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, [getById, id]);

    const refreshUserFavorites = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFavorites(user?.ID!);
        setFavorites(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, [favorites]);
    
    useEffect(() => {
      refreshRestaurant();
      refreshUserFavorites();
    }, [id]);

    return (
        <div className="restaurants-page">
          <Loader loading={loading} />
          <Error error={error} />
          <BackButton />
          <div className="breadcrumb">
            <div className="bc-det">
                <h1>{restaurant?.name}</h1>
                {!favorites.some((fav) => fav.ID === restaurant?.ID) ? 
                <button className="fav-btn" onClick={addFav}>Add favorite <FaRegHeart /></button> : 
                <button className="fav-btn" onClick={removeFav}>Remove favorite <FaHeartBroken /></button>
                }
            </div>
            <span />
          </div>
          <div className="restaurant-details">
            <div className="left-details">
              <div className="image-det-container">
                <img src={restaurant?.images.split(' ')[0]} alt={restaurant?.name} />
                <div className="right-images">
                  <img src={restaurant?.images.split(' ')[1]} alt={restaurant?.name} />
                  <img src={restaurant?.images.split(' ')[2]} alt={restaurant?.name} />
                </div>
              </div>
              <span className="det-divider" />
              <div className="restaurant-info">
                <p>{restaurant?.description}</p>
                <div className="info-bot">
                  <span className="info-bot-item"><PiForkKnifeFill size={30} /><p>{restaurant?.cuisine}</p></span>
                  <span className="info-bot-item"><FaLocationDot size={30} /><p>{restaurant?.address}</p></span>
                  <span className="info-bot-item"><RiCoinsFill size={30} />
                    <span className="pricerange-dots">
                    {[...Array(restaurant?.pricerange ?? 0)].map((_, index) => (
                        <p key={index} className="filled-ball" />
                    ))}
                    {[...Array(5 - (restaurant?.pricerange ?? 0))].map((_, index) => (
                        <p key={index} className="empty-ball" />
                    ))}
                    </span>
                  </span>
                  <span className="info-bot-item"><BsFillClockFill size={30} /><p>{restaurant?.openinghours}</p></span>
                </div>
              </div>
            </div>
            <div className="right-details center">
              <form className="reservation-form center">
                <div className="inner-form">
                  <h2>Make a reservation</h2>
                  <div className="first-res-box">
                    <div className="top-res-row">
                      <div className="first-res-i">
                        <label className="la">Date</label>
                        <input type="date" />
                      </div>
                      <div className="second-res-i">
                        <label className="la">Time</label>
                        <input type="time" />
                      </div>
                    </div>
                    <div className="bottom-res-row">
                      <label>Guests</label>
                      <select>
                        <option value="1">1 guest</option>
                        <option value="2">2 guests</option>
                        <option value="3">3 guests</option>
                        <option value="4">4 guests</option>
                      </select>
                    </div>
                  </div>
                  <div className="second-res-box">
                    <label>Name</label>
                    <input type="text" placeholder="Thomas"/>
                  </div>
                  <div className="second-res-box">
                    <label>Phone</label>
                    <input type="text" placeholder="+32 478 48 26 15"/>
                  </div>
                  <button type="submit" className="reservate-btn">Reservate</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    )
  }
);