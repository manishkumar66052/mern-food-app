import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

function FoodCard({ food }) {

  const { addToCart } = useContext(StoreContext);
  const [qty, setQty] = useState(0);

  const handleAdd = () => {
    addToCart(food.id);
    setQty(qty + 1);
  };

  const handleMinus = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:scale-[1.03] group">

      {/* IMAGE */}

      <Link to={`/food/${food.id}`}>
        <div className="relative">

          <img
            src={food.image}
            alt={food.name}
            className="w-full h-48 object-cover"
          />

          {/* GRADIENT OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* DISCOUNT BADGE */}

          <span className="absolute top-3 left-3 bg-red-500 text-xs px-3 py-1 rounded-full font-semibold">
            30% OFF
          </span>

          {/* VEG / NON VEG */}

          <span className="absolute bottom-3 left-3 bg-white text-xs px-2 py-1 rounded">
            {food.type === "veg" ? "🥦 Veg" : "🍗 Non-Veg"}
          </span>

          {/* HEART */}

          <span className="absolute top-3 right-3 bg-black/60 p-2 rounded-full cursor-pointer hover:scale-110 transition">
            ❤️
          </span>

        </div>
      </Link>

      {/* INFO */}

      <div className="p-4">

        <div className="flex justify-between items-center">

          <h3 className="text-lg font-semibold text-white">
            {food.name}
          </h3>

          {/* DYNAMIC RATING */}

          <span className="bg-green-500 text-xs px-2 py-1 rounded">
            ⭐ {food.rating || 4.5}
          </span>

        </div>

        <p className="text-gray-400 text-sm mt-1">
          {food.deliveryTime || "20-25 min"} delivery
        </p>

        <div className="flex justify-between items-center mt-2">

          <p className="text-orange-400 font-bold">
            ₹{food.price}
          </p>

          {/* ADD / QUANTITY BUTTON */}

          {qty === 0 ? (
            <button
              onClick={handleAdd}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded-lg text-sm font-medium transition"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center bg-orange-500 rounded-lg overflow-hidden">

              <button
                onClick={handleMinus}
                className="px-3 py-1 hover:bg-orange-600"
              >
                -
              </button>

              <span className="px-3 text-sm font-semibold">
                {qty}
              </span>

              <button
                onClick={handleAdd}
                className="px-3 py-1 hover:bg-orange-600"
              >
                +
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default FoodCard;