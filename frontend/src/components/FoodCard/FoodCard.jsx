import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function FoodCard({ food }) {

  const { addToCart, removeFromCart, cartItems } = useContext(StoreContext);

  const qty = cartItems[food.id] || 0;

  const handleAdd = () => {
    addToCart(food.id);
  };

  const handleMinus = () => {
    removeFromCart(food.id);
  };

  // ⭐ Star Rating UI
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => {
      if (rating >= i + 1) return <FaStar key={i} />;
      if (rating >= i + 0.5) return <FaStarHalfAlt key={i} />;
      return <FaRegStar key={i} />;
    });
  };

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:scale-[1.03] group">

      <Link to={`/food/${food.id}`}>
        <div className="relative">

          {/* IMAGE */}
          <img
            src={food.image || "/foods/default.jpg"}
            alt={food.name}
            className="w-full h-52 object-cover"
            onError={(e) => {
              e.target.src = "/foods/default.jpg";
            }}
          />

          {/* LIGHT GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

          {/* DISCOUNT */}
          <span className="absolute top-3 left-3 bg-red-500 text-xs px-3 py-1 rounded-full font-semibold">
            {food.discount || "30% OFF"}
          </span>

          {/* VEG / NONVEG */}
          <span className="absolute bottom-3 left-3 bg-white text-xs px-2 py-1 rounded shadow flex items-center gap-1">

            <span
              className={`w-2 h-2 rounded-full ${
                food.type === "veg" ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>

            {food.type === "veg" ? "Veg" : "Non-Veg"}

          </span>

          {/* WISHLIST */}
          <span className="absolute top-3 right-3 bg-black/60 p-2 rounded-full cursor-pointer hover:scale-110 transition">
            ❤️
          </span>

          {/* FLOATING ADD BUTTON */}
          <div className="absolute bottom-3 right-3">

            {qty === 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAdd();
                }}
                className="bg-white text-orange-500 px-4 py-1 rounded-lg font-semibold shadow hover:bg-gray-100"
              >
                ADD
              </button>
            ) : (
              <div className="flex bg-white rounded-lg overflow-hidden shadow">

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleMinus();
                  }}
                  className="px-3 text-orange-500"
                >
                  -
                </button>

                <span className="px-3 text-black">{qty}</span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAdd();
                  }}
                  className="px-3 text-orange-500"
                >
                  +
                </button>

              </div>
            )}

          </div>

          {/* HOVER QUICK VIEW */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

            <button className="bg-orange-500 px-4 py-2 rounded-lg text-white text-sm">
              Quick View
            </button>

          </div>

        </div>
      </Link>

      {/* INFO */}
      <div className="p-5">

        <h3 className="text-lg font-semibold text-white">
          {food.name}
        </h3>

        {/* STAR RATING */}
        <div className="flex items-center gap-2 mt-1">

          <div className="flex text-yellow-400 text-sm">
            {renderStars(food.rating || 4.5)}
          </div>

          <span className="text-gray-400 text-xs">
            ({food.rating || 4.5})
          </span>

        </div>

        <p className="text-gray-400 text-sm mt-1">
          {food.deliveryTime || "20-25 min"} delivery
        </p>

        <p className="text-orange-400 font-bold mt-2">
          ₹{food.price}
        </p>

      </div>

    </div>
  );
}

export default FoodCard;