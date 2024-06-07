import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";



export const CustmersSelect = () => {
    const Query = useQuery({
        queryKey: ["get-customer"],
        queryFn: async () => {
            const { data } = await axios.get(`/getCustomer`);
            return data.data;
        },
        select: (data) =>
            data?.data?.map((data: any) => ({
                id: data.id,
                name: data.user.name,
            })),
    });
    return Query

}


export const PayTypeSelect = () => {
    const Query = useQuery({
        queryKey: ["get-pay"],
        queryFn: async () => {
            const { data } = await axios.get(`/getPayType`);
            return data.data;
        },
        select: (data) =>
            data?.map((data: any) => ({
                id: data.id,
                name: data.name,
            })),
    });
    return Query
}