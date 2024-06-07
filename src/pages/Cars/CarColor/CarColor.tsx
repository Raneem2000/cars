import { PageContainer } from "@/components/containers";
import { DeleteModal } from "@/components/dialog";
import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { ModalStates } from "@/types";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import moment from "moment";
import AddCarColor from "./AddCarColor";
const CarModel = () => {
  const [selectedRow, setSelectedRow] = useState();
  const [modalState, setModalState] = useState<ModalStates>(null);
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-car-color"],
    queryFn: async () => {
      const { data } = await axios.get(`/getCarColor`);
      return data.data;
    },
  });
  const cols: TableColumn<any>[] = [
    {
      id: "currency",
      name: "القيمة",
      cell: (row) => <div title={row.value}>{row.name}</div>,
    },

    {
      id: "created_at",
      name: "تاريخ الانشاء",
      cell: (row) =>   <div>{moment(row.created_at).format("YYYY/MM/DD")}</div>,
    },

    {
      id: "actions",
      name: "التحكم",
      cell: (row) => (
        <div className="flex justify-center  items-center text-center cursor-pointer">
          <Button variant={"link"}>
            <FiEdit
              onClick={() => {
                setModalState("edit");
                setSelectedRow(row);
              }}
              className="text-primary text-lg hover:text-pretty"
            />
          </Button>

          <DeleteModal
            MassegeSuccess="تم الحذف بنجاح"
            apiPath={`/deleteCarColor/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  return (
    <PageContainer breadcrumb={[{ title: "الوان السيارات" }]}>
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
      {(modalState === "add" || modalState === "edit") && (
        <AddCarColor
          isOpen={modalState === "add" || modalState === "edit"}
          onClose={() => setModalState(null)}
          formValues={modalState === "edit" ? selectedRow : undefined}
        />
      )}
    </PageContainer>
  );
};

export default CarModel;
