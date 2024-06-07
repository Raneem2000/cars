const AddPrefix = (url: string) => "/dashboard" + url;

const taxMan = {
  index: AddPrefix(`/getTaxMan`),
  indexLog: AddPrefix(`/getTaxLog`),
  indexDelivery: AddPrefix(`/getDeliveryCost`),
  
  buttons: {
    add: AddPrefix(`/createTaxMan`),
    addLog: AddPrefix(`/createTaxLog`),
    addDelivery: AddPrefix(`/createDeliveryCost`),
    update: (id: string | number) => AddPrefix(`/updateTaxMan/${id}`),
    updateDelivery: (id: string | number) => AddPrefix(`/updateDeliveryCost/${id}`),
    updateLog: (id: string | number) => AddPrefix(`/updateTaxLog/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteTaxMan/${id}`),
    deleteDelivery: (id: string | number) => AddPrefix(`/deleteDeliveryCost/${id}`),
    deleteLog: (id: string | number) => AddPrefix(`/DeleteTaxLog/${id}`),
  },
  show: (id: string) => AddPrefix(`getTaxManById/${id}`),
};

export default taxMan;
