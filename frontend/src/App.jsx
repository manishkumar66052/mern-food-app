import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar/Navbar";
import FoodDetails from "./pages/FoodDetails";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main className="bg-gray-900 min-h-screen text-white">
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/food/:id" element={<FoodDetails />} />
  <Route path="/order-success" element={<OrderSuccess />} />
</Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;