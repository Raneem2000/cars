import { PageContainer } from "@/components/containers";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ContainerSellItem from "./ContainerSellItem";
import ModalDetails from "./ModalDetails";
import { useParams } from "react-router-dom";

const Sells = () => {
  
  const { data, isFetching } = useQuery({
    queryKey: ["get-prod"],
    queryFn: async () => {
      const { data } = await axios.get(`/getProduct`);
      return data.data;
    },
  });
  const [selectedProduc, setSelectedProduc] = useState<any>();
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [open, setOpen] = useState<boolean>();
  const [totalPrice, setTotalPrice] = useState(
    selectedProducts ? selectedProducts[0]?.price : 0
  );
  const calculateTotalPrice = (products: any) => {
    const totalPrice = products.reduce((sum : any, product : any) => {
      return sum + product.price * product.quantity;
    }, 0);

    setTotalPrice(totalPrice);
  };
 
  return (
    <PageContainer breadcrumb={[{ title: "المبيعات" }]}>
      <div className="w-full flex gap-4 items-start max-[560px]:flex-col">
        <ContainerSellItem
          calculateTotalPrice={calculateTotalPrice}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
        <div
          className={` grid grid-cols-4 w-full gap-4 max-xl:grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 px-2`}
        >
          {data?.data?.map((product: any, index: number) => (
            <div
              onClick={() => {
                setSelectedProduc({ ...product });
                setOpen(true);
              }}
              key={index}
              className="p-3 my-2 w-full  bg-white h-fit rounded-xl cursor-pointer transition-all drop-shadow-lg items-center justify-center flex flex-col gap-4"
            >
              <p className="text-md">{product?.name}</p>
              <img
                className="w-[90px] h-[70px] rounded-lg mt-2"
                src={`${BASE_URL_IMG}/${product.images[0]?.id}/${product.images[0]?.file_name}`}
              />
              <div className="w-full">
                <div className="flex w-full  flex-col text-xl">
                  <p className="text-sm">{product.product_category.name}</p>
                  <span className="text-sm text-gray-600">السعر:{product.price}</span>
                  <span className="text-sm text-gray-600">الكلفة:{product.cost}</span>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalDetails
        calculateTotalPrice={calculateTotalPrice}
        selectedProducts={selectedProducts}
        setSelectedProduc={setSelectedProduc}
        setSelectedProducts={setSelectedProducts}
        Product={selectedProduc!}
        open={open!}
        setOpen={setOpen}
      />
    </PageContainer>
  );
};

export default Sells;
