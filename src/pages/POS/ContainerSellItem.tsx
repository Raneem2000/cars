import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFRadioGroup from "@/components/hook-form/RHFRadioGroup";
import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FC, useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { BiSolidTrashAlt } from "react-icons/bi";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import CouponCode from "./CouponCode";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const ContainerSellItem: FC<{
  setSelectedProducts: (arg: any) => void;
  selectedProducts: any;
  calculateTotalPrice: any;
  selectCurrency?: any;
  totalCost: any;
  totalPrice: any;
  setTotalPrice: any;
  setSelectCurrency?: any;
  calculateTotalCost: any;
}> = ({
  selectedProducts,
  totalCost,
  calculateTotalCost,
  setSelectedProducts,
  totalPrice,
  setTotalPrice,
  calculateTotalPrice,
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/createBuy`, data);
      return res;
    },
  });

  //  console.log(totalPrice)
  const handleQuantityChange = (product: any, action: any) => {
    const updatedProducts = [...selectedProducts];
    const selectedProductIndex = updatedProducts.findIndex(
      (p) => p.id === product.id
    );

    if (action === "increase") {
      updatedProducts[selectedProductIndex].quantity += 1;
    } else if (action === "decrease") {
      if (updatedProducts[selectedProductIndex].quantity > 0) {
        updatedProducts[selectedProductIndex].quantity -= 1;
      }
    } else {
      updatedProducts[selectedProductIndex].quantity = action;
    }

    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  const handleProductDelete = (product: any) => {
    const updatedProducts = selectedProducts.filter((p : any) => p.id !== product.id);
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
    calculateTotalCost(updatedProducts);
  };

  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: "الاسم",
      cell: (row) => <div>{row.name}</div>,
    },
    {
      id: "price",
      name: "السعر",
      cell: (row) => <div>{row.price}</div>,
    },
    {
      id: "price",
      name: "الكلفة",
      cell: (row) => <div>{row.cost}</div>,
    },
    {
      id: "quantity",
      name: "الكمية",
      cell: (row) => (
        <div className="flex gap-2 items-center">
          <Button
            type="button"
            variant={"link"}
            onClick={() => handleQuantityChange(row, "decrease")}
          >
            <CiCircleMinus className="text-primary text-2xl" />
          </Button>
          <Input
            className="p-1 w-10 h-10"
            value={row.quantity}
            min={0}
            onChange={(e) =>
              handleQuantityChange(row, parseInt(e.target.value) as any)
            }
          />
          <Button
            type="button"
            variant={"link"}
            onClick={() => handleQuantityChange(row, "increase")}
          >
            <CiCirclePlus className="text-primary text-2xl" />
          </Button>
        </div>
      ),
    },
    {
      id: "price",
      name: "الحذف",
      cell: (row) => (
        <Button onClick={() => handleProductDelete(row)} variant={"link"}>
          <BiSolidTrashAlt
            className={`text-destructive text-lg hover:text-pretty`}
          />
        </Button>
      ),
    },
  ];
  const { data: Supplier } = useQuery({
    queryKey: ["get-Supplier"],
    queryFn: async () => {
      const { data } = await axios.get(`/getSupplier`);
      return data.data;
    },
    select: (data) =>
      data?.data?.map((data: any) => ({
        id: data.id,
        name: data.money,
      })),
  });
  // console.log(Supplier)

  const [openCode, setOpenCode] = useState(false);

  const methods = useForm();
  const navigate = useNavigate()

  const Submit = (data: any) => {
    const buy_info = selectedProducts.map((item : any) => {
      return {
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        cost:item.cost
      };
    });
    const body = {
      ...data,
      buy_info,
      total_price: totalPrice,
      total_cost: totalCost,
    };
    mutate(body, {
      onSuccess() {
        toast("تمت عملية الشراء بنجاح");
        navigate("/pos/order")
      },
    });
  };
  return (
    <div className="p-4 bg-white rounded-xl w-[350px] max-sm:w-full h-fit transition-all drop-shadow-lg flex flex-col gap-4">
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(Submit)}
          className="flex flex-col gap-2"
        >
          
          <RHFSelect
            name="supplier_id"
            options={Supplier}
            label="اختر مورد"
            control={methods.control}
            watch={methods.watch}
          />
          <RHFTextField
            label="العنوان"
            name="title"
            control={methods.control}
          />
          <RHFTextField
            label="الوصف"
            name="description"
            control={methods.control}
          />

          {selectedProducts?.length > 0 && (
            <div className="flex flex-col">
              <Table
                width="500px"
                table={{
                  columns: cols,
                  data: selectedProducts ?? [],
                }}
              />
              <p>السعر الاجمالي :{totalPrice}</p>
              <p>الكلفة الاجمالية :{totalCost}</p>

            </div>
          )}

          <div className="mt-6 flex basis-full  gap-4">
            <Button
              type="submit"
              className="rounded-md flex-grow"
              disabled={isPending}
            >
              اضافة
            </Button>
          </div>
        </form>
      </Form>
      {/* <DeliveryInfo setOpen={setOpenDelevry} open={openDelvery} /> */}
      <CouponCode open={openCode} setOpen={setOpenCode} />
      {/* <CompleteOrder open={openComplete} setOpen={setOpenComplete} /> */}
    </div>
  );
};

export default ContainerSellItem;
