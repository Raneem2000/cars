const AddPrefix = (url: string) => "/dashboard" + url;

const units = {
  index: (id: string | number) => AddPrefix(`/getUnit/${id}`),
  productUnit: (id: string | number) => AddPrefix(`/getUnitName/${id}`),
  
  buttons: {
    add: AddPrefix(`/createUnit`),
    update: (id: string | number) => AddPrefix(`/updateUnit/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteUnit/${id}`),
  },
  show: (id: string) => AddPrefix(`/getUnitById/${id}`),
};

export default units;
