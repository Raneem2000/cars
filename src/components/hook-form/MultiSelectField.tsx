import React, { FC } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Label } from "../ui/label";

interface MultiSelectFieldProps {
  control: any;
  name: string;
  label: string;
  options: { value: any; label: string }[];
  placeholder?: string;
  watch?: (name: string, defaultValue?: any) => any;
  onSelectChange?: (selectedOptions: any[]) => void;
}

const MultiSelectField: FC<MultiSelectFieldProps> = ({
  control,
  options,
  name,
  label,
  placeholder,
  watch,
  onSelectChange,
}) => {
  const selectedValues = watch ? watch(name) : undefined;

  const handleChange = (selectedOptions: any) => {
    if (onSelectChange) {
      const selectedIds = selectedOptions.map((option : any) => option.value);
      onSelectChange(selectedIds);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            isMulti
            placeholder={placeholder}
            {...field}
            options={options}
            value={selectedValues}
            onChange={handleChange}
          />
        )}
      />
    </div>
  );
};

export default MultiSelectField;
