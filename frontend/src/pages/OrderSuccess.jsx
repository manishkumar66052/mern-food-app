import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { jsPDF } from "jspdf";
import RiderMap from "../components/RiderMap";

function OrderSuccess() {

  const { cartItems } = useContext(StoreContext);

  const [status, setStatus] = useState("Order Placed");

  const [countdown, setCountdown] = useState(20);
  const [deliveryTime, setDeliveryTime] = useState(60);

  // RANDOM RIDERS
  const riders = [
    { name: "Rahul Kumar", vehicle: "UP15 AB 2345", phone: "9876543210" },
    { name: "Amit Singh", vehicle: "UP14 XY 9087", phone: "9898123456" },
    { name: "Vikram Sharma", vehicle: "DL8S AT 5522", phone: "9812345678" },
    { name: "Rohit Verma", vehicle: "HR26 DK 3321", phone: "9865321478" },
    { name: "Sandeep Yadav", vehicle: "UP16 ZT 7654", phone: "9890012345" },
    { name: "Mohit Chauhan", vehicle: "DL5C RT 8877", phone: "9819988776" }
  ];

  const [rider] = useState(
    riders[Math.floor(Math.random() * riders.length)]
  );

  useEffect(() => {

    const timer = setInterval(() => {

      setDeliveryTime(prev => Math.max(prev - 1, 0));

      setCountdown(prev => {
        if (prev === 1) return 20;
        return prev - 1;
      });

    }, 1000);

    const step1 = setTimeout(() => setStatus("Preparing"), 20000);
    const step2 = setTimeout(() => setStatus("Out for Delivery"), 40000);
    const step3 = setTimeout(() => setStatus("Delivered"), 60000);

    return () => {
      clearInterval(timer);
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };

  }, []);

  // PROGRESS STEP
  const currentStep =
    status === "Preparing"
      ? 1
      : status === "Out for Delivery"
      ? 2
      : status === "Delivered"
      ? 3
      : 0;

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

            <div className="mb-4 text-sm text-gray-400 flex justify-between">
              <span>Next Update: {countdown}s</span>
              <span>Delivery In: {deliveryTime}s</span>
            </div>

            {/* PROGRESS BAR */}

            <div className="mb-6">

              <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">

                <div
                  className="bg-green-500 h-3 transition-all duration-700"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>

              </div>

              <div className="flex justify-between text-xs mt-2 text-gray-400">
                <span>Placed</span>
                <span>Preparing</span>
                <span>On Way</span>
                <span>Delivered</span>
              </div>

            </div>

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

          </div>

          {/* RIGHT SIDE */}

          <div className="bg-gray-800 p-6 rounded-xl">

            <h2 className="text-xl text-orange-400 mb-4">
              Delivery Tracking
            </h2>

            <div className="bg-gray-700 p-4 rounded-lg mb-4">

              <p className="text-lg font-semibold">
                Rider: {rider.name}
              </p>

              <p>Vehicle: {rider.vehicle}</p>

              <p>Phone: {rider.phone}</p>

            </div>

            <RiderMap />

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;