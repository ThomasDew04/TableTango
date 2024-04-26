import { Reservation } from "../../interfaces";
import { PiForkKnifeFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendar } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";

interface Data {
    reservation: Reservation;
    in_past: boolean;
    deleteReservation: (id: number) => Promise<void>;
}

const ReservationCard = ({ reservation, in_past, deleteReservation }: Data) => {

    return (
        <div className="reservation-card" key={reservation.reservation_id}>
        <div className="res-card-info">
            <div className="res-top-row">
                <h3>{reservation.restaurant_name}</h3>
                {in_past ? "" : <button className="cncl-btn" onClick={() => deleteReservation(reservation.reservation_id!)}>Cancel</button>}
            </div>
          <span className="tf"><PiForkKnifeFill size={40} /><p>{reservation.cuisine}</p></span>
          <div className="res-bot-row">
            <span>
                <FaLocationDot size={30} />
                <p>{reservation.address?.split(",")[0]},<br />{reservation.address?.split(",")[1]}</p>
            </span>
            <span>
                <BsCalendar size={30} />
                <p>
                    {reservation.reservation_datetime.toLocaleString().split("T")[1].slice(0, 5)},<br />
                    {reservation.reservation_datetime.toLocaleString().split("T")[0]}
                </p>
            </span>
            <span>
                <IoPersonSharp size={30} />
                <p>{reservation.num_guests}</p>
            </span>
          </div>
        </div>
        <img src={reservation.images?.split(' ')[0]} alt="reservation" />
      </div>
    )
};

export default ReservationCard;