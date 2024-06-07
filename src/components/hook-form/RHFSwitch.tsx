import { Controller, useFormContext } from "react-hook-form";
import { Switch } from "../ui/switch";

interface RHFSwitchProps {
  name: string;
  checked?: boolean;
  control:any
}

const RHFSwitch: React.FunctionComponent<RHFSwitchProps> = ({
  name,
  checked,
  control,
  ...other
}) => {


  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          defaultChecked={checked}
          dir="ltr"
          {...field}
          {...other}
          onCheckedChange={field.onChange}
        />
      )}
    />
  );
};

export default RHFSwitch;
