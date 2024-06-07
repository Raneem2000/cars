import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RiCoinsLine, RiHome2Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { IconType } from "react-icons/lib";
import { ReactNode } from "react";
import { SettingsIcons } from "@/assets/svgs";
import home from "../assets/svgs/home-2.svg";
import pos from "../assets/svgs/shopping-cart.svg";
import Order from "../assets/svgs/Purchase Order.svg";
import product from "../assets/svgs/product.svg";
import cat from "../assets/svgs/Rectangle 3515.svg";
import customers from "../assets/svgs/custmoers.svg";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type NavigationProjectProps = {
  title?: string;
  icon?: ReactNode;
  path: string;
  list?: any;
  titleLink?: string;
  query?: string;
};

export const NavigationProjects: NavigationProjectProps[] = [
  {
    titleLink: "الصفحة الرئيسية",
    icon: <img src={home} className="me-4 w-6" />,
    path: "/",
    query: "",
  },
  {
    title: "المشتريات",
    icon: <img src={pos} className="me-4 w-6" />,
    path: "/pos",
    query: "",
    list: [
      {
        titleLink: "الشراء من المورد",
        path: "/",
        icon: <MdPayment size={"1.5rem"} className="me-4" />,
        query: "",
      },
      {
        titleLink: "المشتريات",
        path: "/order",
        icon: <MdPayment size={"1.5rem"} className="me-4" />,
        query: "",
      },
    ],
  },
  {
    title: "المبيعات",
    icon: <img src={pos} className="me-4 w-6" />,
    path: "/sell",
    query: "",
    list: [
      {
        titleLink: "المبيعات",
        path: "/",
        icon: <MdPayment size={"1.5rem"} className="me-4" />,
        query: "",
      },
    ],
  },
  {
    titleLink: "الطبيات",
    icon: <img src={Order} className="me-4 w-6" />,
    path: "/order",
    query: "",
  },
  {
    titleLink: "المنتجات",
    icon: <img src={product} className="me-4 w-6" />,
    path: "/product",
    query: "",
  },
  {
    titleLink: "التصنيفات",
    icon: <img src={cat} className="me-4 w-6" />,
    path: "/category",
    query: "",
  },
  {
    titleLink: "السائقين",
    icon: <img src={customers} className="me-4 w-6" />,
    path: "/drivers",
    query: "",
  },
  {
    titleLink: "الزبائن",
    icon: <img src={customers} className="me-4 w-6" />,
    path: "/customers",
    query: "",
  },
  {
    title: "السيارات",
    path: "/cars",
    icon: <SettingsIcons />,
    list: [
      {
        titleLink: " السيارات",
        path: "/car",
        icon: <MdPayment size={"1.5rem"} className="me-4" />,
        query: "",
      },
      {
        titleLink: "موديلات السيارات",
        path: "/car-model",
        icon: <MdPayment size={"1.5rem"} className="me-4" />,
        query: "",
      },
      {
        titleLink: " سعة المحرك",
        path: "/motor",
        query: "",
      },

      {
        titleLink: " سنة الصنع",
        path: "/carYear",
        query: "",
      },

      {
        titleLink: "شركات السيارات",
        path: "/car-company",
        icon: <MdPayment size={"1.5rem"} className="me-4" />,
        query: "",
      },
      {
        titleLink: "الوان السيارات",
        path: "/car-color",
        icon: <MdPayment size={"1.5rem"} className="me-4" />,
        query: "",
      },
    ],
  },
  {
    titleLink: "أنواع الموظفين",
    icon: <img src={customers} className="me-4 w-6" />,
    path: "/employee-type",
    query: "",
  },
  {
    titleLink: "الماركات التجارية",
    icon: <img src={customers} className="me-4 w-6" />,
    path: "/brand",
    query: "",
  },
  {
    titleLink: "الموردين",
    icon: <img src={customers} className="me-4 w-6" />,
    path: "/supplier",
    query: "",
  },
];
