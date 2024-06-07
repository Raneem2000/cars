import { PageContainer } from "@/components/containers";
import React from "react";
import img1 from "../assets/svgs/Circle 2.svg";
import img2 from "../assets/svgs/ic-trending-up-24px.svg";
import ReactApexChart from "react-apexcharts";
import { TableColumn } from "react-data-table-component";
import { Table } from "@/components/ui/Layout";
const cols: TableColumn<any>[] = [
  {
    id: "name",
    name: "اسم المنتج",
    cell: (row) => <div className="text-sm">{row.name}</div>,
  },
  {
    id: "name",
    name: "العنوان",
    cell: (row) => <div className="text-sm">{row.location}</div>,
  },
  {
    id: "name",
    name: "التاريخ",
    cell: (row) => <div className="text-sm">{row.date}</div>,
  },
  {
    id: "name",
    name: "السعر",
    cell: (row) => <div className="text-sm">{row.price}</div>,
  },
  {
    id: "name",
    name: "الكمية",
    cell: (row) => <div className="text-sm">{row.amount}</div>,
  },
  {
    id: "name",
    name: "الحالة",
    cell: (row) => <div className={`text-sm rounded-xl p-2 text-white ${row.status === "Delivered" ? 'bg-[#00B69B]' :'bg-[#FCBE2D]'}`}>{row.status}</div>,
  },
];
const data = [
  {
    name: "fuel shell Helix ",
    location: "Baghdad, Al-Amin Street",
    date: "12.09.2019 - 12.53 PM",
    price: "423",
    amount: "$34,295",
    status: "Delivered",
  },
  {
    name: "fuel shell Helix ",
    location: "Baghdad, Al-Amin Street",
    date: "12.09.2019 - 12.53 PM",
    price: "423",
    amount: "$34,295",
    status: "Pending",
  },
];
const Dashboard = () => {
  const series = [
    {
      name: "series1",
      data: [1, 40, 28, 51, 42, 109, 10, 80, 30, 33, 100, 1],
      color: "#62D0B6",
    },
  ];
  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl  font-semibold">الصفحة الرئيسية</h1>
        <div className="grid grid-cols-4 max-xl:grid-cols-4 max-md:grid-cols-2 gap-4">
          <div className="bg-white shadow rounded-lg w-fit   p-4 flex justify-center flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-gray-400 my-2">كل المستخدمين</p>
                <p className="text-2xl">40,689</p>
              </div>
              <img src={img1} className="w-14 h-14" />
            </div>
            <p className="text-gray-400 flex items-center gap-2">
              <div className="flex items-center">
                <img src={img2} className="w-5 h-5" />
                <span className="text-[#00B69B]">8.5%</span>
              </div>{" "}
              Up from yesterday
            </p>
          </div>
          <div className="bg-white shadow rounded-lg w-fit   p-4 flex justify-center flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-gray-400 my-2">كل الطلبيات</p>
                <p className="text-2xl">10293</p>
              </div>
              <img src={img1} className="w-14 h-14" />
            </div>
            <p className="text-gray-400 flex items-center gap-2">
              <div className="flex items-center">
                <img src={img2} className="w-5 h-5" />
                <span className="text-[#00B69B]">8.5%</span>
              </div>{" "}
              Up from yesterday
            </p>
          </div>
          <div className="bg-white shadow rounded-lg w-fit   p-4 flex justify-center flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-gray-400 my-2">كل المبيعات</p>
                <p className="text-2xl">$89,000</p>
              </div>
              <img src={img1} className="w-14 h-14" />
            </div>
            <p className="text-gray-400 flex items-center gap-2">
              <div className="flex items-center">
                <img src={img2} className="w-5 h-5" />
                <span className="text-[#00B69B]">8.5%</span>
              </div>{" "}
              Up from yesterday
            </p>
          </div>
          <div className="bg-white shadow rounded-lg w-fit      p-4 flex justify-center flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-gray-400 my-2">كل المعالجات</p>
                <p className="text-2xl">$89,000</p>
              </div>
              <img src={img1} className="w-14 h-14" />
            </div>
            <p className="text-gray-400 flex items-center gap-2">
              <div className="flex items-center">
                <img src={img2} className="w-5 h-5" />
                <span className="text-[#00B69B]">8.5%</span>
              </div>{" "}
              Up from yesterday
            </p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg flex-grow   p-4 flex justify-center flex-col gap-8">
          <h1 className="text-xl  font-semibold">تفاصيل المبيعات</h1>
          <ReactApexChart
            type="area"
            series={series}
            options={{
              chart: { height: 240, type: "area", toolbar: { show: false } },
              fill: {
                gradient: {
                  colorStops: [
                    { color: "#62D0B6", opacity: 0.1, offset: 0 },
                    { color: "white", opacity: 0.1, offset: 100 },
                  ],
                },
              },
              grid: { borderColor: "#D0D5DD" },

              dataLabels: {
                enabled: false,
              },
              stroke: {
                width: 2,
                curve: "smooth",
              },
              yaxis: {
                min: 0,
                max: 200,
                stepSize: 50,
                labels: {
                  offsetX: -10,
                  style: { colors: "#D0D5DD", fontSize: "12px" },
                },
              },

              xaxis: {
                type: "category",
                labels: {
                  style: { colors: "#D0D5DD", fontSize: "12px" },
                },

                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },

              tooltip: {
                x: {
                  format: "dd/MM/yy HH:mm",
                },
              },
            }}
            width={1000}
            height={240}
          />
        </div>

        <div className="bg-white shadow rounded-lg flex-grow   p-4 flex justify-center flex-col gap-8">
          <h1 className="text-xl  font-semibold">التفاصيل اليومية</h1>
          <Table
            table={{
              columns: cols,
              data: data,
            }}
            customStyles={{
              table: {
                style: {
                  background: "#fff",
                  width: "100%",
                },
              },
              headRow: {
                style: {
                  background: " #F1F4F9",
                  padding: "0",

                  borderRadius: "10px",
                },
              },
              headCells: {
                style: {
                  color: "#333",
                  background: " #F1F4F9",
                  fontWeight: "400",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "center",
                  padding: "0",
                  width: "fit-content",
                },
              },
              cells: {
                style: {
                  color: "#1D1F1F",
                  fontWeight: "400",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "center",
                  padding: "0",
                  width: "fit-content",
                },
              },
            }}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
