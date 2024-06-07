import { DeleteModal } from "@/components/dialog";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TableColumn } from "react-data-table-component";
import AcceptOrder from "./AcceptOrder";
import { Table } from "@/components/ui/Layout";

const AcceptOrderTable = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["get-Buy"],
    queryFn: async () => {
      const { data } = await axios.get(`/getBuyAccepted`);
      return data.data;
    },
  });
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
        <div className="text-sm">
          <span
            className={`text-sm rounded-xl px-6 p-2 max-md:text-xs    text-white ${
              row.is_approved === 1 ? "bg-[#00B69B]/60 ]" : "bg-[#EF3826]/60 "
            }`}
          >
            {row.is_approved === 1 ? "مقبول" : "مرفوض"}
          </span>
        </div>
      ),
    },
    {
      id: "name",
      name: "التحكم",
      cell: (row) => (
        <div className=" cursor-pointer  gap-2 flex items-center ">
          {/* <FiEdit className=" text-gray-600 text-2xl  h-full p-1 border-e border-[#D5D5D5]" /> */}
          <DeleteModal
            MassegeSuccess="تم الحذف بنجاح"
            apiPath={`/deleteOrder/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        table={{
          columns: cols,
          data: data?.data ?? [],
          loading: isFetching,
        }}
      />
    </>
  );
};

export default AcceptOrderTable;
