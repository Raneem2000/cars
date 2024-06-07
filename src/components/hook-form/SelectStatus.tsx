import React, { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
const SelectStatus: FC<{
  options: any[];
  disabled: boolean;
  defaultValue: string;
  returnedValue: (value: string) => void;
}> = ({ options, defaultValue, returnedValue, disabled }) => {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (value: string) => {
    setValue(value);
    returnedValue(value); // Call the callback with the new value
  };

  return (
    <Select
      disabled={disabled}
      defaultValue="Confirmed"
      onValueChange={handleChange}
    >
      <SelectTrigger
        className={cn(
          "border border-grey-300 text-gray-600 font-normal text-sm  w-[12rem]",
          value === "Pending" || value === "waiting" || value === "قيد الانتظار"
            ? "bg-[#FFC60029] !text-[#FFC600] border-[#FFC60029]"
            : value === "Confirmed" ||
              value === "approved" ||
              value === "تم استلام الطلب"
            ? "bg-[#62D0B629] !text-[#62D0B6] border-[#62D0B629]"
            : value === "Processing" || value === "prepared"
            ? "bg-[#0FB7FF29] !text-[#0FB7FF] border-[#0FB7FF29]"
            : value === "Picked" || value === "on_way"
            ? "bg-[#62D0B629] !text-[#00A912] border-[#62D0B629]"
            : value === "Delivered" || value == "delivered"
            ? "bg-[#33189D29] !text-[#33189D] border-[#33189D29]"
            : value === "reject"
            ? "bg-[#843333e1] !text-[#f1efef] border-[#843333e1]"
            : "bg-[#BD00FF29] !text-[#BD00FF] border-[#BD00FF29]"
        )}
      >
        <SelectValue
          defaultValue={"Confirmed"}
          className={cn("text-grey-600 !disabled:text-grey-300 ")}
        >
          {value}
        </SelectValue>
      </SelectTrigger>

      <SelectContent className="text-black">
        {options?.map((op: any) => (
          <SelectItem key={op.id} value={op.name} className="text-black">
            {op.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectStatus;
