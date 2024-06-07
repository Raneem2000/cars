const AddPrefix = (url: string) => "/dashboard" + url;

const suppliers = {
  index: AddPrefix(`/getSupplier`),
  supplierName:AddPrefix(`/getSupplierName`),
  buttons: {
    add: AddPrefix(`/createSupplier`),
    update: (id: string | number) => AddPrefix(`/updateSupplier/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteSupplier/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default suppliers;
