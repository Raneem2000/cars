import Status from "@/components/component/Status";
import { PageContainer } from "@/components/containers";
import { Table } from "@/components/ui/Layout";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import moment from "moment";
import { TableColumn } from "react-data-table-component";
import { DeleteModal } from "@/components/dialog";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const OrdersSell = () => {
  const navigate = useNavigate()
  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: "المعرف",
      cell: (row) => <div className="text-sm">{row.id}</div>,
    },
    {
      id: "name",
      name: "السعر الاجمالي",
      cell: (row) => <div className="text-sm">{row.total_price}</div>,
    },
    {
      id: "name",
      name: "الزبون",
      cell: (row) => <div className="text-sm">{row?.customer?.user?.name}</div>,
    },
    {
      id: "name",
      name: "التاريخ",
      cell: (row) => (
        <div className="text-sm">
          {moment(row.created_at).format("YYYY/MM/DD")}
        </div>
      ),
    },
    {
      id: "name",
      name: "الحالة",
      cell: (row) => (
        <div>
          <Status variant={row.status} />
        </div>
      ),
    },
    {
      id: "name",
      name: "التحكم",
      cell: (row) => (
        <div className="bg-[#FAFBFD] border cursor-pointer p-1  h-[30px] border-[#D5D5D5] rounded-lg flex items-center ">
          <FiEdit
            onClick={() => navigate(`/sell/${row.id}`)}
            className=" text-gray-600 text-2xl  h-full p-1 border-e border-[#D5D5D5]"
          />
          
          <DeleteModal
            MassegeSuccess="تم الحذف بنجاح"
            apiPath={`/deleteSellItem/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-SellItem"],
    queryFn: async () => {
      const { data } = await axios.get(`/getSellItem`);
      return data.data;
    },
  });
  console.log(data);
  const [date, setDate] = React.useState<any>(new Date());
  const [selectedFilters, setSelectedFilters] = React.useState<any>([]);

  const handleFilterSelection = (filter: any) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(
        selectedFilters.filter((item: any) => item !== filter)
      );
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  const filterButtons = [
    { label: "Completed", value: "Completed" },
    { label: "Processing", value: "Processing" },
    { label: "Rejected", value: "Rejected" },
    { label: "On Hold", value: "On Hold" },
    { label: "In Transit", value: "In Transit" },
  ];
  const [expandedRows, setExpandedRows] = useState<any>();
  const handleRowExpand = (row: any) => {
    const isRowExpanded = expandedRows.includes(row.id);
    const newExpandedRows = isRowExpanded
      ? expandedRows.filter((id: any) => id !== row.id)
      : [...expandedRows, row.id];
    setExpandedRows(newExpandedRows);
  };
  const filteredData =
    selectedFilters.length > 0
      ? data.filter((item : any) => selectedFilters.includes(item.status))
      : data;

 
  return (
    <PageContainer
      breadcrumb={[{ title: "الطلبيات" }]}
      className="overflow-x-hidden"
    >
      
      <div className="w-full rounded-lg bg-white shadow">
        <Table
          table={{
            columns: cols,
            data: data?.data ?? [],
            loading:isFetching
          }}
        />
      </div>
    </PageContainer>
  );
};

export default OrdersSell;
