import React, { ReactNode, memo, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import ReactSelect from "../ui/react-select";
import { Label } from "../ui/label";

interface RHFReactSelectProps {
  name: string;
  label?: string;
  children?: React.ReactNode;
  options?: { name: string; id: string }[];
  placeholder?: string;
  isCreateable?: boolean;
  isMulti?: boolean;
  disabled?: boolean;
  apiPath?: string;
  inputClassName?: string;
  isLoading?: boolean;

  onInputChange?: (newValue: string) => void;
}

let timer = setTimeout(() => {}, 1000);

const RHFReactSelect: React.FunctionComponent<RHFReactSelectProps> = memo(
  ({
    name,
    label,
    options,
    isMulti = true,
    apiPath,
    disabled,
    isLoading,
    placeholder,
    isCreateable,
    inputClassName,
    onInputChange,
  }) => {
    const { control, trigger } = useFormContext();
    const [currentOptions, setOptions] = useState(options);

    const changeInputHandler = async (newValue: string) => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        if (onInputChange) onInputChange(newValue);
      }, 1000);
    };

    const allOptions = options ? options : currentOptions;

    const convertedOptions =
      allOptions?.map(({ name, id }) => ({
        label: name,
        value: id,
      })) || [];

    const blurHandler = () => {
      trigger(name);
    };

    return (
      <div className="mb-6 w-full">
        <Label>{label}</Label>
        <FormField
          name={name}
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ReactSelect
                  {...field}
                  onBlur={blurHandler}
                  options={convertedOptions}
                  isCreateable={isCreateable}
                  className={inputClassName}
                  onInputChange={changeInputHandler}
                  isMulti={isMulti}
                  placeholder={placeholder}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
);
export default RHFReactSelect;
