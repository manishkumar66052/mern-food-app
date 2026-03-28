import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { FaStar } from "react-icons/fa";

const foods = [

{ id:1, name:"Burger", price:120, rating:4.5,
description:"Delicious grilled burger with cheese and fresh vegetables.",
image:"https://images.unsplash.com/photo-1550547660-d9450f859349" },

{ id:2, name:"Pizza", price:250, rating:4.5,
description:"Hot cheesy pizza loaded with fresh toppings.",
image:"https://images.unsplash.com/photo-1548365328-9f547fb0953c" },

{ id:3, name:"Pasta", price:180, rating:4.5,
description:"Creamy pasta cooked with herbs and parmesan cheese.",
image:"https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb" },

{ id:4, name:"Sandwich", price:90, rating:4.5,
description:"Crispy grilled sandwich filled with vegetables and cheese.",
image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af" },

{ id:5, name:"Taco", price:160, rating:4.5,
description:"Mexican style taco with spicy fillings.",
image:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b" },

{ id:6, name:"Noodles", price:140, rating:4.5,
description:"Chinese style noodles tossed with vegetables and sauces.",
image:"https://images.unsplash.com/photo-1585032226651-759b368d7246" },

{ id:7, name:"Chole Bhature", price:150, rating:4.6,
description:"Traditional North Indian dish with spicy chole and fluffy bhature.",
image:"https://images.unsplash.com/photo-1625944525903-b0c7c9a4f39f" },

{ id:8, name:"Momos", price:120, rating:4.4,
description:"Steamed dumplings filled with vegetables and served with spicy chutney.",
image:"https://images.unsplash.com/photo-1604909053197-6e4e5b9fc5f8" },

{ id:9, name:"Chocolate Cake", price:200, rating:4.7,
description:"Rich chocolate cake topped with creamy chocolate frosting.",
image:"https://images.unsplash.com/photo-1601972599720-36938d4ecd31" },

{ id:10, name:"Cold Drink", price:50, rating:4.3,
description:"Refreshing chilled soft drink.",
image:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13" },

{ id:11, name:"Maggi", price:70, rating:4.4,
description:"Quick and tasty instant noodles loved by everyone.",
image:"https://images.unsplash.com/photo-1612929633738-8fe44f7ec841" },

{ id:12, name:"Paneer Roll", price:130, rating:4.5,
description:"Soft roll stuffed with spicy paneer filling.",
image:"https://images.unsplash.com/photo-1604908176997-4311f3b1c7c5" },

{ id:13, name:"French Fries", price:110, rating:4.4,
description:"Crispy golden fries served with ketchup.",
image:"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5" },

{ id:14, name:"Biryani", price:220, rating:4.7,
description:"Aromatic basmati rice cooked with spices and herbs.",
image:"https://images.unsplash.com/photo-1563379091339-03246963d6d9" },

{ id:15, name:"Ice Cream", price:90, rating:4.6,
description:"Sweet creamy dessert available in multiple flavors.",
image:"https://images.unsplash.com/photo-1501443762994-82bd5dace89a" }

];

function FoodDetails() {

const { id } = useParams();
const { addToCart } = useContext(StoreContext);

const food = foods.find((item) => item.id === Number(id));

if (!food) {
return (
<div className="text-white p-10 text-center">
Food not found
</div>
);
}

return (

<div className="bg-gray-900 min-h-screen text-white p-6">

<div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

<img
src={food.image}
alt={food.name}
className="rounded-xl w-full h-[350px] object-cover"
/>

<div>

<h1 className="text-4xl font-bold text-orange-400">
{food.name}
</h1>

<div className="flex items-center gap-2 mt-3 text-yellow-400">
<FaStar />
<span>{food.rating}</span>
</div>

<p className="mt-4 text-gray-300 leading-relaxed">
{food.description}
</p>

<p className="mt-6 text-3xl font-bold text-orange-400">
₹{food.price}
</p>

<button
onClick={() => addToCart(food.id)}
className="mt-6 bg-orange-500 px-8 py-3 rounded-lg hover:bg-orange-600 transition"
>
Add to Cart
</button>

</div>

</div>

</div>

);

}

export default FoodDetails;