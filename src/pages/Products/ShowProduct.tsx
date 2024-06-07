import { PageContainer } from "@/components/containers";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FaStar } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios, { BASE_URL_IMG } from "@/lib/axios";
const ShowProduct = () => {
  const { id } = useParams();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-prod"],
    queryFn: async () => {
      const { data } = await axios.get(`/getProductById/${id}`);
      return data.data;
    },
  });
  const { data: Brands } = useQuery({
    queryKey: ["get-Brand"],
    queryFn: async () => {
      const { data } = await axios.get(`/getBrand`);
      return data.data;
    },
  });
  const { data: Category } = useQuery({
    queryKey: ["get-prod-cat"],
    queryFn: async () => {
      const { data } = await axios.get(`/getProductCategory`);
      return data.data;
    },
  });
  console.log(data);
  return (
    <PageContainer breadcrumb={[{ title: "تفاصيل المنتج" }]}>
      <div className="flex gap-8 items-start ">
        <div className="flex flex-col gap-4 w-full ">
          <div className="grid grid-cols-3 gap-2">
              {data?.product?.images.map((g: any) => (
                <img
                  className="w-40  h-40  rounded-lg"
                  src={`${BASE_URL_IMG}/${g.id}/${g.file_name}`}
                />
              ))}
          </div>
          <div className="bg-white p-4 rounded-lg flex justify-between shadow items-center">
            <p>Status</p>
            <Switch dir="ltr" checked={data?.product?.is_active === 1} />
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-4">
          <div className="bg-white rounded shadow p-4 flex flex-col gap-2 ">
            <h1 className="text-2xl font-semibold">{data?.product?.name}</h1>
            <div className="flex gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < data?.product?.evaluation
                        ? "text-[#FBAD39]"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-lg mt-4">
              {data?.product?.description}
            </p>
            <div className="flex flex-col ">
              <p>سعر المنتج: {data?.product?.price}</p>
              <p>سعر الحسم: {data?.product?.price_discount}</p>
              <p>تكلفة الشراء: {data?.product?.cost}</p>
              <p>الكمية : {data?.product?.quantity}</p>

              <p>
                الماركة:{" "}
                {Brands?.find((d : any) => d.id === data?.product?.brand_id)?.name}
              </p>
              <p>
                الصنف:{" "}
                {
                  Category?.find(
                    (d : any) => d.id === data?.product?.product_category_id
                  )?.name
                }
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <Button className="w-full">Edit</Button>
            <Button className="w-full" variant={"cancel"}>
              Delete
            </Button>
          </div>
        </div>
      </div>
      
    </PageContainer>
  );
};

export default ShowProduct;
