const AddPrefix = (url: string) => "/dashboard" + url;

const Order = {
  index:(id: string | number) => AddPrefix(`/getSellItem/${id}`),
  indexService: AddPrefix(`/getCarInfoLog/`),
  buttons: {
    add:  AddPrefix(`/createCarCompany`),
    update: (id: string | number) => AddPrefix(`/updateCarCompany/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteCarCompany/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default Order;
