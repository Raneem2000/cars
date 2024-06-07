import apiRoutes from "@/api";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFInputFile from "@/components/hook-form/RHFInputFile";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import axios from "@/lib/axios";
import { ServiceForm } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import RHFRadioGroup from "./RHFRadioGroup";

const RHFRadioGroupInDialog: FC<{
  isOpen: boolean;
  returnedValue: (arg : any) => void;
  onClose: () => void;
  data: Array<any>;
  title: string;
  name: string;
}> = ({ isOpen, title, name, data, onClose, returnedValue }) => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const handleReturn = (value: any) => {
    returnedValue(value); // استدعاء دالة الاستدعاء مع القيمة المحددة
    onClose(); // إغلاق الحوار بعد إرجاع القيمة
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[75rem]">
        <h1 className="text-center text-xl font-md">{title} </h1>
        <FormProvider onSubmit={handleSubmit(handleReturn)} methods={methods}>
          <RHFRadioGroup name={name} options={data} label="" />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default RHFRadioGroupInDialog;
