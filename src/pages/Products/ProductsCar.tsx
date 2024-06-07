import { PageContainer } from "@/components/containers";
import { DeleteModal } from "@/components/dialog";
import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TableColumn } from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const ProductsCar = () => {
  const { id } = useParams();
  const { data, refetch , isFetching } = useQuery({
    queryKey: ["get"],
    queryFn: async () => {
      const { data } = await axios.get(`/getCarById/${id}`);
      return data.data;
    },
  });
  const navigate = useNavigate();
  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: "اسم المنتج ",
      cell: (row) => <div className="text-sm">{row.name}</div>,
    },
    {
      id: "name",
      name: "الوصف",
      cell: (row) => <div className="text-sm">{row.description}</div>,
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
    <PageContainer>
       <div className="w-full flex justify-end my-4">
        <Button onClick={() => navigate("/product/add")}>اضافة منتج</Button>
      </div>
      <Table
        table={{
          columns: cols,
          data: data?.products ?? [],
          loading:isFetching
        }}
      />
    </PageContainer>
  );
};

export default ProductsCar;
