import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const foods = [
  {
    id: 1,
    name: "Burger",
    price: 120,
    description: "Delicious grilled burger with cheese and fresh vegetables.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 2,
    name: "Pizza",
    price: 250,
    description: "Hot cheesy pizza loaded with fresh toppings.",
    image: "https://images.unsplash.com/photo-1548365328-9f547fb0953c",
  },
  {
    id: 3,
    name: "Pasta",
    price: 180,
    description: "Creamy pasta cooked with herbs and parmesan cheese.",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb",
  },
];

function FoodDetails() {

  const { id } = useParams();
  const { addToCart } = useContext(StoreContext);

  const food = foods.find((item) => item.id === parseInt(id));

  if (!food) {
    return <h1 className="text-white p-10">Food not found</h1>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">

        <img
          src={food.image}
          alt={food.name}
          className="rounded-xl w-full"
        />

        <div>

          <h1 className="text-4xl font-bold text-orange-400">
            {food.name}
          </h1>

          <p className="mt-4 text-gray-300">
            {food.description}
          </p>

          <p className="mt-6 text-2xl font-bold">
            ₹{food.price}
          </p>

          <button
            onClick={() => addToCart(food.id)}
            className="mt-6 bg-orange-500 px-6 py-3 rounded-lg hover:bg-orange-600"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default FoodDetails;