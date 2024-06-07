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

import Cookies from "js-cookie";
import { Form } from "@/components/ui/form";
import RHFInputFile from "@/components/hook-form/RHFInputFile";
const SiginUp = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/registerAdmin`, data, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
      return res;
    },
  });
  const navigate = useNavigate();
  const submitHandler = (data: any) => {
    const formData = new FormData() as any;
    data.name && formData.append("name", data.name);
    data.phone && formData.append("phone", data.phone);
    data.address && formData.append("address", data.address);
    data.email && formData.append("email", data.email);
    data.password && formData.append("password", data.password);
    data?.image && formData.append("image", data.image);
    mutate(formData, {
      onSuccess(data) {
        toast("تمت  تسجيل الدخول بنجاح");
        // console.log(data.data.authorisation.token)
        localStorage.setItem("token", data.data.authorisation.token);
        navigate("/");
      },
    });
  };
  const currentValue = methods.watch("image");
  return (
    <div className="flex  w-full h-screen">
      <div className="bg-black/90 w-full h-full relative">
        <img
          src="/src/assets/image/unsplash_2AovfzYV3rc.png"
          className="w-[500px] h-[600px] absolute left-[-30px] top-[20px]"
        />
      </div>
      <div className="bg-gray-100 w-full h-full p-4">
        <div className="flex flex-col mx-10 gap-4 my-4">
          <p className="text-2xl"> إنشاء حساب</p>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(submitHandler)}
              className="grid grid-cols-2 gap-2 mt-6"
            >
              <RHFTextField
                control={methods.control}
                inputClassName="bg-white rounded-[9px]"
                name="name"
                label="ادخل الاسم "
                placeholder="ادخل الاسم "
              />
              <RHFTextField
                control={methods.control}
                inputClassName="bg-white rounded-[9px]"
                name="phone"
                label="ادخل رقم التليفون"
                placeholder="ادخل رقم التليفون"
              />
              <RHFTextField
                control={methods.control}
                inputClassName="bg-white rounded-[9px]"
                name="address"
                label="ادخل  العنوان"
                placeholder="ادخل العنوان "
              />
              <RHFTextField
                control={methods.control}
                inputClassName="bg-white rounded-[9px]"
                name="email"
                label="ادخل الايميل"
                placeholder="ادخل الايميل"
              />

              <RHFTextField
                control={methods.control}
                inputClassName="bg-white rounded-[9px]"
                name="password"
                type="password"
                label="ادخل كلمة السر"
                placeholder="ادخل كلمة السر"
              />
              {currentValue ? (
                <img
                  src={
                    typeof currentValue === "string"
                      ? currentValue
                      : URL.createObjectURL(currentValue)
                  }
                  alt={currentValue.name}
                  className="w-40 h-28 mt-6 rounded-xl object-cover"
                />
              ) : (
                <RHFInputFile
                  setValue={methods.setValue}
                  control={methods.control}
                  name="image"
                  label="اضافة صورة للصنف"
                  watch={methods.watch}
                />
              )}
              <div className="flex flex-col  gap-4">
                <Link to={`/auth/login`} className="text-start text-gray-500 my-1">تسجيل الدخول</Link>
              </div>
              <div className="flex  w-full">
                <Button type="submit" disabled={isPending} className="w-full">
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

export default SiginUp;
