import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";

const restaurantIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  iconSize: [40, 40]
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
  iconSize: [35, 35]
});

function RiderMap() {

  const restaurant = [28.9855, 77.7060];

  const [userLocation, setUserLocation] = useState([28.9840, 77.7000]);
  const [riderLocation, setRiderLocation] = useState([28.9865, 77.7075]);

  const [distance, setDistance] = useState(2.0);
  const [eta, setEta] = useState(12);

  const [rotation, setRotation] = useState(0);

  // Detect real user GPS
  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setUserLocation([lat, lng]);

      });

    }

  }, []);

  // Rider movement simulation
  useEffect(() => {

    const interval = setInterval(() => {

      setRiderLocation((prev) => {

        const newLat = prev[0] - 0.00015;
        const newLng = prev[1] - 0.00015;

        // calculate direction
        const angle =
          Math.atan2(userLocation[1] - newLng, userLocation[0] - newLat) *
          (180 / Math.PI);

        setRotation(angle);

        return [newLat, newLng];
      });

      setDistance((prev) => {
        const newDist = Math.max(prev - 0.1, 0);
        return parseFloat(newDist.toFixed(1));
      });

      setEta((prev) => Math.max(prev - 1, 0));

    }, 2000);

    return () => clearInterval(interval);

  }, [userLocation]);

  const route = [
    restaurant,
    riderLocation,
    userLocation
  ];

  // Rotating rider icon
  const riderIcon = L.divIcon({
    className: "",
    html: `<img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
           style="width:45px; transform: rotate(${rotation}deg);" />`
  });

  return (
    <div>

      <div className="bg-gray-700 p-3 rounded mb-3 text-sm flex justify-between">
        <span>Distance: {distance} km</span>
        <span>ETA: {eta} min</span>
      </div>

      <MapContainer
        center={userLocation}
        zoom={14}
        style={{ height: "400px", width: "100%" }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={restaurant} icon={restaurantIcon}>
          <Popup>Restaurant</Popup>
        </Marker>

        <Marker position={riderLocation} icon={riderIcon}>
          <Popup>Delivery Rider</Popup>
        </Marker>

        <Marker position={userLocation} icon={userIcon}>
          <Popup>Your Location</Popup>
        </Marker>

        <Polyline
          positions={route}
          pathOptions={{ color: "orange", weight: 4 }}
        />

      </MapContainer>

    </div>
  );
}

export default RiderMap;