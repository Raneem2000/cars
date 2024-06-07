import React, { FC } from "react";

const Status: FC<{
  variant: string;
}> = ({ variant }) => {
  return (
    <span
      className={`text-sm rounded-xl px-6 max-xl:p-[4px] max-md:text-xs py-2   text-white ${
        variant === "completed"
          ? "bg-[#00B69B]/60 ]"
          : variant === "Processing"
          ? "bg-[#6226EF]/60 "
          : variant === "rejected"
          ? "bg-[#EF3826]/60 "
          : variant === "waiting"
          && "bg-[#FFA756]/60 "
          
      }`}
    >
      {variant}
    </span>
  );
};

export default Status;
