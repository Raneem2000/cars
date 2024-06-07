import apiRoutes from "@/api";
import { Logo } from "@/assets/svgs";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
const Login = () => {
  const methods = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/login`, data);
      return res;
    },
  });
  const navigate = useNavigate();
  const submitHandler = (data: any) => {
    mutate(data, {
      onSuccess(data) {
        toast("تمت  تسجيل الدخول بنجاح");
        // console.log(data.data?.authorization.token)
        localStorage.setItem("token", data.data?.authorization.token);
        navigate("/product");
      },
    });
  };
  return (
    <div className="flex  w-full h-screen">
      <div className="bg-black/90 w-full h-full relative">
        <img src="/src/assets/image/unsplash_2AovfzYV3rc.png" className="w-[550px] h-[600px] absolute left-[-30px] top-[20px]"/>
      </div>
      <div className="bg-gray-100 w-full h-full p-6">
        <div className="flex gap-2 w-full justify-end items-center">
          <p className="text-4xl font-semibold">HTC</p>
          <Logo width="60" height="60" />
        </div>
        <div className="flex flex-col mx-10 gap-4">
          <p className="text-2xl">تسجيل الدخول</p>

          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(submitHandler)} className="flex flex-col gap-4 mt-6">
              <RHFTextField
                control={methods.control}
                inputClassName="bg-white rounded-[9px]"
                name="email"
                label="ادخل الايميل "
                placeholder="ادخل الايميل "
              />
              <RHFTextField
                control={methods.control}
                inputClassName="bg-white rounded-[9px]"
                name="password"
                type="password"
                label="ادخل كلمة السر"
                placeholder="ادخل كلمة السر"
              />
              <div className="flex justify-between">
                <p className="text-start text-gray-500 my-4">
                  هل نسيت كلمة السر
                </p>
                <Link to={`/auth/signup`} className="text-start text-gray-500 my-4">
                  انشاء حساب
                </Link>
              </div>
              <div className="flex  w-full">
                <Button disabled={isPending} className="w-full">
                  {isPending ? "الرجاء الانتظار" : "تسجيل الدخول"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
