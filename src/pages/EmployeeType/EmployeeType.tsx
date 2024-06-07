import { PageContainer } from "@/components/containers";
import { DeleteModal } from "@/components/dialog";
import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { ModalStates } from "@/types";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import AddEmplyeeType from "./AddEmplyeeType";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import moment from "moment";

const EmployeeType = () => {
  const [selectedRow, setSelectedRow] = useState<any>();
  const [modalState, setModalState] = useState<ModalStates>(null);
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-EmployeeType"],
    queryFn: async () => {
      const { data } = await axios.get(`/getEmployeeType`);
      return data.data;
    },
  });
  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: "اسم الموظف",
      cell: (row) => <div title={row.name}>{row.name}</div>,
    },
    {
      id: "created_at",
      name: "تاريخ الانشاء",
      cell: (row) => <div>{moment(row.created_at).format("YYYY/MM/DD")}</div>,
    },

    {
      id: "actions",
      name: "التحكم",
      cell: (row) => (
        <div className="flex gap-2 justify-center  items-center text-center cursor-pointer">
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
            apiPath={`/deleteEmployeeType/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  return (
    <PageContainer breadcrumb={[{ title: "انواع الموظفين" }]}>
      <div className="flex justify-end w-full my-4">
        <Button onClick={() => setModalState("add")}>أضافة</Button>
      </div>
      <Table
        table={{
          columns: cols,
          data: data,
          loading:isFetching,
        }}
      />
      <AddEmplyeeType
        formValues={modalState === "edit" ? selectedRow : null}
        isOpen={modalState === "add" || modalState === "edit"}
        onClose={() => setModalState(null)}
      />
    </PageContainer>
  );
};

export default EmployeeType;
