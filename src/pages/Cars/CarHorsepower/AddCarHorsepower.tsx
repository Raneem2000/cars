import React, { useEffect } from "react";
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

interface DialogContainerProps {
  dialogKey?: string;
  isOpen: boolean;
  onClose: () => void;
  formValues?: any;
}

const AddCarHorsepower: React.FC<DialogContainerProps> = ({
  isOpen,
  onClose,
  formValues,
}) => {
  const methods = useForm<any>();
  const { handleSubmit, reset } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/createCarMotor`, data);
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data: CarModelData) => {
      const res = await axios.post(
        `/updateCarMotor` + `/${formValues?.id}`,
        data
      );
      return res;
    },
  });
  console.log(formValues);
  const queryCliet = useQueryClient();
  const submitHandler = (data: any) => {
    if (formValues?.id) {
      Update(data, {
        onSuccess() {
          toast("تمت تعديل  بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-Horsepower"] });
          reset({
            name: "",
            gear:"",
            fuel:""
          });
        },
      });
    } else {
      mutate(data, {
        onSuccess() {
          toast("تمت الاضافة  بنجاح");
          onClose();
          queryCliet.refetchQueries({ queryKey: ["get-Horsepower"] });
          reset({
            name: "",
            gear:"",
            fuel:""
          });
        },
      });
    }
  };
  useEffect(() => {
    if (formValues) {
      reset({
        name: formValues.name,
        gear:formValues.gear,
        fuel:formValues.fuel
      });
    }else {
      reset({
        name: "",
        gear:"",
        fuel:""
      });
    }
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <Form {...methods}>
          <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
            <RHFTextField
              control={methods.control}
              name="name"
              type="text"
              label="السعة"
            />
            <RHFTextField
              control={methods.control}
              name="gear"
              type="text"
              label="gear"
            />
            <RHFTextField
              control={methods.control}
              name="fuel"
              type="text"
              label="وقود"
            />
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

export default AddCarHorsepower;
