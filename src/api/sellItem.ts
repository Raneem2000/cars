const AddPrefix = (url: string) => "/dashboard" + url;

const sellItem = {
  index: AddPrefix(`/getSellItem`),
  dataForSellItem:AddPrefix(`/dataForSellItem`),
  buttons: {
    add: AddPrefix(`/createSellItem`),
    createFastSellFromDash: AddPrefix(`/createFastSellFromDash`),
    
    updateSellItemService: (id: string | number) => `/updateSellItemService/${id}`,
    update: (id: string | number) => `/updateSellItem/${id}`,
    delete: (id: string | number) => AddPrefix(`/deleteProduct/${id}`),
  },
  show: (id: string|number) => AddPrefix(`/getProductAllDataById/${id}`),
};

export default sellItem;
