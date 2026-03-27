import { useNavigate } from "react-router-dom";

function Orders() {

  const navigate = useNavigate();

  const handleOrder = () => {
    navigate("/order-success");
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">

      <h1 className="text-4xl text-orange-400 mb-10">
        Delivery Information
      </h1>

      <div className="max-w-lg bg-gray-800 p-6 rounded-xl">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded bg-gray-700"
        />

        <input
          type="text"
          placeholder="Address"
          className="w-full p-3 mb-4 rounded bg-gray-700"
        />

        <input
          type="text"
          placeholder="City"
          className="w-full p-3 mb-4 rounded bg-gray-700"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 mb-4 rounded bg-gray-700"
        />

        <button
          onClick={handleOrder}
          className="w-full bg-orange-500 py-3 rounded-lg hover:bg-orange-600"
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default Orders;