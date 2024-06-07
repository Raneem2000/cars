import RHFInputFile from "@/components/hook-form/RHFInputFile";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddSupplier: FC<{
  open: boolean;
  onClose: () => void;
  setSelectedRow: any;
  formValues: any;
}> = ({ open, onClose, formValues, setSelectedRow }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/createSupplier`, data, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/updateSupplier/${formValues?.id}`, data, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
      return res;
    },
  });
  const form = useForm();
  const currentValue = form.watch("image");
  const queryClient = useQueryClient();
  const submitHandler = (data: any) => {
    const formData = new FormData() as any;
    data.name && formData.append("name", data.name);
    data.phone && formData.append("phone", data.phone);
    data.address && formData.append("address", data.address);
    data.email && formData.append("email", data.email);
    data.password && formData.append("password", data.password);
    data.money && formData.append("money", data.money);
    data.opening_balance &&
      formData.append("opening_balance", data.opening_balance);

    data.password && formData.append("password", data.password);

    typeof data?.image === "object" && formData.append("image", data.image);
    if (formValues?.id) {
      Update(data, {
        onSuccess() {
          toast("تمت التعديل بنجاح");
          onClose();
          queryClient.refetchQueries({ queryKey: ["get-Supplier"] });
          setSelectedRow(null);
          form.reset({
            name: "",
            image: undefined,
            phone: "",
            address: "",
            email: "",
          });
        },
        onError(error: any) {
          toast(error?.response?.data);
        },
      });
    } else {
      mutate(formData, {
        onSuccess() {
          toast("تمت الاضافة بنجاح");
          onClose();
          queryClient.refetchQueries({ queryKey: ["get-Supplier"] });
          form.reset({
            name: "",
            image: undefined,
            phone: "",
            address: "",
            email: "",
          });
        },
        onError(error: any) {
          console.log(error?.response?.data);
          toast(error?.response?.data);
        },
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[55rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <RHFTextField
                  control={form.control}
                  name="name"
                  label="الاسم"
                  placeholder="الاسم"
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
                  name="email"
                  label="الايميل"
                  placeholder="الايميل"
                />
                <RHFTextField
                  control={form.control}
                  name="opening_balance"
                  type="number"
                  label="الرصيد الافتتاحي"
                  placeholder="الرصيد الافتتاحي"
                />
              </div>
              <div className="flex flex-col">
                <RHFTextField
                  control={form.control}
                  name="phone"
                  label="رقم التليفون"
                  placeholder="رقم التليفون"
                />

                <RHFTextField
                  control={form.control}
                  name="address"
                  label="العنوان"
                  placeholder="العنوان"
                />
                <RHFTextField
                  control={form.control}
                  name="money"
                  type="number"
                  label="money"
                  placeholder="money"
                />
              </div>

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
                  label="اضافة صورة "
                  watch={form.watch}
                />
              )}
            </div>

            <div className="flex gap-4 my-4 w-full">
              <Button className="w-full">حفظ</Button>
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

export default AddSupplier;
