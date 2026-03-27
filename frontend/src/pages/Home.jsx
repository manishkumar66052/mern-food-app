import { useState } from "react";
import FoodCard from "../components/FoodCard/FoodCard";

const foods = [
  {
    id: 1,
    name: "Burger",
    category: "Burger",
    price: 120,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 2,
    name: "Pizza",
    category: "Pizza",
    price: 250,
    image: "https://images.unsplash.com/photo-1548365328-9f547fb0953c",
  },
  {
    id: 3,
    name: "Pasta",
    category: "Pasta",
    price: 180,
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb",
  },
  {
    id: 4,
    name: "Sandwich",
    category: "Sandwich",
    price: 90,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
  },
  {
    id: 5,
    name: "Taco",
    category: "Taco",
    price: 160,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
  },
  {
    id: 6,
    name: "Noodles",
    category: "Noodles",
    price: 140,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
  },
];

function Home() {

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredFoods = foods.filter((food) => {

    const matchCategory =
      category === "All" || food.category === category;

    const matchSearch =
      food.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">

      <h1 className="text-4xl font-bold text-orange-400 mb-6 text-center">
        Popular Foods 🍔
      </h1>

      {/* Search Bar */}

      <div className="flex justify-center mb-6">

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
        />

      </div>

      {/* Category Buttons */}

      <div className="flex flex-wrap justify-center gap-4 mb-10">

        {["All","Burger","Pizza","Pasta","Sandwich","Taco","Noodles"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-lg ${
              category === cat
                ? "bg-orange-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* Food Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredFoods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}

      </div>

    </div>
  );
}

export default Home;