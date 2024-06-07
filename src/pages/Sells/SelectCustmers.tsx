import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { FC, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

const SelectCustomer: FC<{
  setValue: any;
  open: boolean;
  setOpen: any;
  customers: any;
  setCustomerName: any;
}> = ({ open, setOpen, setValue, customers, setCustomerName }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const handleRadioChange = (customer: any) => {
    setSelectedCustomer(customer);

    // console.log(customer);
  };

  const handleSave = () => {
    setCustomerName(
      customers.find((d: any) => d.id === selectedCustomer?.id).name
    );
    setValue("customer_id", selectedCustomer?.id);
    setOpen(false);
  };

  const cols: TableColumn<any>[] = [
    {
      id: "",
      name: "",
      cell: (row) => <div>{row.name}</div>,
    },
    {
      name: "",
      cell: (row) => (
        <input
          type="radio"
          checked={selectedCustomer === row}
          onChange={() => handleRadioChange(row)}
          style={{
            appearance: "none",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            border: "1px solid #000",
            backgroundColor:
              selectedCustomer?.id === row?.id ? "#000" : "transparent",
          }}
        />
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        <h1 className="text-center text-xl">اختار زبون</h1>
        <DataTable
          columns={cols}
          data={customers}
          customStyles={{
            rows: {
              style: {
                display: "flex",
                gap: "260px",
                justifyContent: "space-between",
              },
            },
            cells: {
              style: {
                color: "#000",
              },
            },
          }}
        />
        <Button onClick={handleSave}>Save</Button>
      </DialogContent>
    </Dialog>
  );
};

export default SelectCustomer;
