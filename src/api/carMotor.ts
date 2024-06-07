const AddPrefix = (url: string) => "/dashboard" + url;

const CarMode = {
  index: AddPrefix(`/getCarMotor`),
  buttons: {
    add: AddPrefix(`/createCarMotor`),
    update: AddPrefix(`/updateCarMotor`),
    delete: (id: string | number) => AddPrefix(`/deleteCarMotor/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default CarMode;
