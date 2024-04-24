import { memo, useEffect, useState } from "react";
import BreadCrumb from "../components/diverse/BreadCrumb";
import { Reservation } from "../interfaces";
import Loader from "../components/Loader";
import Error from "../components/Error";
import useReservations from "../api/reservations";

export default memo(function Reservations() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { getReservationsByUser } = useReservations();
    const user_id = JSON.parse(localStorage.getItem("user")!).ID;

    const refreshReservations = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await getReservationsByUser(user_id);
          setReservations(data);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        refreshReservations();
      }, []);
    
    return (
        <div>
            <Loader loading={loading} />
            <Error error={error} />
            <BreadCrumb page="Reservations"/>
            <div className="reservations-container">
            {reservations.map((reservation) => (
                <div className="res-card" key={reservation.reservation_id}>
                    <p>{reservation.reservation_datetime.toLocaleString()}</p>
                    <p>{reservation.num_guests}</p>
                </div>
            ))}
            </div>
        </div>
    );
});