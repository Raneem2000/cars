import { FC, useState } from "react";

import { BiSolidTrashAlt } from "react-icons/bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import axios from "@/lib/axios";
import { FaCheckCircle } from "react-icons/fa";
const AcceptOrder: FC<{
  refetch?: () => void;
  id: number;
  className?: string;
  key?: string;
}> = ({ id, refetch }) => {
  const queryClient = useQueryClient()
  const [openModal, setOpenModal] = useState(false);
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`acceptOrder/${id}`);
      return res;
    },
    onSuccess: () => {
      toast("تم قبول الطلبية");
      setOpenModal(false);
      refetch?.();
      queryClient.refetchQueries({ queryKey: ["get-Buy"] });
    },
    onError: (errorMessage: any) => {
      toast.error(errorMessage);
    },
  });
  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <>
    <FaCheckCircle 
    onClick={() => setOpenModal(true)}
    className="text-primary text-xl "
    />
      {/* <Button className="text-sm p-2" onClick={() => setOpenModal(true)}>قبول الطلبية</Button> */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="flex flex-col items-center justify-center ">
          <h1 className="text-lg font-md mb-6">قبول الطلبية...?</h1>
          <div className="flex w-full gap-6">
            <Button
              className="flex-grow"
              variant={"cancel"}
              onClick={() => setOpenModal(false)}
            >
              إلغاء
            </Button>
            <Button
              className="flex-grow"
              onClick={handleDelete}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "الرجاء الانتظار" : "قبول"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AcceptOrder;
