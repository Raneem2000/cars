import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { FC, useState } from "react";

const SelectLocation: FC<{
  setValue: any;
  open: boolean;
  setOpen: any;
}> = ({ setValue, open, setOpen }) => {
  const [position, setPosition] = useState<any>();

  const handleMapClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setPosition({ lat, lng });
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkHcnl50GF1tiER0QI7pIoBoIa_1BVgG4",
    libraries: ["geometry", "drawing"],
  });
  const handleAddLocation = () => {
    if (position) {
      // console.log("Latitude:", position.lat);
      // console.log("Longitude:", position.lng);
      setValue("latitude", position.lat);
      setValue("longitude", position.lng);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ height: "400px", width: "100%" }}
            center={{
              lat: parseFloat("36.2137678"),
              lng: parseFloat("37.1415791"),
            }}
            zoom={10}
            onClick={handleMapClick}
          >
            {position && <Marker position={position} />}
          </GoogleMap>
        )}
        <Button onClick={handleAddLocation} color="primary">
          اختر الموقع
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SelectLocation;
