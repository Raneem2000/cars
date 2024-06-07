import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import {
  Control,
  UseFormSetValue,
  UseFormWatch,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { FaCircleArrowUp, FaUser } from "react-icons/fa6";

interface RHFInputFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  multiple?: boolean;
  control: Control<any, any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  gallery?: any;
  setGallry?: any;
  labelClasName?: any;
}

function RHFInputFile({
  name,
  label,
  gallery,
  setGallry,
  className,
  control,
  watch,
  setValue,
  labelClasName,
  multiple,
  ...other
}: RHFInputFileProps) {
  const changeHandler = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFile = e.target.files?.[0];
      if (multiple) {
        setGallry((file: any) => [...file, newFile as File]);
      } else {
        setValue(name, newFile as File);
      }
    },
    [name, setValue]
  );

  const currentValue = watch(name);

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setValue(name, file);
  };
  // console.log(currentValue);

  return (
    <div className={cn("flex flex-col gap-8 my-6 ", className)}>
      <div className=" relative text-start">
        <FormLabel
          htmlFor={name}
          className="absolute duration-150 left-0 opacity-5 w-full  h-[calc(100%-1.5rem)] cursor-pointer"
        />
        <div className="flex gap-4 items-center ">
          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem
                className={`gap-4 flex flex-col mt-2 justify-center items-center border h-[12rem] border-grey-200 rounded-xl p-2 w-full`}
                onDrop={dropHandler}
              >
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="flex justify-center items-center gap-1 w-full">
                    <p
                      className={`text-brand-700 max-sm:text-xs flex items-center justify-center cursor-default ${labelClasName}`}
                    >
                      {label}
                    </p>

                    <FormControl>
                      <input
                        {...other}
                        name={name}
                        id={name}
                        type="file"
                        onChange={changeHandler}
                        className="hidden cursor-pointer w-full h-full"
                      />
                    </FormControl>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>
      </div>
    </div>
  );
}

export default RHFInputFile;
