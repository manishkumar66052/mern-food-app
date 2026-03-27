import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

function Cart() {

  const { cartItems, removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const foodList = [
    {
      id: 1,
      name: "Burger",
      price: 120,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    },
    {
      id: 2,
      name: "Pizza",
      price: 250,
      image: "https://images.unsplash.com/photo-1548365328-9f547fb0953c"
    },
    {
      id: 3,
      name: "Pasta",
      price: 180,
      image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb"
    },
  ];

  const cartFoods = foodList.filter(food => cartItems[food.id]);

  const subtotal = cartFoods.reduce(
    (total, food) => total + food.price * cartItems[food.id],
    0
  );

  // 18% GST
  const gst = Math.round(subtotal * 0.18);

  const deliveryFee = subtotal > 0 ? 40 : 0;

  const total = subtotal + gst + deliveryFee;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">

      <h1 className="text-4xl font-bold mb-10 text-orange-400">
        Your Cart 🛒
      </h1>

      {cartFoods.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <>
          {cartFoods.map((food) => (
            <div
              key={food.id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-xl mb-6"
            >

              <div className="flex items-center gap-4">

                <img
                  src={food.image}
                  alt={food.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div>
                  <h2 className="text-xl">{food.name}</h2>
                  <p className="text-orange-400">₹{food.price}</p>
                </div>

              </div>

              <div className="text-lg">
                Qty: {cartItems[food.id]}
              </div>

              <div className="text-lg font-bold">
                ₹{food.price * cartItems[food.id]}
              </div>

              <button
                onClick={() => removeFromCart(food.id)}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>

            </div>
          ))}

          {/* Cart Total Section */}

          <div className="mt-10 bg-gray-800 p-6 rounded-xl max-w-md">

            <h2 className="text-2xl mb-4 text-orange-400">
              Cart Totals
            </h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>GST (18%)</span>
              <span>₹{gst}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>

            <hr className="my-3"/>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/orders")}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg"
            >
              Checkout
            </button>

          </div>

        </>
      )}

    </div>
  );
}

export default Cart;