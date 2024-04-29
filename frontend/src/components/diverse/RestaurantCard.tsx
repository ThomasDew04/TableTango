import { FaLocationDot } from "react-icons/fa6";
import { PiForkKnifeFill } from "react-icons/pi";
import { RiCoinsFill } from "react-icons/ri";
import { Link } from "react-router-dom";

interface Data {
    restaurant: {
        ID: number;
        name: string;
        cuisine: string;
        address: string;
        pricerange: number;
        images: string;
    }
}

const RestaurantCard = ({ restaurant }: Data ) => {
    return (
        <Link to={`/restaurants/${restaurant.ID}`} className="restaurant-card" data-cy={restaurant.name+"fav"}>
            <img src={restaurant.images.split(' ')[0]} alt={restaurant.name} />
            <div className="restaurant-card-info">
                <h1 data-cy={restaurant.name}>{restaurant.name}</h1>
                <span><FaLocationDot size={25} /><p>{restaurant.address}</p></span>
                <span><PiForkKnifeFill size={25} /><p>{restaurant.cuisine}</p></span>
                <span><RiCoinsFill size={25} />
                    <span>
                    {[...Array(restaurant.pricerange)].map((_, index) => (
                        <p key={index} className="filled-ball" />
                    ))}
                    {[...Array(5 - restaurant.pricerange)].map((_, index) => (
                        <p key={index} className="empty-ball" />
                    ))}
                    </span>
                </span>
            </div>
        </Link>
    );
};


export default RestaurantCard;