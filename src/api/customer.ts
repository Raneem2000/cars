const AddPrefix = (url: string) => "/dashboard" + url;

const customer = {
  index: AddPrefix(`/getCustomer`),
  name: AddPrefix(`/getCustomerName`),
  nameWithCar: AddPrefix(`/getCustomerNameWithCar`),
  getReceipt: AddPrefix(`/getReceipt`),
  getReceiptSup: AddPrefix(`/getReceiptSup`),
  getReceiptTax: AddPrefix(`/getReceiptTax`),
  customerCar: (id: string | number) => AddPrefix(`/getCustomerCar/${id}`),
  dataForCreateCustomerCar:  AddPrefix(`/dataForCreateCustomerCar`),
  
  buttons: {
    add: AddPrefix(`/createCustomer`),
    createReceipt: AddPrefix(`/createReceipt`),
    addCar: AddPrefix(`/createCustomerCar`),
    update: (id: string | number) => AddPrefix(`/updateCustomer/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteCustomer/${id}`),
  },
  show: (id: string) => AddPrefix(`getCustomerById/${id}`),
};

export default customer;
