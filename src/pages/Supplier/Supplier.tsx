import { PageContainer } from "@/components/containers";
import { DeleteModal } from "@/components/dialog";
import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import { ModalStates } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import AddSupplier from "./AddSupplier";

const Supplier = () => {
  const [modalState, setModalState] = useState<ModalStates>(null);
  const [selectedRow, setSelectedRow] = useState<any>();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-Supplier"],
    queryFn: async () => {
      const { data } = await axios.get(`/getSupplier`);
      return data.data;
    },
    
  });
  const cols: TableColumn<any>[] = [
    {
      id: "image",
      name: "الصورة",
      cell: (row) => (
        <img
          className="w-[60px] h-[60px] my-6"
          src={`${BASE_URL_IMG}/${row.image?.id}/${row.image?.file_name}`}
        />
      ),
    },
    {
      id: "name",
      name: "الاسم",
      cell: (row) => <div title={row.name}>{row.user.name}</div>,
    },
    {
        id: "name",
        name: "Mony",
        cell: (row) => <div title={row.name}>{row.money}</div>,
      },
      {
        id: "name",
        name: "Mony",
        cell: (row) => <div title={row.name}>{row.opening_balance}</div>,
      },
    {
      id: "actions",
      name: "التحكم",
      cell: (row) => (
        <div className="flex justify-center  items-center text-center cursor-pointer">
          <Button
            variant={"link"}
            onClick={() => {
              setModalState("edit");
              setSelectedRow(row);
            }}
          >
            <FiEdit className="text-primary text-lg hover:text-pretty" />
          </Button>

          <DeleteModal
            MassegeSuccess="تم الحذف بنجاح"
            apiPath={`/deleteSupplier/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  return (
    <PageContainer breadcrumb={[{ title: "الموردين" }]}>
      <div className="flex justify-end w-full my-4">
        <Button onClick={() => setModalState("add")}>أضافة</Button>
      </div>
      <Table
        table={{
          columns: cols,
          data: data?.data ?? [],
          loading: isFetching,
        }}
      />
      <AddSupplier
      setSelectedRow={selectedRow}
        formValues={modalState === "edit" ? selectedRow : null}
        open={modalState === "add" || modalState === "edit"}
        onClose={() => setModalState(null)}
      />
    </PageContainer>
  );
};

export default Supplier;
