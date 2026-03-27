import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { jsPDF } from "jspdf";

import RiderMap from "../components/RiderMap";

function OrderSuccess() {

  const { cartItems } = useContext(StoreContext);

  const [status, setStatus] = useState("Preparing");

  useEffect(() => {

    const timer1 = setTimeout(() => setStatus("Out for Delivery"), 6000);
    const timer2 = setTimeout(() => setStatus("Delivered"), 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };

  }, []);

  const foodList = [
    { id: 1, name: "Burger", price: 120 },
    { id: 2, name: "Pizza", price: 250 },
    { id: 3, name: "Pasta", price: 180 }
  ];

  const cartFoods = foodList.filter(food => cartItems[food.id]);

  const subtotal = cartFoods.reduce(
    (total, food) => total + food.price * cartItems[food.id],
    0
  );

  const gst = Math.round(subtotal * 0.18);
  const delivery = subtotal > 0 ? 40 : 0;
  const total = subtotal + gst + delivery;

  const downloadBill = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("FoodApp Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 20, 30);

    let y = 50;

    cartFoods.forEach((food) => {
      doc.text(
        `${food.name} x ${cartItems[food.id]} - ₹${food.price * cartItems[food.id]}`,
        20,
        y
      );
      y += 10;
    });

    y += 10;
    doc.text(`Subtotal: ₹${subtotal}`, 20, y);
    y += 10;
    doc.text(`GST (18%): ₹${gst}`, 20, y);
    y += 10;
    doc.text(`Delivery: ₹${delivery}`, 20, y);
    y += 10;
    doc.text(`Total: ₹${total}`, 20, y);

    doc.save("FoodApp_Bill.pdf");
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">

    

      <div className="p-10">

        <h1 className="text-4xl text-green-400 mb-8">
          🎉 Order Placed Successfully
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}

          <div className="bg-gray-800 p-6 rounded-xl">

            <h2 className="text-2xl text-orange-400 mb-4">
              Order Bill
            </h2>

            {cartFoods.map((food) => (

              <div key={food.id} className="flex justify-between mb-2">

                <span>
                  {food.name} x {cartItems[food.id]}
                </span>

                <span>
                  ₹{food.price * cartItems[food.id]}
                </span>

              </div>

            ))}

            <hr className="my-4"/>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{gst}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <hr className="my-4"/>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={downloadBill}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg"
            >
              Download PDF Bill
            </button>

            {/* ORDER STATUS */}

            <div className="mt-8">

              <h3 className="text-xl text-orange-400 mb-3">
                Order Status
              </h3>

              <div className="flex flex-col gap-2 text-sm">

                <span className={status ? "text-green-400" : ""}>
                  ✅ Order Placed
                </span>

                <span className={status === "Preparing" || status === "Out for Delivery" || status === "Delivered" ? "text-green-400" : ""}>
                  🍳 Preparing
                </span>

                <span className={status === "Out for Delivery" || status === "Delivered" ? "text-green-400" : ""}>
                  🛵 Out for Delivery
                </span>

                <span className={status === "Delivered" ? "text-green-400" : ""}>
                  📦 Delivered
                </span>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="bg-gray-800 p-6 rounded-xl">

            <h2 className="text-xl text-orange-400 mb-4">
              Delivery Tracking
            </h2>

            {/* RIDER INFO */}

            <div className="bg-gray-700 p-4 rounded-lg mb-4">

              <p className="text-lg font-semibold">
                Rider: Rahul Kumar
              </p>

              <p>
                Vehicle: UP15 AB 2345
              </p>

              <p>
                Phone: 98xxxxxxx
              </p>

            </div>

            {/* MAP */}

            <RiderMap />

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;