import { cn } from "@/lib/utils";
import { ComponentProps, useState } from "react";
import { UseFormWatch, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface RHFTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputProps?: any;
  tooltipTitle?: string;
  isOptional?: boolean;
  inputClassName?: string;
  tooltipDescription?: string;
  endAdornmentClassName?: string;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  type?: ComponentProps<typeof Input>["type"];
  control: any;
  watch?: UseFormWatch<any>;
  dir?:any
}

const RHFTextField: React.FunctionComponent<RHFTextFieldProps> = ({
  name,
  type,
  control,
  watch,
  label,
  dir,
  className,
  isOptional,
  placeholder,
  endAdornment,
  tooltipTitle,
  startAdornment,
  inputClassName,
  tooltipDescription,
  endAdornmentClassName,
  inputProps,
  disabled,
  ...other
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordHandler = () => {
    if (type === "password") setShowPassword((prev) => !prev);
  };

  return (
    <div className={cn("mb-spacing_3xl w-full flex gap-4 flex-col", className)}>
      <Label className="" dir="rtl">{label}</Label>
      <FormField
        name={name as string}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormControl>
              <Input
           
                disabled={disabled}
                endAdornmentClassName={endAdornmentClassName}
                {...field}
                placeholder={placeholder ? placeholder : undefined}
                id={name}
                type={
                  type === "number" ? "number" : showPassword ? "text" : type
                } // Set type to "number" if provided as prop
                value={
                  typeof field.value === "number" && field.value === 0
                    ? ""
                    : field.value
                }
                startAdornment={startAdornment}
                endAdornment={endAdornment}
                className={cn("", inputClassName)}
                {...other}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const renderIcon = (show: boolean) => {
  switch (show) {
    case false:
      return "eva:eye-fill";
    case true:
      return "eva:eye-off-fill";
    default:
      return undefined;
  }
};

export default RHFTextField;
