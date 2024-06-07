import { PageContainer } from "@/components/containers";
import { DeleteModal } from "@/components/dialog";
import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { ModalStates } from "@/types";
import React, { useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import AddBrand from "./AddBrand";
import { useQuery } from "@tanstack/react-query";
import axios, { BASE_URL_IMG } from "@/lib/axios";

const Brand = () => {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-Brand"],
    queryFn: async () => {
      const { data } = await axios.get(`/getBrand`);
      return data.data;
    },
  });
  const [modalState, setModalState] = useState<ModalStates>(null);
  const [selectedRow, setSelectedRow] = useState<any>();
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
            apiPath={`/deleteBrand/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  return (
    <PageContainer breadcrumb={[{ title: "الماركات التجارية" }]}>
      <div className="flex justify-end w-full my-4">
        <Button onClick={() => setModalState("add")}>أضافة</Button>
      </div>
      <Table
        table={{
          columns: cols,
          data: data ?? [],
          loading: isFetching,
        }}
      />
      <AddBrand
        formValues={modalState === "edit" ? selectedRow : null}
        isOpen={modalState === "add" || modalState === "edit"}
        onClose={() => setModalState(null)}
      />
    </PageContainer>
  );
};

export default Brand;
