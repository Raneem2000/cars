import { PageContainer } from "@/components/containers";
import { DeleteModal } from "@/components/dialog";
import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { ModalStates } from "@/types";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";

import { FiEdit } from "react-icons/fi";
import AddPayTypes from "./AddPayTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

const PayTypes = () => {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-PayType"],
    queryFn: async () => {
      const { data } = await axios.get(`/getPayType`);
      return data.data;
    },
  });
  const [selectedRow, setSelectedRow] = useState<any>();
  const [modalState, setModalState] = useState<ModalStates>(null);
  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: "اسم الطريقة ",
      cell: (row) => <div title={row.name}>{row.name}</div>,
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
            apiPath={`/deletePayType/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  return (
    <PageContainer breadcrumb={[{ title: "طرق الدفع" }]}>
      <div className="flex justify-end w-full my-4">
        <Button onClick={() => setModalState("add")}>أضافة</Button>
      </div>
      <Table
        table={{
          columns: cols,
          data: data,
          loading: isFetching,
        }}
      />
      <AddPayTypes
          formValues={modalState === "edit" ? selectedRow : undefined}
        isOpen={modalState === "add" || modalState === "edit"}
        onClose={() => setModalState(null)}
      />
    </PageContainer>
  );
};

export default PayTypes;
