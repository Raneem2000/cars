const AddPrefix = (url: string) => "/dashboard" + url;

const Buy = {
  index: AddPrefix(`/getCarColor`),
  buttons: {
    add: AddPrefix(`/createBuy`),
    update: AddPrefix(`/updateCarColor`),
    delete: (id: string | number) => AddPrefix(`/DeleteCarColor/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default Buy;
