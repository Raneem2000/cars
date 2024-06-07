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
import orderImg from "../../assets/svgs/image 56.svg";
import delvrryImg from "../../assets/svgs/image 56(1).svg";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { CustmersSelect, PayTypeSelect } from "@/api/ApiQuery";
import SelectLocation from "./SelectLocation";
import SelectCustomer from "./SelectCustmers";
const ContainerSellItem: FC<{
  setSelectedProducts: (arg: any) => void;
  selectedProducts: any;
  calculateTotalPrice: any;
  selectCurrency?: any;

  totalPrice: any;
  setTotalPrice: any;
  setSelectCurrency?: any;
}> = ({
  selectedProducts,

  setSelectedProducts,
  totalPrice,
  setTotalPrice,
  calculateTotalPrice,
}) => {
  const { id } = useParams();
  const { data: SellItemById } = useQuery({
    queryKey: ["get-SellItem", id],
    queryFn: async () => {
      const { data } = await axios.get(`/getSellItemById/${id}`);
      return data.data;
    },
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/createSellItem`, data);
      return res;
    },
  });
  const { mutate: updateSellItem } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/update/${id}`, data);
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
    const updatedProducts = selectedProducts.filter(
      (p: any) => p.id !== product.id
    );
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
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

  // console.log(Supplier)

  const { data: Customer } = CustmersSelect();
  const [openDelvery, setOpenDelevry] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openCustmers, setopenCustmers] = useState(false);

  const methods = useForm();
  const navigate = useNavigate();
  const { data: Drivers } = useQuery({
    queryKey: ["get-Driver"],
    queryFn: async () => {
      const { data } = await axios.get(`/getDriver`);
      return data.data;
    },
    select: (data) =>
      data?.map((data: any) => ({
        id: data.id,
        name: data.user.name,
      })),
  });
  // console.log(Drivers)
  const { handleSubmit, watch, reset, setValue } = methods;
  const Submit = (data: any) => {
    // console.log(selectedProducts);
    console.log(selectedProducts);
    const sell_info = selectedProducts.map((item: any) => {
      return {
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        id: item.sell_item_id,
      };
    });

    const body = {
      ...data,
      status: "waiting",
      sell_info,

      total_price: totalPrice,
    };
    delete body.order_typr;
    if (id) {
      updateSellItem(body, {
        onSuccess() {
          toast("تمت عملية التعديل بنجاح");
          // navigate("/order");
        },
      });
    } else {
      mutate(body, {
        onSuccess() {
          toast("تمت عملية الشراء بنجاح");
          navigate("/order");
        },
      });
    }
  };
  const [customerName, setCustomerName] = useState();
  // console.log(SellItemById);
  const { data: Prod } = useQuery({
    queryKey: ["get-prod"],
    queryFn: async () => {
      const { data } = await axios.get(`/getProduct`);
      return data.data;
    },
  });
  useEffect(() => {
    if (SellItemById) {
      methods.reset({
        customer_id: SellItemById?.customer_id,
        barcode: SellItemById?.barcode,
      });
      const updatedProducts = SellItemById?.sell_item_infos?.map((item : any) => {
        return {
          ...item,
          id: item.product_id,
          name: item?.product?.name,
          sell_item_id: item.id,
        };
      });
      console.log(updatedProducts);
      setSelectedProducts(updatedProducts);
      setCustomerName(
        Customer?.find((d: any) => d.id === SellItemById?.customer_id).name
      );
      setTotalPrice(SellItemById?.total_price);
    }
  }, [SellItemById, Customer]);
  return (
    <div className="p-4 bg-white rounded-xl w-[450px] max-sm:w-full h-fit transition-all drop-shadow-lg flex flex-col gap-4">
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(Submit)}
          className="flex flex-col gap-2"
        >
          <div className="grid grid-cols-2 gap-2">
            {!methods.watch("customer_id") ? (
              <Button className="mt-10" onClick={() => setopenCustmers(true)}>
                اضافة زبون
              </Button>
            ) : (
              <p className="text-xl mt-10 ">الزبون:{customerName}</p>
            )}
            {/* <RHFSelect
              name="status"
              options={[
                { id: "waiting", name: "Waiting" },
                { id: "approved", name: "Approved" },
                { id: "prepared", name: "Prepared" },
                { id: "on_way", name: "On the Way" },
                { id: "delivered", name: "Delivered" },
                { id: "paymented", name: "Paymented" },
                { id: "reject", name: "Reject" },
              ]}
              label="الحالة"
              control={methods.control}
              watch={methods.watch}
            /> */}

            <RHFTextField
              label="الباركود"
              name="barcode"
              control={methods.control}
            />
            <RHFRadioGroup
              className="col-span-2"
              onChange={(value) => value == "delivery" && setOpenDelevry(true)}
              label="نوع الطلبية"
              withoutIcon
              name="order_typr"
              options={[
                { id: "store", name: "Store", icon: <img src={orderImg} /> },
                {
                  id: "delivery",
                  name: "Delivery",
                  icon: <img src={delvrryImg} />,
                },
              ]}
            />

            {methods.watch("order_typr") === "delivery" && (
              <>
                <RHFSelect
                  name="driver_id"
                  options={Drivers}
                  label="اختر سائق"
                  control={methods.control}
                  watch={methods.watch}
                />

                <RHFTextField
                  label="سعر التوصيل"
                  type="number"
                  min={1}
                  name="delivery_cost"
                  control={methods.control}
                />
                {methods.watch("longitude") && methods.watch("latitude") ? (
                  <>
                    <RHFTextField
                      label="خط الطول"
                      name="longitude"
                      control={methods.control}
                    />
                    <RHFTextField
                      label="خط العرض"
                      name="latitude"
                      control={methods.control}
                    />
                  </>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setOpenLocation(true)}
                    className="mt-10"
                  >
                    تحديد العنوان{" "}
                  </Button>
                )}
              </>
            )}
          </div>

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
      <SelectLocation
        open={openLocation}
        setOpen={() => setOpenLocation(false)}
        setValue={methods.setValue}
      />
      <SelectCustomer
        setCustomerName={setCustomerName}
        customers={Customer}
        open={openCustmers}
        setOpen={() => setopenCustmers(false)}
        setValue={methods.setValue}
      />
    </div>
  );
};

export default ContainerSellItem;
