/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";
import { UseFormWatch, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

interface RHFSelectProps {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  isAdornment?: boolean;
  classNameValue?: string;
  children?: React.ReactNode;
  onValueChange?: (newVaule: string) => void;
  options?: { name: string; id: string }[];
  pathApi?: string;
  required?: any;
  control?: any;
  watch?: UseFormWatch<any>;
  Trigger?: ReactNode;
}

const SelectFiled: React.FunctionComponent<RHFSelectProps> = ({
  name,
  control,
  watch,
  label,
  options,
  children,
  className,
  placeholder,
  classNameValue,
  Trigger,
  required,
  isAdornment = false,
}) => {
  const [Name, setName] = useState<any>("");

  const currentValue = watch?.(name);
  // console.log(currentValue)
  useEffect(() => {
    if (currentValue) {
      setName(options?.find((d) => d.id == currentValue)?.name!);
    }
  }, [currentValue]);

  return (
    <div
      className={cn(
        !isAdornment && "mb-2",
        "w-full flex flex-col gap-4",
        className
      )}
    >
      <Label className="">{label}</Label>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Select
              required={required}
              {...field}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger
                  className={cn(
                    "border border-grey-300 text-gray-600 font-normal text-md  ",
                    isAdornment && "border-none p-0",
                    !currentValue && "text-grey-500 !font-normal ",
                    classNameValue
                  )}
                >
                  {Name ? (
                    <SelectValue
                      placeholder={placeholder}
                      className={cn("text-grey-600 !disabled:text-grey-300 ")}
                    >
                      {Name}
                    </SelectValue>
                  ) : (
                    Trigger
                  )}
                </SelectTrigger>
              </FormControl>
              <SelectContent className="text-black">
                {options?.map((op) => (
                  <SelectItem
                    key={op.id}
                    value={label === "اختر عملة" ? op.name : op.id}
                    className="text-black"
                  >
                    {op.name}
                  </SelectItem>
                ))}
                {children}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};
export default SelectFiled;
