import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

function Navbar() {

  const { cartItems } = useContext(StoreContext);

  const totalItems = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return (
    <nav className="bg-black text-white flex justify-between items-center px-8 py-4">

      <h1 className="text-2xl font-bold text-orange-400">
        FoodApp 🍔
      </h1>

      <div className="flex items-center gap-6 text-lg">

        <Link to="/" className="hover:text-orange-400">
          Home
        </Link>

        <Link to="/cart" className="relative hover:text-orange-400">

          Cart 🛒

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-orange-500 text-xs px-2 py-1 rounded-full">
              {totalItems}
            </span>
          )}

        </Link>

        <Link to="/login" className="hover:text-orange-400">
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;