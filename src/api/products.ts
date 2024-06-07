const AddPrefix = (url: string) => "/dashboard" + url;

const product = {
  index: AddPrefix(`/getProduct`),
  indexById:(id: string | number) => AddPrefix(`/getProductById/${id}`),
  indexSellById:(id: string | number) => AddPrefix(`/getSellItemById/${id}`),
  productBranch: (id: string | number) => AddPrefix(`/getProductBranch/${id}`),
  branchOrders: (id: string | number) => AddPrefix(`/getBranchOrders/${id}`),
  senderOrders: (id: string | number) => AddPrefix(`/getSenderOrders/${id}`),
  accebtSenderOrders: (id: string | number) => AddPrefix(`/accebtSenderOrders/${id}`),
  accebtBranchOrders: (id: string | number) => AddPrefix(`/accebtBranchOrders/${id}`),
  fillterData: AddPrefix(`/getFillterData`),
  fillterDataService: AddPrefix(`/getFillterDataService`),
  getBuy: (id: string | number) => AddPrefix(`/getBuy/${id}`),
  
  forCreate:AddPrefix(`/dataForCreate`),
  buttons: {
    add: AddPrefix(`/createProduct`),
    update: (id: string | number) => `/updateProduct/${id}`,
    delete: (id: string | number) => AddPrefix(`/deleteProduct/${id}`),
    accebtOrder: (id: string | number) => AddPrefix(`/accebtOrder/${id}`),
    addToStore: (id: string | number) => AddPrefix(`/addToStore/${id}`),
    
  },
  show: (id: string|number) => AddPrefix(`/getProductById/${id}`),
};

export default product;
