import { PageContainer } from "@/components/containers";
import { DeleteModal } from "@/components/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Carss = () => {
  const [filterValueCompany, setFilterValueCompany] = useState("");
  const [filterValueColor, setFilterValueColor] = useState("");
  const [filterValueMotor, setFilterValueMotor] = useState("");
  const [filterValueModel, setFilterValueModel] = useState("");
  const [filterValueYear, setFilterValueYear] = useState("");

  const [filterValueName, setFilterValueName] = useState("");
  const [filterValueEnd, setFilterValueEnd] = useState("");
  const [filterValueStart, setFilterValueStart] = useState("");

  // console.log(filterValueCompany);
  const {
    data: cars,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      "get-cars",
      filterValueCompany,
      filterValueColor,
      filterValueModel,
      filterValueYear,
      filterValueMotor,
    ],
    queryFn: async () => {
      const { data } = await axios.get(`/getCar`, {
        params: {
          company_name: filterValueCompany,
          color: filterValueColor,
          motor: filterValueMotor,
          model: filterValueModel,
          year: filterValueYear,
        },
      });
      return data.data?.data;
    },
  });
  const { data: car_company_name } = useQuery({
    queryKey: ["get-CarCompany"],
    queryFn: async () => {
      const { data } = await axios.get(`/getCarCompany`);
      return data.data;
    },
  });
  const { data: car_motor_name } = useQuery({
    queryKey: ["get-getCarMotor"],
    queryFn: async () => {
      const { data } = await axios.get(`/getCarMotor`);
      return data.data;
    },
  });
  const { data: car_horsepower } = useQuery({
    queryKey: ["get-CarHorsepower"],
    queryFn: async () => {
      const { data } = await axios.get(`/getCarHorsepower`);
      return data.data;
    },
  });
  const { data: carYearOptions } = useQuery({
    queryKey: ["get-CarYear"],
    queryFn: async () => {
      const { data } = await axios.get(`/getCarYear`);
      return data.data;
    },
  });
  const { data: car_model_name } = useQuery({
    queryKey: ["get-car_model_name"],
    queryFn: async () => {
      const { data } = await axios.get(`/getCarModel`);
      return data.data;
    },
  });

  const { data: color } = useQuery({
    queryKey: ["get-getCarColor"],
    queryFn: async () => {
      const { data } = await axios.get(`/getCarColor`);
      return data.data;
    },
  });

  const cols: TableColumn<any>[] = [
    {
      id: "currency",
      name: "سنة الصنع",
      cell: (row) => <div title={row.value}>{row.year?.name}</div>,
    },
    {
      id: "currency",
      name: "شركة السيارة",
      cell: (row) => <div title={row.value}>{row.company?.name}</div>,
    },
    {
      id: "currency",
      name: "موديل السيارة",
      cell: (row) => (
        <div title={row.value}>
          {car_model_name?.find((d : any) => d.id === row.model_id)?.name}
        </div>
      ),
    },
    {
      id: "currency",
      name: "قوة المحرك",
      cell: (row) => <div title={row.value}>{row.motor?.name}</div>,
    },

    {
      id: "currency",
      name: "لون السيارة",
      cell: (row) => <div title={row.value}>{row.color?.name}</div>,
    },
    {
      id: "actions",
      name: "التحكم",
      cell: (row) => (
        <div className="flex gap-2 justify-center  items-center text-center cursor-pointer">
          <DeleteModal
            MassegeSuccess="تم الحذف بنجاح"
            apiPath={`/deleteCar/${row.id}`}
            refetch={refetch}
          />
          <FaEye
            className="text-xl"
            onClick={() => navigate(`/ProductsCar/${row.id}`)}
          />
        </div>
      ),
    },
  ];
  const navigate = useNavigate();
  return (
    <PageContainer breadcrumb={[{ title: "السيارات" }]}>
      <div className="w-full flex justify-end my-4">
        <Button onClick={() => navigate("/product/add")}>اضافة سيارة</Button>
      </div>
      <div className="flex w-full gap-2 mb-4">
        <div className="flex flex-col w-full gap-2">
          <Label>شركة السيارة</Label>
          <select
            onChange={(value) => setFilterValueCompany(value.target.value)}
            className=" bg-white p-2 border border-gray-300 rounded-lg w-full"
          >
            <option>اختر شركة سيارة</option>
            {car_company_name?.map((company : any) => (
              <option key={company.id} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>لون السيارة</Label>
          <select
            onChange={(value) => setFilterValueColor(value.target.value)}
            className="bg-white p-2 border border-gray-300 rounded-lg w-full"
          >
            <option>اختر لون سيارة</option>
            {color?.map((company : any) => (
              <option key={company.name} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>موديل السيارة</Label>
          <select
            onChange={(value) => setFilterValueModel(value.target.value)}
            className="w-full bg-white p-2 border border-gray-300 rounded-lg"
          >
            <option>اختر لون السيارة</option>
            {car_model_name?.map((company : any) => (
              <option key={company.name} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full gap-2">
          <Label>قوة المحرك</Label>
          <select
            onChange={(value) => setFilterValueMotor(value.target.value)}
            className="w-full bg-white p-2 border border-gray-300 rounded-lg"
          >
            <option>اختر قوة محرك</option>
            {car_motor_name?.map((company : any) => (
              <option key={company.name} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>سنة الصنع</Label>
          <select
            onChange={(value) => setFilterValueYear(value.target.value)}
            className="w-full bg-white p-2 border border-gray-300 rounded-lg"
          >
            <option>اختر سنة الصنع </option>
            {carYearOptions?.map((company : any) => (
              <option key={company.name} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <DataTable progressPending={isFetching} columns={cols} data={cars} />
    </PageContainer>
  );
};

export default Carss;
