import { PageContainer } from "@/components/containers";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AddCustomers from "./AddCustomers";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { FiEdit } from "react-icons/fi";
import { DeleteModal } from "@/components/dialog";

const Customers = () => {
  const [selectedRow, setSelectedRow] = useState<any>();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-customer"],
    queryFn: async () => {
      const { data } = await axios.get(`/getCustomer`);
      return data.data;
    },
  });
  // console.log(data?.data)
  const [open, setOpen] = useState(false);
  return (
    <PageContainer breadcrumb={[{ title: "الزبائن" }]}>
      <div className="flex justify-end w-full my-4">
        <Button onClick={() => setOpen(true)}>اضافة زبون</Button>
      </div>
      {isFetching ? (
        <h1 className="text-center text-primary text-xl">جار تحميل البيانات</h1>
      ) : (
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {data?.data?.map((d : any) => (
            <div className="bg-white px-6 py-4 rounded-[30px] shadow flex flex-col justify-center items-center gap-2">
              <img
                src="/src/assets/image/Bitmap.jpg"
                className="w-20 h-20 rounded-full"
              />
              <p className="text-lg">{d.user.name}</p>
              <p className="text-gray-500 text-sm">{d.user.address}</p>
              <p className="text-gray-500 text-sm">{d.user.phone}</p>

              <p className="text-gray-500 text-sm">{d.user.email}</p>
              <div className="flex gap-2 items-center cursor-pointer">
                <FiEdit
                  onClick={() => {
                    setOpen(true);
                    setSelectedRow(d);
                  }}
                  className=" text-gray-600 text-2xl  h-full p-1 "
                />
                <DeleteModal
                  MassegeSuccess="تم الحذف بنجاح"
                  apiPath={`/deleteCustomer/${d.id}`}
                  refetch={refetch}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <AddCustomers
        setSelectedRow={setSelectedRow}
        formValues={selectedRow}
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedRow(null);
        }}
      />
    </PageContainer>
  );
};

export default Customers;
