const AddPrefix = (url: string) => "/dashboard" + url;

const branch = {
  index: AddPrefix(`/getBranch`),
  indexRate: AddPrefix(`/getTotalBranch`),
  
  getAdmin: AddPrefix(`/getBranchAdmin`),
  
  getBranchInformation:(id: string | number) => AddPrefix(`/getBranchInformation/${id}`),
  getServiceAdmin:(id: string | number) => AddPrefix(`/getServiceAdmin/${id}`),
  getServiceAdminName: (id: string | number) => AddPrefix(`/getServiceAdminName/${id}`),
  getServiceMan: (id: string | number) => AddPrefix(`/getServiceMan/${id}`),
  getServiceManName:(id: string | number) => AddPrefix(`/getServiceManName/${id}`),
  
  dataForCreate: AddPrefix(`/dataForCreateBranch`),
  branchName: AddPrefix(`/getBranchName`),
 
  buttons: {
    add: AddPrefix(`/createBranch`),
    orderFormOtherBranch: AddPrefix(`/orderFromOtherBranch`),
    AddServiceAdmin:AddPrefix(`/createServiceAdmin`),
    AddServiceMan:AddPrefix(`/createServiceMan`),
    addAdmin: AddPrefix(`/createBranchAdmin`),
    UpdateProductInBranch:(id: string | number) =>AddPrefix(`/updateProductBranch/${id}`),
    update: (id: string | number) => AddPrefix(`/updateBranch/${id}`),
    updateAdmin: (id: string | number) => AddPrefix(`/updateBranchAdmin/${id}`),
    updateServiceAdmin: (id: string | number) => AddPrefix(`/updateServiceAdmin/${id}`),
    updateServiceMan: (id: string | number) => AddPrefix(`/updateServiceMan/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteBranch/${id}`),
    deleteBranchAdmin: (id: string | number) => AddPrefix(`/deleteBranchAdmin/${id}`),
  },
  
  show: (id: string) => AddPrefix(`getBranchExpensById/${id}`),
};

export default branch;
