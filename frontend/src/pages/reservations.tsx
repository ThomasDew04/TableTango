import { memo, useCallback, useEffect, useState } from "react";
import BreadCrumb from "../components/diverse/BreadCrumb";
import { Reservation } from "../interfaces";
import Loader from "../components/Loader";
import Error from "../components/Error";
import useReservations from "../api/reservations";
import ReservationCard from "../components/diverse/ReservationCard";
import { useAuth } from "../components/auth/AuthProvider";
import Success from "../components/Success";

export default memo(function Reservations() {
    const [ upcomingReservations, setUpcomingReservations ] = useState<Reservation[]>([]);
    const [pastReservations, setPastReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<null | string>(null);
    const { getReservationsByUser, deleteReservation } = useReservations();
    const { user, reservationUpdate } = useAuth();
    const user_id = JSON.parse(localStorage.getItem("user")!).ID;

    const filterReservatiions = (reservations: Reservation[]) => {
        const today = new Date();
        const upcoming = reservations.filter((reservation) => new Date(reservation.reservation_datetime) > today);
        const past = reservations.filter((reservation) => new Date(reservation.reservation_datetime) < today);
        setUpcomingReservations(upcoming);
        setPastReservations(past);
    };

    const refreshReservations = useCallback( async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await getReservationsByUser(user_id);
          filterReservatiions(data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
          setTimeout(() => {
            setError(null)
          }, 5000);
        }
      },  [user_id]);

    useEffect(() => {
        refreshReservations();
      }, [refreshReservations]);

    const cancelReservation = async (id: number) => {
      try {
          setLoading(true);
          setError(null);
          await deleteReservation(id);
          reservationUpdate(user?.resvMade! - 1, user?.tabletangoPoints! - 15);
          refreshReservations();
          setSuccess("Reservation cancelled!");
      } catch (error: any) {
          setError("Error cancelling reservation");
      } finally {
        setLoading(false);
        setTimeout(() => {
          setSuccess(null)
          setError(null)
        }, 5000);
      }
    };
    
    return (
        <div className="reservation-page">
            <Loader loading={loading} />
            <Error error={error} />
            <Success success={success} />
            <BreadCrumb page="Reservations"/>
            <div className="reservations-container">
              <h2>Upcoming reservations</h2>
            {upcomingReservations.length === 0 ? <p className="no-res">No upcoming reservations</p> :
            upcomingReservations.map((reservation) => (
              <ReservationCard reservation={reservation} in_past={false} key={reservation.reservation_id} deleteReservation={cancelReservation}/>
            ))}
              <h2>Past reservations</h2>
            {pastReservations.length === 0 ? <p className="no-res">No past reservations</p> : 
            pastReservations.map((reservation) => (
              <ReservationCard reservation={reservation} in_past={true} key={reservation.reservation_id} deleteReservation={cancelReservation} />
            ))}
            </div>
        </div>
    );
});