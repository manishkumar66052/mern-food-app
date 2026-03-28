import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

function Cart() {

  const { cartItems, removeFromCart, addToCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const foodList = [

  { id:1,name:"Burger",price:120,image:"https://images.unsplash.com/photo-1550547660-d9450f859349" },
  { id:2,name:"Pizza",price:250,image:"https://images.unsplash.com/photo-1548365328-9f547fb0953c" },
  { id:3,name:"Pasta",price:180,image:"https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb" },
  { id:4,name:"Sandwich",price:90,image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af" },
  { id:5,name:"Taco",price:160,image:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b" },
  { id:6,name:"Noodles",price:140,image:"https://images.unsplash.com/photo-1585032226651-759b368d7246" },

  { id:7,name:"Chole Bhature",price:150,image:"https://images.unsplash.com/photo-1625944525903-b0c7c9a4f39f" },
  { id:8,name:"Momos",price:120,image:"https://images.unsplash.com/photo-1604909053197-6e4e5b9fc5f8" },
  { id:9,name:"Chocolate Cake",price:200,image:"https://images.unsplash.com/photo-1601972599720-36938d4ecd31" },
  { id:10,name:"Cold Drink",price:50,image:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13" },
  { id:11,name:"Maggi",price:70,image:"https://images.unsplash.com/photo-1612929633738-8fe44f7ec841" },
  { id:12,name:"Paneer Roll",price:130,image:"https://images.unsplash.com/photo-1604908176997-4311f3b1c7c5" },
  { id:13,name:"French Fries",price:110,image:"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5" },
  { id:14,name:"Biryani",price:220,image:"https://images.unsplash.com/photo-1563379091339-03246963d6d9" },
  { id:15,name:"Ice Cream",price:90,image:"https://images.unsplash.com/photo-1501443762994-82bd5dace89a" }

  ];

  const cartFoods = foodList.filter(food => cartItems[food.id]);

  const subtotal = cartFoods.reduce(
    (total, food) => total + food.price * cartItems[food.id],
    0
  );

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

              <div className="flex items-center gap-3">

                <button
                  onClick={() => removeFromCart(food.id)}
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  -
                </button>

                <span>{cartItems[food.id]}</span>

                <button
                  onClick={() => addToCart(food.id)}
                  className="bg-green-500 px-3 py-1 rounded"
                >
                  +
                </button>

              </div>

              <div className="text-lg font-bold">
                ₹{food.price * cartItems[food.id]}
              </div>

            </div>
          ))}

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