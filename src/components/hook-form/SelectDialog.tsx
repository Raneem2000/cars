import apiRoutes from "@/api";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFInputFile from "@/components/hook-form/RHFInputFile";
import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import React, { FC, useEffect, useState } from "react";
import { ServiceForm } from "@/types/service";
import { CustomerData, ModalStates } from "@/types";
import { FaPlus } from "react-icons/fa6";
import { TableColumn } from "react-data-table-component";
import { Table } from "@/components/ui/Layout";

interface DialogContainerProps {
  dialogKey?: string;
  isOpen: boolean;
  onClose: () => void;
  data: any;
  branch_id?:any;
  returnedValue: (value: object) => void;
}
const SelectDialog: React.FC<DialogContainerProps> = ({
  isOpen,
  returnedValue,
  onClose,
  branch_id,
  data,
}) => {
  const handleChoose = (data: any) => {
    returnedValue(data);
    onClose();
  };
  const cols: TableColumn<any>[] = [
    {
      id: "image",
      name: "الصورة ",
      cell: (row) => (
        <div
          onClick={() => {
            setSelectedRow(row);
          }}
          className="my-2"
          title={row?.name + "here"}
        >
          <img
            className="w-20"
            src={
              row?.image
                ? `${BASE_URL_IMG}/${row?.image?.id}/${row?.image?.file_name}`
                : "/vite.svg"
            }
            alt=""
          />
        </div>
      ),
    },
    {
      id: "name",
      name: "اسم العميل",
      cell: (row) => (
        <div
          onClick={() => {
            setSelectedRow(row);
          }}
          title={row.name}
        >
          {row.name}
        </div>
      ),
    },

    {
      id: "actions",
      name: "التحكم",
      cell: (row) => (
        <div className="flex justify-center gap-2  items-center text-center cursor-pointer">
          <Button
            onClick={() => {
              handleChoose(row);
            }}
            className="rounded-md flex-grow"
          >
            أختر
          </Button>
        </div>
      ),
    },
  ];
  useEffect(() => {}, []);
  const [modalStateCompany, setModalStateCompany] = useState<ModalStates>(null);
  const [selectedRow, setSelectedRow] = useState<CustomerData | null>(null);
  const [openModelComoany, setOpenModelComoany] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[40rem] ">
        <div>
          <Table
            table={{
              columns: cols,
              data: data,
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectDialog;
