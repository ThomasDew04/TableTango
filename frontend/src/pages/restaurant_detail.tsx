import { memo, useCallback, useEffect, useState } from "react";
import useRestaurants from "../api/restaurants";
import { useParams } from "react-router";
import { Favorite, Reservation, Restaurant, Timeslot } from "../interfaces";
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
import useReservations from "../api/reservations";

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
    const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
    const [availableTimeslots, setAvailableTimeslots] = useState<Timeslot[]>([]);
    const [date, setDate] = useState<string>();
    const [selectedTimeslot, setSelectedTimeslot] = useState<Timeslot | null>(null);
    const [selectedGuests, setAmountGuests] = useState<string>("0");
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { getById, getTimeslotsById } = useRestaurants();
    const { addFavorite, getFavorites, deleteFavorite } = useFavorites();
    const { getReservationsByRestaurantByDate, createReservation } = useReservations();
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

    const refreshTimeslots = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTimeslotsById(id!);
        setTimeslots(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, [getTimeslotsById, id]);
    
    useEffect(() => {
      refreshRestaurant();
      refreshUserFavorites();
      refreshTimeslots();
    }, [id]);

    const filterTimeslots = (reservations: Reservation[]) => {
      const timeslotCounts: { [key: number]: number } = reservations.reduce(
        (counts: { [key: number]: number }, reservation: Reservation) => {
          counts[reservation.timeslot_id] = (counts[reservation.timeslot_id] || 0) + 1;
          return counts;
        }, {} );
      const availableTimeslots = timeslots.filter((timeslot) => {
        const timeslotCount = timeslotCounts[timeslot.timeslot_id] || 0;
        return timeslotCount < restaurant?.num_tables!;
      }).map((timeslot) => {
        const startTime = new Date(timeslot.start_time);
        const hours = startTime.getHours();
        const minutes = startTime.getMinutes();
        return {
          ...timeslot,
          start_time: `${hours}:${minutes.toString().padStart(2, '0')}`
        };
      });
      setAvailableTimeslots(availableTimeslots);
    }

    const handleDateChange = async (date: string) => {
      if (!date) return;
      try {
        setSelectedTimeslot(null);
        setLoading(true);
        setError(null);
        setDate(date);
        const data = await getReservationsByRestaurantByDate(restaurant?.ID!, date);
        filterTimeslots(data)
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const handleTimeslotChange = (timeslot_id: string) => {
      setSelectedTimeslot(availableTimeslots.find((timeslot) => timeslot.timeslot_id === parseInt(timeslot_id)) ?? null);
    };

    const handleReservation = async (e: any) => {
      e.preventDefault();
      if (selectedTimeslot === null
        || !name || !phone 
        || selectedGuests == "0" 
        || date === undefined
      ) { setError("Fill in all required fields!") } else if (
        user?.ID === undefined
        || restaurant?.ID === undefined
      ) { setError("User or restaurant not found!") }
      
      // Create reservation
      const reservation: Reservation = {
        user_id: user?.ID!,
        restaurant_id: restaurant?.ID!,
        timeslot_id: selectedTimeslot?.timeslot_id!,
        date: new Date(date + " " + selectedTimeslot?.start_time),
        num_guests: parseInt(selectedGuests),
        name: name,
        phone: phone,
      }
      try {
        setLoading(true);
        setError(null);
        await createReservation(reservation);
        refreshRestaurant();
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

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
              <form className="reservation-form center" onSubmit={handleReservation}>
                <div className="inner-form">
                  <h2>Make a reservation</h2>
                  <div className="first-res-box">
                    <div className="top-res-row">
                      <div className="first-res-i">
                        <label className="la">Date</label>
                        <input 
                          type="date" 
                          onChange={(e) => (handleDateChange(e.target.value))}
                          />
                      </div>
                      <div className="second-res-i">
                        <label className="la">Time</label>
                        <select 
                          disabled={availableTimeslots.length === 0}
                          onChange={(e) => handleTimeslotChange(e.target.value)} >
                          {availableTimeslots.map((timeslot) => (
                          <option key={timeslot.timeslot_id} value={timeslot.timeslot_id}>
                            {timeslot.start_time}
                          </option>
                        ))}
                        </select>
                      </div>
                    </div>
                    <div className="bottom-res-row">
                      <label>Guests</label>
                      <select value={selectedGuests} onChange={(e) => setAmountGuests(e.target.value)}>
                        <option value="1">1 guest</option>
                        <option value="2">2 guests</option>
                        <option value="3">3 guests</option>
                        <option value="4">4 guests</option>
                      </select>
                    </div>
                  </div>
                  <div className="second-res-box">
                    <label>Name</label>
                    <input type="text" placeholder="Thomas" onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className="second-res-box">
                    <label>Phone</label>
                    <input type="text" placeholder="+32 478 48 26 15" onChange={(e) => setPhone(e.target.value)}/>
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