import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

function FoodCard({ food }) {

  const { addToCart } = useContext(StoreContext);

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">

      <Link to={`/food/${food.id}`}>

        <img
          src={food.image}
          alt={food.name}
          className="w-full h-40 object-cover rounded-t-xl"
        />

        <div className="p-4">

          <h3 className="text-xl font-semibold text-white">
            {food.name}
          </h3>

          <p className="text-orange-400 font-bold mt-2">
            ₹{food.price}
          </p>

        </div>

      </Link>

      <div className="px-4 pb-4">

        <button
          onClick={() => addToCart(food.id)}
          className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-lg"
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default FoodCard;