import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

const Map = () => {
  const containerStyle = {
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkHcnl50GF1tiER0QI7pIoBoIa_1BVgG4",
    libraries: ["geometry", "drawing"]
  });

  const [customerLocation, setCustomerLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (customerLocation && driverLocation) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: customerLocation,
          destination: driverLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result : any, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result );
          }
        }
      );
    }
  }, [customerLocation, driverLocation]);

  const onClick = (event : any) => {
    const newLocation : any = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    if (!customerLocation) {
      setCustomerLocation(newLocation);
    } else if (!driverLocation) {
      setDriverLocation(newLocation);
    } else {
      setCustomerLocation(newLocation);
      setDriverLocation(null);
      setDirections(null);
    }
  };

  return (
    <div style={containerStyle}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={onClick}
        >
          {customerLocation && (
            <Marker position={customerLocation} label="C" />
          )}
          {driverLocation && <Marker position={driverLocation} label="D" />}
          {directions && (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;