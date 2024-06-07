import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

interface RHFCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  name: string;
  label: string | React.ReactNode;
}

const RHFCheckbox: React.FunctionComponent<RHFCheckboxProps> = ({ name, label, ...other }) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex gap-2 items-center">
          <Checkbox {...field} {...other} id={name} onCheckedChange={field.onChange} />
          <FormLabel className="cursor-pointer" htmlFor={name}>
            {label}
          </FormLabel>
        </div>
      )}
    />
  );
};

interface RHFMultiCheckboxProps {
  name: string;
  options: { id: string; name: string }[];
}

const RHFMultiCheckbox: React.FunctionComponent<RHFMultiCheckboxProps> = ({
  name,
  options,
  ...other
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {options && (
            <>
              {options.map((option) => (
                <FormItem
                  key={option.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                  {...other}
                >
                  <FormControl>
                    <Checkbox
                      {...field}
                      checked={field?.value?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...(field.value || []), option.id])
                          : field.onChange(
                              (field.value || []).filter((value: string) => value !== option.id)
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{option.name}</FormLabel>
                </FormItem>
              ))}
            </>
          )}
        </FormItem>
      )}
    />
  );
};

export { RHFCheckbox, RHFMultiCheckbox };
