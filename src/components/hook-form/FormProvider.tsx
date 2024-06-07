import {
    FieldValues,
    FormProvider as Form,
  } from "react-hook-form";
  
  interface FormProviderProps<TFieldValues extends FieldValues = FieldValues> {
    children: React.ReactNode;
    methods: TFieldValues;
    className?:string
    onSubmit: React.FormEventHandler<HTMLFormElement>;
  }
  
  export const FormProvider: React.FunctionComponent<any> = ({
    children,
    onSubmit,
    className,
    methods,
  }) => {
    return (
      <Form   {...methods}>
        <form className={`w-full ${className}`} onSubmit={onSubmit}>{children}</form>
      </Form>
    );
  };
  