import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { FC, useState } from "react";
import { TableColumn } from "react-data-table-component";

const CouponCode: FC<{
  open: boolean;
  selectedRow?: any;
  setSelectedRow?: (arg: any) => void;
  setOpen: (arg: boolean) => void;
}> = ({ open, setOpen, selectedRow, setSelectedRow }) => {
  const data = [
    { Coupon_Code: "BX068K", Discount_types: "Price", Reductions: "50 $" },
    { Coupon_Code: "BX0655", Discount_types: "Price", Reductions: "50 $" },
  ];
  // معالجة النقر على الصف
  //   const handleRowClick = (row: any) => {
  //     setSelectedRow(row); // تحديث الصف المحدد
  //   };
  //   console.log(selectedRow);
  const cols: TableColumn<any>[] = [
    {
      id: "Coupon_Code",
      name: "كود الحسم",
      cell: (row) => <div>{row.Coupon_Code}</div>,
    },

    {
      id: "Discount_types",
      name: "نوع الحسم",
      cell: (row) => <div title={row.name}>{row.Discount_types}</div>,
    },

    {
      id: "Reductions",
      name: "التخفيضات",
      cell: (row) => <div title={row.name}>{row.Reductions}</div>,
    },
  ];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" text-center max-w-[40rem]">
        <h1 className="font-md text-xl">Select Coupon Code</h1>
        <Table
          table={{
            columns: cols,
            data: data,
          }}
        />
        <Button>Choose Coupon Code</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CouponCode;
