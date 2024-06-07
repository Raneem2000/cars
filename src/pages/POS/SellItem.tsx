import { Logo } from "@/assets/svgs";
import { PageContainer } from "@/components/containers";
import React, { useState } from "react";
import { toast } from "sonner";
import ContainerSellItem from "./ContainerSellItem";
import ModalDetails from "./ModalDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form } from "@/components/ui/form";
import RHFSelect from "@/components/hook-form/RHFSelect";
import { TableColumn } from "react-data-table-component";
import { Button } from "@/components/ui/button";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { BiSolidTrashAlt } from "react-icons/bi";
import { Table } from "@/components/ui/Layout";
import RHFTextField from "@/components/hook-form/RHFTextField";
const SellItem = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["get-prod"],
    queryFn: async () => {
      const { data } = await axios.get(`/getProduct`);
      return data.data;
    },
  });
  const { data: Supplier } = useQuery({
    queryKey: ["get-Supplier"],
    queryFn: async () => {
      const { data } = await axios.get(`/getSupplier`);
      return data.data;
    },
    select: (data) =>
      data?.data?.map((data: any) => ({
        id: data.id,
        name: data.user.name,
      })),
  });
  const [selectedProduc, setSelectedProduc] = useState<any>();
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [open, setOpen] = useState<boolean>();
  const [totalPrice, setTotalPrice] = useState(
    selectedProducts[0] ? selectedProducts[0].price : 0
  );
  const [totalCost, setTotalCost] = useState(
    selectedProducts[0] ? selectedProducts[0].cost : 0
  );

  const calculateTotalCost = (products : any) => {
    const total = products.reduce((acc : any, curr : any) => acc + curr.cost, 0);
    setTotalCost(total);
  };

  const calculateTotalPrice = (products: any) => {
    const totalPrice = products.reduce((sum : any, product : any) => {
      return sum + product.price * product.quantity;
    }, 0);

    setTotalPrice(totalPrice);
  };
  const handleQuantityChange = (Product : any, action: string) => {
    const updatedProducts = selectedProducts?.map((p : any) => {
      if (p.id === Product.id) {
        if (action === "increase") {
          return { ...p, quantity: p.quantity + 1 };
        } else if (action === "decrease") {
          if (p.quantity > 0) {
            return { ...p, quantity: p.quantity - 1 };
          }
        }
      }
      return p;
    });
    if (action === "increase") {
      setSelectedProduc({ ...Product, quantity: Product.quantity + 1 });
    } else {
      setSelectedProduc({ ...Product, quantity: Product.quantity - 1 });
    }
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };
  // console.log(selectedProducts);
  const addNewProduct = (product: any) => {
    const updatedProduct = { ...product };
    const updatedProducts = [...selectedProducts, updatedProduct];
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
    calculateTotalCost(updatedProducts);
  };
  const handleProductSelect = (Product : any) => {
    if (selectedProducts.includes(Product)) {
      setSelectedProducts(selectedProducts.filter((p : any) => p !== Product));
    } else {
      addNewProduct(Product);
    }

    setOpen(false);
  };
  const handleProductDelete = (product: any) => {
    const updatedProducts = selectedProducts.filter(
      (p: any) => p.id !== product.id
    );
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
    calculateTotalCost(updatedProducts);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/createBuy`, data);
      return res;
    },
  });
  const handlePriceChange = (Product : any, newPrice : any) => {
    const updatedProducts = selectedProducts?.map((p : any) => {
      if (p.id === Product.id) {
        return { ...p, price: newPrice };
      }
      return p;
    });
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  const handleCostChange = (Product : any, newCost : any) => {
    const updatedProducts = selectedProducts?.map((p : any) => {
      if (p.id === Product.id) {
        return { ...p, cost: newCost };
      }
      return p;
    });
    setSelectedProducts(updatedProducts);
    calculateTotalCost(updatedProducts);
  };
  const { mutate: Update } = useMutation({
    mutationFn: async (data : any) => {
      const res = await axios.post(`/updateProduct/${data.id}`, data);
      return res;
    },
  });
const queryClient = useQueryClient()
  const handleProductUpdate = (product: any) => {
    const updatedProduct = selectedProducts.find((p: any) => p.id === product.id);
    Update(updatedProduct, {
      onSuccess: () => {
        toast("تم تحديث المنتج بنجاح");
        queryClient.refetchQueries({ queryKey: ["get-prod"] });
      },
      onError: (error) => {
        toast("حدث خطأ أثناء تحديث المنتج");
      },
    });
  };

  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: "الاسم",
      cell: (row) => <div>{row.name}</div>,
    },
    {
      id: "price",
      name: "سعر الشراء",
      cell: (row) => (
        <div>
          <Input
            className="p-1 w-20 h-10"
            value={row.cost}
            onChange={(e) =>
              handleCostChange(row, parseInt(e.target.value) as any)
            }
          />
        </div>
      ),
    },
    {
      id: "price",
      name: "سعر البيع",
      cell: (row) => (
        <div>
          <Input
            className="p-1 w-20 h-10"
            value={row.price}
            onChange={(e) =>
              handlePriceChange(row, parseInt(e.target.value) as any)
            }
          />
        </div>
      ),
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
      name: "التحكم",
      cell: (row) => (
       <div className="flex gap-2 items-center">
         <Button onClick={() => handleProductDelete(row)} variant={"link"}>
          <BiSolidTrashAlt
            className={`text-destructive text-lg hover:text-pretty`}
          />
        </Button>
        <Button type="button" onClick={() => handleProductUpdate(row)}>
            تعديل المنتج
          </Button>
       </div>
      ),
    },
  ];
  const methods = useForm();
  const navigate = useNavigate();
  const Submit = (data: any) => {
    const buy_info = selectedProducts.map((item : any) => {
      return {
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        cost: item.cost,
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
        navigate("/pos/order");
      },
    });
  };
  return (
    <PageContainer breadcrumb={[{ title: "الشراء من المورد" }]}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(Submit)}>
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex gap-2 items-center">
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
                inputClassName="border-b border-gray-300"
              />
              <RHFTextField
                label="الوصف"
                name="description"
                control={methods.control}
                inputClassName="border-b border-gray-300"
              />
            </div>
            <div
              className={` grid grid-cols-5  gap-4  max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 px-2`}
            >
              {data?.data?.map((product: any, index: number) => (
                <div
                  onClick={() => {
                    handleProductSelect({ ...product, quantity: 1 });
                  }}
                  key={index}
                  className="p-5 my-2 flex-grow  bg-white h-fit rounded-xl cursor-pointer transition-all drop-shadow-lg items-center justify-center flex flex-col gap-4"
                >
                  <p className="text-md">{product?.name}</p>
                  <img
                    className="w-[90px] h-[70px] rounded-lg my-6"
                    src={`${BASE_URL_IMG}/${product.images[0]?.id}/${product.images[0]?.file_name}`}
                  />
                  <div className="w-full">
                    <div className="flex w-full  flex-col text-xl">
                      <p className="text-sm">{product.product_category.name}</p>
                      <span className="text-sm text-gray-600">
                        السعر:{product.price}
                      </span>
                      <span className="text-sm text-gray-600">
                        الكلفة:{product.cost}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedProducts?.length > 0 && (
              <div className="flex flex-col">
                <Table
                  width="500px"
                  table={{
                    columns: cols,
                    data: selectedProducts ?? [],
                  }}
                  background="background"
                />
                <p>سعر البيع الاجمالي :{totalPrice}</p>
                <p> سعر الشراء الاجمالي :{totalCost}</p>
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="rounded-md w-full"
            disabled={isPending}
          >
            اضافة
          </Button>
        </form>
      </Form>
    </PageContainer>
  );
};

export default SellItem;
