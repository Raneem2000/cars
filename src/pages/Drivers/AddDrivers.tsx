import RHFInputFile from "@/components/hook-form/RHFInputFile";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import axios from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddDrivers: FC<{
  open: boolean;
  setOpen: any;
  setSelectedRow: any;
  formValues: any;
}> = ({ open, setOpen, formValues, setSelectedRow }) => {
  const form = useForm();
  const currentValue = form.watch("image");
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/registerDriver`, data, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
      return res;
    },
  });
  const { mutate: Ubdate } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/updateDriver/${formValues.id}`, data, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
      return res;
    },
  });
  const { data: Drviers } = useQuery({
    queryKey: ["get-customer"],
    queryFn: async () => {
      const { data } = await axios.get(`/getDriverById/${formValues?.id}`);
      return data.data;
    },
    enabled: !!formValues?.id,
  });
  const queryClient = useQueryClient();
  const submitHandler = (data: any) => {
    const formData = new FormData() as any;
    data.name && formData.append("name", data.name);
    data.phone && formData.append("phone", data.phone);
    data.address && formData.append("address", data.address);
    data.email && formData.append("email", data.email);
    data.vehicle && formData.append("vehicle", data.vehicle);
    data.box && formData.append("box", data.box);

    data.password && formData.append("password", data.password);
    typeof data?.image === "object" && formData.append("image", data.image);
    if (Drviers) {
      Ubdate(formData, {
        onSuccess() {
          toast("تمت التعديل بنجاح");
          setOpen(false);
          queryClient.refetchQueries({ queryKey: ["get-Driver"] });
          form.reset({
            name: "",
            image: undefined,
            phone: "",
            address: "",
            email: "",
            vehicle: "",
            box: "",
          });
        },
        onError(error: any) {
          console.log(error?.response?.data);
          toast(error?.response?.data);
        },
      });
    } else {
      mutate(formData, {
        onSuccess() {
          toast("تمت الاضافة بنجاح");
          setOpen(false);
          queryClient.refetchQueries({ queryKey: ["get-Driver"] });
          form.reset({
            name: "",
            image: undefined,
            phone: "",
            address: "",
            email: "",
            vehicle: "",
            box: "",
          });
        },
        onError(error: any) {
          console.log(error?.response?.data);
          toast(error?.response?.data);
        },
      });
    }
  };
  useEffect(() => {
    if (Drviers) {
      form.reset({
        name: Drviers?.user?.name,
        phone: Drviers?.user?.phone,
        address: Drviers?.user?.address,
        email: Drviers?.user?.email,
        vehicle: Drviers?.vehicle,
        box: Drviers?.box,
        // image: `${BASE_URL_IMG}/${formValues.image?.id}/${formValues.image?.file_name}`,
      });
    } else {
      form.reset({
        name: "",
        image: undefined,
        phone: "",
        address: "",
        email: "",
        vehicle: "",
        box: "",
      });
    }
  }, [Drviers]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <div className="grid grid-cols-2 gap-4">
              <RHFTextField
                control={form.control}
                name="name"
                placeholder="الاسم"
                label="الاسم"
              />
              <RHFTextField
                control={form.control}
                name="password"
                label="كلمة السر"
                placeholder="كلمة السر"
                type="password"
              />
              <RHFTextField
                control={form.control}
                name="phone"
                label="رقم التليفون"
                placeholder="رقم التليفون"
              />
              <RHFTextField
                control={form.control}
                name="email"
                label="الايميل"
                placeholder="الايميل"
              />
              <RHFTextField
                control={form.control}
                name="address"
                label="العنوان"
                placeholder="العنوان"
              />
              <RHFTextField
                control={form.control}
                name="vehicle"
                label="المركبة"
                placeholder="المركبة"
              />
              <RHFTextField
                control={form.control}
                name="box"
                type="number"
                label="الصندوق"
                placeholder="الصندوق"
              />
              {currentValue ? (
                <img
                  src={
                    typeof currentValue === "string"
                      ? currentValue
                      : URL.createObjectURL(currentValue)
                  }
                  alt={currentValue.name}
                  className="w-40 h-28 mt-6 rounded-xl object-cover"
                />
              ) : (
                <RHFInputFile
                  setValue={form.setValue}
                  control={form.control}
                  name="image"
                  label="اضافة صورة للصنف"
                  watch={form.watch}
                />
              )}
            </div>
            <div className="flex gap-4 my-4 w-full">
              <Button className="w-full" type="submit">
                حفظ
              </Button>
              <Button type="button" className="w-full" variant={"cancel"}>
                إلغاء
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDrivers;
