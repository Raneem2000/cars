import RHFInputFile from "@/components/hook-form/RHFInputFile";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddCategory: FC<{
  open: boolean;
  onClose: () => void;
  setSelectedRow: any;
  formValues: any;
}> = ({ open, onClose, formValues, setSelectedRow }) => {
  // console.log(formValues);
  const form = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/createProductCategory`, data, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `/updateProductCategory/${formValues?.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/formData",
          },
        }
      );
      return res;
    },
  });
  useEffect(() => {
    if (formValues) {
      form.reset({
        name: formValues.name,
        image: `${BASE_URL_IMG}/${formValues.image?.id}/${formValues.image?.file_name}`,
      });
    } else {
      form.reset({
        name: "",
        image: undefined,
      });
    }
  }, [formValues]);
  const currentValue = form.watch("image");
  // console.log(formValues)
  const queryClient = useQueryClient();
  const submitHandler = (data: any) => {
    const formData = new FormData() as any;
    formData.append("name", data.name);
    typeof data?.image === "object" && formData.append("image", data.image);
    if (formValues?.id) {
      Update(formData, {
        onSuccess() {
          toast("تمت التعديل بنجاح");
          onClose();
          queryClient.refetchQueries({ queryKey: ["get-prod-cat"] });
          setSelectedRow(null);
        },
      });
    } else {
      mutate(formData, {
        onSuccess() {
          toast("تمت الاضافة بنجاح");
          onClose();
          queryClient.refetchQueries({ queryKey: ["get-prod-cat"] });
        },
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="flex flex-col"
          >
            <RHFTextField
              control={form.control}
              name="name"
              label="اسم الصنف"
              placeholder="اسم الصنف"
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
            <Button>حفظ</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
