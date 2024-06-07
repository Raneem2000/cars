import Axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-hot-toast";
export const BASE_URL_IMG = `https://carstore.htc-company.com/car-store/getImage`
// export const BASE_URL_IMG = `http://127.0.0.1:8000/media`;

const axios: AxiosInstance = Axios.create({
  baseURL: "https://carstore.htc-company.com/car-store/api/dashboard",
  // baseURL: "http://127.0.0.1:8000/api/dashboard",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");

  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.message === "Network Error") {
      toast.error("Check your internet connection");
    } else if (+error?.response?.status === 404) {
      //404
      toast.error("The requested data hasn't been found");
      // notFound();
    } else if (+error?.response?.status === 401) {
      //401
      toast.error("You have no permission to access this data");
      localStorage.setItem("token", "");
      window.location.replace("/login");
      if (typeof window !== "undefined") window.location.replace("/login"); //redirect("/login");
    } else if (+error?.response?.status === 403) {
      //403
      toast.error("Accessing this data is forbidden");
      localStorage.setItem("token", "");
      window.location.replace("/login");
      // if (typeof window !== 'undefined') window.location.replace('/')
    } else if (+error?.response?.status === 500) {
      //500
      toast.error(error?.response?.data?.message);
    } else if (+error?.response?.status === 422) {
      //422
      toast.error(error?.response?.data?.message);
    } else toast.error("Unknown error occurred");
    return Promise.reject(error);
  }
);

export default axios;
