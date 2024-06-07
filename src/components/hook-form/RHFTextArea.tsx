import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface RHFTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  isOptional?: boolean;
  tooltipTitle?: string;
  tooltipDescription?: string;
  control:any;
  trigger:any
}

const RHFTextArea: React.FunctionComponent<RHFTextAreaProps> = ({
  name,
  label,
  rows,
  className,
  isOptional,
  placeholder,
  control,
  trigger,
  tooltipTitle,
  tooltipDescription,
  ...other
}) => {
 

  const bulrInputHandler = () => {
    trigger(name);
  };

  return (
    <div className="mb-6">
      <Label>{label}</Label>
      <FormField
        name={name as string}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormControl className="mt-4 rounded-lg">
              <Textarea
                {...field}
                id={name}
                rows={rows || 6}
                placeholder={placeholder ? placeholder : undefined}
                value={
                  typeof field.value === "number" && field.value === 0
                    ? ""
                    : field.value
                }
                onBlur={bulrInputHandler}
                className={cn("resize-none", className)}
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

export default RHFTextArea;
