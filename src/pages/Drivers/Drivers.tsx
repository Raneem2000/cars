import { PageContainer } from "@/components/containers";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AddDrivers from "./AddDrivers";
import { useQuery } from "@tanstack/react-query";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { DeleteModal } from "@/components/dialog";
import { Table } from "@/components/ui/Layout";
import { ModalStates } from "@/types";

const Drivers = () => {
  const [open, setOpen] = useState<ModalStates>(null);

  const [selectedRow, setSelectedRow] = useState<any>();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-Driver"],
    queryFn: async () => {
      const { data } = await axios.get(`/getDriver`);
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
      name: "العنوان",
      cell: (row) => <div title={row.name}>{row.user.address}</div>,
    },
    {
      id: "name",
      name: "المركبة",
      cell: (row) => <div title={row.name}>{row.vehicle}</div>,
    },
    {
      id: "name",
      name: "الصندوق",
      cell: (row) => <div title={row.name}>{row.box}</div>,
    },
    {
      id: "actions",
      name: "التحكم",
      cell: (row) => (
        <div className="flex justify-center  items-center text-center cursor-pointer">
          <Button
            variant={"link"}
            onClick={() => {
              setOpen("edit");
              setSelectedRow(row);
            }}
          >
            <FiEdit className="text-primary text-lg hover:text-pretty" />
          </Button>

          <DeleteModal
            MassegeSuccess="تم الحذف بنجاح"
            apiPath={`/deleteDriver/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  return (
    <PageContainer breadcrumb={[{ title: "السائقين" }]}>
      <div className="w-full flex justify-end mb-4">
        <Button onClick={() => setOpen("add")}>اضافة سائق </Button>
      </div>
      <Table
        table={{
          columns: cols,
          data: data ?? [],
          loading: isFetching,
        }}
      />
      <AddDrivers
        setSelectedRow={selectedRow}
        formValues={open === "edit" ? selectedRow : null}
        open={open === "add" || open === "edit"}
        setOpen={() => setOpen(null)}
      />
    </PageContainer>
  );
};

export default Drivers;
