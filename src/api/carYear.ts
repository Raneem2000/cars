const AddPrefix = (url: string) => "/dashboard" + url;

const carYear = {
  index: AddPrefix(`/getCarYear`),
  buttons: {
    add: AddPrefix(`/createCarYear`),
    update: AddPrefix(`/updateCarYear`),
    delete: (id: string | number) => AddPrefix(`/deleteCarYear/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default carYear;
