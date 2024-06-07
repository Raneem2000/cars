import React, { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import apiRoutes from "@/api";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { CarModelTypeValidation, PerTypeValidation } from "@/hooks/validation";
import { CarModelData } from "@/types/carModel";
import { Form } from "@/components/ui/form";
import { SketchPicker, ColorResult } from "react-color";
interface DialogContainerProps {
  dialogKey?: string;
  isOpen: boolean;
  onClose: () => void;
  formValues?: any;
}

const AddCarColor: React.FC<DialogContainerProps> = ({
  isOpen,
  onClose,
  formValues,
}) => {
  const [OpenColorPicker, setOpenColorPicker] = useState<boolean>(false);
  const [blockPickerColor, setBlockPickerColor] = useState<string>("#ff0000");
  const methods = useForm<any>();
  const { handleSubmit, reset } = methods;
  const { mutate, isPending }: any = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/createCarColor`, data);
      return res;
    },
  });
  const { mutate: Update }: any = useMutation({
    mutationFn: async (data: CarModelData) => {
      const res = await axios.post(
        `/updateCarColor` + `/${formValues?.id}`,
        data
      );
      return res;
    },
  });
  console.log(formValues);
  const queryCliet = useQueryClient();
  const submitHandler = (data: any) => {
    if (formValues?.id) {
      Update(
        {
          code: blockPickerColor,
          color: data.color,
        },
        {
          onSuccess() {
            toast("تمت تعديل اللون بنجاح");
            onClose();
            queryCliet.refetchQueries({ queryKey: ["get-car-color"] });
          },
        }
      );
    } else {
      mutate(
        {
          code: blockPickerColor,
          color: data.color,
        },
        {
          onSuccess() {
            toast("تمت إضافة اللون بنجاح");
            onClose();
            queryCliet.refetchQueries({ queryKey: ["get-car-color"] });
          },
        }
      );
    }
  };
  useEffect(() => {
    if (formValues) {
      reset({
        color: formValues.name,
      });
      setBlockPickerColor(formValues.code);
    }
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-2"
          >
            <RHFTextField
              control={methods.control}
              name="color"
              type="text"
              label="اسم اللون"
            />
            <div className="flex justify-center">
              <div
                onClick={() => setOpenColorPicker(true)}
                className="w-[40px] h-[40px] rounded-md cursor-pointer"
                style={{
                  background: blockPickerColor,
                }}
              ></div>
            </div>
            <Dialog open={OpenColorPicker} onOpenChange={setOpenColorPicker}>
              <DialogContent className="flex justify-center">
                <SketchPicker
                  color={blockPickerColor}
                  onChange={(color: ColorResult) => {
                    setBlockPickerColor(color.hex);
                    setOpenColorPicker(false);
                  }}
                />
              </DialogContent>
            </Dialog>
            <div className="mt-6 flex   gap-4">
              <Button
                disabled={isPending}
                type="submit"
                className="rounded-md flex-grow"
              >
                {isPending
                  ? "الرجاء الانتظار"
                  : formValues
                  ? "تعديل "
                  : "إضافة"}
              </Button>
              <Button
                type="button"
                className="flex-grow"
                variant={"cancel"}
                onClick={() => onClose()}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCarColor;
