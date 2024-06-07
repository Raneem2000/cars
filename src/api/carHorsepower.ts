const AddPrefix = (url: string) => "/dashboard" + url;

const carHorsepower = {
  index: AddPrefix(`/getCarHorsepower`),
  buttons: {
    add: AddPrefix(`/createCarHorsepower`),
    update: AddPrefix(`/updateCarHorsepower`),
    delete: (id: string | number) => AddPrefix(`/deleteCarHorsepower/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default carHorsepower;
