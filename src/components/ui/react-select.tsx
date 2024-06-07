import { cn } from "@/lib/utils";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import Select, {
  ClearIndicatorProps,
  MultiValueRemoveProps,
  components,
} from "react-select";
import CreatableSelect from "react-select/creatable";

interface MultiSelectProps {
  height?: string;
  options: { label: string; value: string }[];
  isCreateable?: boolean;
  isMulti?: boolean;
  disabled?: boolean;
  inputName?: string;
  className?: string;
  placeholder?: string;
  onInputChange: (newValue: string) => void;
  onBlur: () => void;
}

const MultiSelect: FC<MultiSelectProps> = ({
  height,
  options,
  isCreateable,
  isMulti,
  disabled,
  inputName,
  placeholder = "form.search",
  className,
  onInputChange,

  ...other
}) => {
  const { getValues } = useFormContext();
  const controlStyles = {
    base: "border h-full !items-start  border-grey-300 rounded-lg bg-white hover:cursor-pointer px-[14px] py-[10px] ",
    focus: "border-brand-400",
    nonFocus: " border-gray-300 ",
    isDisabled: "bg-brand-300",
  };
  const placeholderStyles = "text-gray-500 ";
  const selectInputStyles = "";
  const valueContainerStyles = "gap-2 flex";
  const singleValueStyles = "  text-grey-700 font-medium";
  const multiValueStyles =
    "flex items-center rounded-radius_sm px-1 py-0.5 border border-grey-300 text-grey-700 h-6 text-sm font-md ";
  const multiValueLabelStyles =
    "leading-6 mr-2 bg-brad-400 text-grey-700 text-sm font-sm";
  const multiValueRemoveStyles = "";
  const indicatorsContainerStyles = "hidden";
  const clearIndicatorStyles =
    "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
  const indicatorSeparatorStyles = "bg-transparent";
  const dropdownIndicatorStyles = "!hidden";
  const menuStyles =
    "p-1 mt-2 border border-gray-200 bg-white rounded-lg shadow-md";
  const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 !text-sm";
  const optionStyles = {
    base: "hover:cursor-pointer px-3 py-2 rounded ",
    focus: "bg-gray-100 active:bg-gray-200 ",
    selected:
      "after:content-['✔'] after:ml-2 after:text-gray-400 !text-gray-500",
  };
  const noOptionsMessageStyles =
    "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

  // const DropdownIndicator = (props: DropdownIndicatorProps) => {
  //   return (
  //     <components.DropdownIndicator {...props}>
  //       {/* <ChevronDownIcon /> */}
  //     </components.DropdownIndicator>
  //   );
  // };

  const ClearIndicator = (props: ClearIndicatorProps) => {
    return (
      <components.ClearIndicator {...props}>
        <img />
      </components.ClearIndicator>
    );
  };

  const MultiValueRemove = (props: MultiValueRemoveProps) => {
    return (
      <components.MultiValueRemove {...props}>
        <img src="/svg/global/x-close.svg" alt="" />
      </components.MultiValueRemove>
    );
  };

  const RendredComponent = isCreateable ? CreatableSelect : Select;

  return (
    <RendredComponent
      className={className}
      options={options}
      isDisabled={disabled}
      inputValue={inputName ? getValues(inputName) : undefined}
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        // On mobile, the label will truncate automatically, so we want to
        // override that behaviour.
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: "normal",
          overflow: "visible",
        }),
        control: (base) => ({
          ...base,
          transition: "none",
        }),
      }}
      components={{ ClearIndicator, MultiValueRemove }}
      classNames={{
        control: ({ isFocused }) =>
          cn(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,

        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          cn(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      isMulti={isMulti}
      onInputChange={(value: any) => {
        onInputChange(value);
      }}
      placeholder={placeholder}
      unstyled
      {...other}
    />
  );
};

export default MultiSelect;
