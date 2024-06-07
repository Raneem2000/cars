import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import React, { FC, useEffect, useState } from "react";
import { CustomerData, ModalStates } from "@/types";
import { FaPlus } from "react-icons/fa6";
import { TableColumn } from "react-data-table-component";
import { Table } from "@/components/ui/Layout";

interface DialogContainerProps {
  dialogKey?: string;
  isOpen: boolean;
  onClose: () => void;
  serviceMan: {
    name: string;
    id: string | number;
    branch_id: string | number;
  }[];
  returnedValue: (value: object) => void;
}
const SelectServiceMan: React.FC<DialogContainerProps> = ({
  isOpen,
  returnedValue,
  onClose,
  serviceMan,
}) => {
  const handleChoose = (data: any) => {
    returnedValue(data);
    onClose();
  };
  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: "اسم الموظف",
      cell: (row) => <div title={row.name}>{row.name}</div>,
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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[40rem] ">
        <div className="flex justify-around">
          <h1 className="text-center text-xl font-md">أختر الموظف </h1>
        </div>

        <div>
          <Table
            table={{
              columns: cols,
              data: serviceMan,
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectServiceMan;
