import { Logo } from "@/assets/svgs";
import { PageContainer } from "@/components/containers";
import { Table } from "@/components/ui/Layout";
import React from "react";
import path from "../../assets/svgs/Path.svg";
import { TableColumn } from "react-data-table-component";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SelectFiled from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import { DeleteModal } from "@/components/dialog";

const Products = () => {
  const form = useForm();
  const { data: ProductCategory } = useQuery({
    queryKey: ["get-prod-cat"],
    queryFn: async () => {
      const { data } = await axios.get(`/getProductCategory`);
      return data.data;
    },
  });
  const { data: Brand } = useQuery({
    queryKey: ["get-Brand"],
    queryFn: async () => {
      const { data } = await axios.get(`/getBrand`);
      return data.data;
    },
  });
  const Category = form.watch("product_category_id");
  const Brand_id = form.watch("brand_id");
  const Name = form.watch("name");
  const navigate = useNavigate();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-prod", Name, Category, Brand_id],
    queryFn: async () => {
      const { data } = await axios.get(`/getProduct`, {
        params: {
          name: Name,
          page: Brand_id,
          product_category_id: Category,
        },
      });
      return data.data;
    },
  });
  // console.log(data?.data);

  const cols: TableColumn<any>[] = [
    {
      id: "image.file_name",
      name: "الصورة",
      cell: (row) => (
        <img
          className="w-[60px] h-[60px] my-6"
          src={`${BASE_URL_IMG}/${row.images?.[0]?.id!}/${row.images?.[0]
            ?.file_name!}`}
        />
      ),
    },
    {
      id: "name",
      name: "اسم المنتج ",
      cell: (row) => <div className="text-sm">{row.name}</div>,
    },
    {
      id: "name",
      name: "الصنف",
      cell: (row) => <div className="text-sm">{row.product_category.name}</div>,
    },
    {
      id: "name",
      name: "سعر البيع",
      cell: (row) => <div className="text-sm">{row.price}</div>,
    },
    {
      id: "name",
      name: "سعر الشراء",
      cell: (row) => <div className="text-sm">{row.cost}</div>,
    },
    {
      id: "name",
      name: "الكمية",
      cell: (row) => <div className="text-sm">{row.quantity}</div>,
    },
    {
      id: "name",
      name: "التقييم",
      cell: (row) => (
        <div className="text-sm line-through">{row.evaluation}</div>
      ),
    },
    {
      id: "name",
      name: "التحكم",
      cell: (row) => (
        <div className="bg-[#FAFBFD] border cursor-pointer  h-[30px] border-[#D5D5D5] rounded-lg flex items-center ">
          <FiEdit
            onClick={() => navigate(`/editProduct/${row.id}`)}
            className=" text-gray-600 text-2xl  h-full p-1 border-e border-[#D5D5D5]"
          />
          <FaEye
            onClick={() => navigate(`/product/${row.id}`)}
            className=" text-gray-600 text-2xl  h-full p-1 border-e border-[#D5D5D5]"
          />
          <DeleteModal
            MassegeSuccess="تم الحذف بنجاح"
            apiPath={`/deleteProduct/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];

  return (
    <PageContainer
      breadcrumb={[{ title: "Product Stock" }]}
      className="overflow-x-hidden"
    >
      <div className="w-full flex justify-end">
        <Button onClick={() => navigate("/product/add")}>اضافة منتج</Button>
      </div>
      <Form {...form}>
        <div className="bg-white my-8  max-md:flex-col max-md:w-fit cursor-pointer text-center   border border-gray-200 rounded-3xl flex justify-center items-center">
          <img
            src={path}
            className="w-14  h-14 border-e border-gray-200 p-4 max-md:hidden"
          />
          <p className="border-e w-full flex justify-center border-gray-200 p-4 ">
            فلترة حسب
          </p>

          <div className="border-e w-full border-gray-200  flex justify-between  items-center">
            <SelectFiled
              Trigger={
                <p className=" flex justify-between text-black    items-center">
                  الصنف
                </p>
              }
              name="product_category_id"
              watch={form.watch}
              options={ProductCategory}
              control={form.control}
              classNameValue="!border-none   items-center gap-4 "
            />
          </div>
          <div className="border-e w-full border-gray-200  flex justify-between  items-center">
            <SelectFiled
              Trigger={
                <p className=" flex justify-between text-black    items-center">
                  الماركة
                </p>
              }
              name="brand_id"
              watch={form.watch}
              options={Brand}
              control={form.control}
              classNameValue="!border-none   items-center gap-4 "
            />
          </div>
          <div className="border-e w-full border-gray-200  flex justify-between  items-center">
            <RHFTextField
              control={form.control}
              startAdornment={
                <IoIosSearch className="text-gray-600 text-2xl" />
              }
              name="name"
              placeholder="البحث"
              inputClassName="!border-none"
            />
          </div>
          <p className=" p-4 w-full flex gap-4  items-center text-[#EA0234]">
            <FaArrowRotateRight size={14} color="#EA0234" />
            اعادة تهيئة الفلتر
          </p>
        </div>
      </Form>
      <Table
        table={{
          columns: cols,
          data: data?.data ?? [],
          loading: isFetching,
        }}
      />
    </PageContainer>
  );
};

export default Products;
