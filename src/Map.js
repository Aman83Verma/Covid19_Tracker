// import { MapContainer, TileLayer } from "react-leaflet";
// import "./Map.css";

// function Map({ countries, center, zoom }) {
//   return (
//     <div className="map">
//       <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//       </MapContainer>
//     </div>
//   );
// }

// export default Map;


// import { MapContainer, TileLayer, useMap } from "react-leaflet";
// import "./Map.css";
// import { showDataOnMap } from "./util";

// function ChangeMapView({ center, zoom }) {
//   const map = useMap();
//   map.setView(center, zoom);
//   return null;
// }

// function Map({ countries, center, zoom }) {
//   return (
//     <div className="map">
//       <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
//         <ChangeMapView center={center} zoom={zoom} />
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {showDataOnMap(countries)}
//       </MapContainer>
//     </div>
//   );
// }

// export default Map;


import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer
        center={[center.lat, center.lng]}   // ✅ fixed
        zoom={zoom}                         // ✅ fixed
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
