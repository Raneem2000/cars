import { PageContainer } from "@/components/containers";
import { Table } from "@/components/ui/Layout";
import axios from "@/lib/axios";
import path from "../../../assets/svgs/Path.svg";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TableColumn } from "react-data-table-component";
import AcceptOrder from "./AcceptOrder";
import { DeleteModal } from "@/components/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AcceptOrderTable from "./AcceptOrderTable";
import NotAcceptedTable from "./NotAcceptedTable";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Map from "../Maps";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { IoIosSearch } from "react-icons/io";
import { FaArrowRotateRight } from "react-icons/fa6";

const Orders = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["get-Buy"],
    queryFn: async () => {
      const { data } = await axios.get(`/getBuy`);
      return data.data;
    },
  });
  const navigate = useNavigate();
  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: " العنوان ",
      cell: (row) => <div className="text-sm">{row.title}</div>,
    },
    {
      id: "name",
      name: "الوصف",
      cell: (row) => <div className="text-sm">{row.description}</div>,
    },
    {
      id: "name",
      name: "السعر الاجمالي",
      cell: (row) => <div className="text-sm">{row.total_price}</div>,
    },
    {
      id: "name",
      name: "الكلفة الاجمالية",
      cell: (row) => <div className="text-sm ">{row.total_cost}</div>,
    },
    {
      id: "name",
      name: "الحسم",
      cell: (row) => <div className="text-sm ">{row.discount}</div>,
    },
    {
      id: "name",
      name: "المورد",
      cell: (row) => <div className="text-sm ">{row.supplier.user.name}</div>,
    },
    {
      id: "name",
      name: "الحالة",
      cell: (row) => (
        <span
          className={`text-sm rounded-xl p-2 max-md:text-xs    text-white ${
            row.is_approved === 1 ? "bg-[#00B69B]/60 ]" : "bg-[#EF3826]/60 "
          }`}
        >
          {row.is_approved === 1 ? "مقبول" : "مرفوض"}
        </span>
      ),
    },
    {
      id: "name",
      name: "التحكم",
      cell: (row) => (
        <div className=" cursor-pointer  gap-2 flex items-center ">
          {/* <FiEdit onClick={()=>navigate(`/pos/${row.id}`)} className=" text-gray-600 text-xl" /> */}
          <AcceptOrder id={row.id} />
          <DeleteModal
            MassegeSuccess="تم الحذف بنجاح"
            apiPath={`/deleteOrder/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  const form = useForm();
  return (
    <PageContainer
      breadcrumb={[{ title: "الطلبيات حسب المورد" }]}
      className="overflow-x-hidden"
    >
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
      {/* <Map/> */}
    </PageContainer>
  );
};

export default Orders;
