import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { FC, useState } from "react";
import { Form, useForm } from "react-hook-form";

const DeliveryInfo: FC<{
  open: boolean;
  setOpen: (arg: boolean) => void;
}> = ({ open, setOpen }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkHcnl50GF1tiER0QI7pIoBoIa_1BVgG4",
    libraries: ["geometry", "drawing"],
  });
  const [position, setPosition] = useState<any>();
  const handleMapClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setPosition({ lat, lng });
  };
  const methods = useForm();
  const { handleSubmit, reset, watch } = methods;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" text-center max-w-[60rem]">
        <Form {...methods}>
          <div className="flex flex-col gap-4">
            <h1 className="font-md text-xl"> Delivery Information</h1>

            <div className="flex flex-col gap-1 text-start">
              <div className="flex gap-4">
                <RHFTextField
                  control={methods.control}
                  name=""
                  label="Customer Name"
                />
                <RHFTextField
                  control={methods.control}
                  name=""
                  label="Address"
                />
              </div>
              <div className="flex gap-2">
                <RHFTextField
                  control={methods.control}
                  name=""
                  label="Department Number"
                />

                <RHFTextField control={methods.control} name="" label="Floor" />
                <RHFTextField
                  control={methods.control}
                  name=""
                  label="Street"
                />
                <RHFTextField
                  control={methods.control}
                  name=""
                  label="Phone Number"
                />
              </div>
              <h1 className="text-center text-xl">Address</h1>
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ height: "300px", width: "100%" }}
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
            </div>
            <Button>Update Delivery Address</Button>
          </div>{" "}
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryInfo;
