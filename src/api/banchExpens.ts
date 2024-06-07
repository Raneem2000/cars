const AddPrefix = (url: string) => "/dashboard" + url;

const banchExpens = {
  index: (id: string | number) => AddPrefix(`/getBranchExpens?branch_id=${id}`),
  buttons: {
    add: AddPrefix(`/createBranchExpens`),
    update: (id: string | number) => AddPrefix(`/updateBranchExpens/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteBranchExpens/${id}`),
  },
  show: (id: string) => AddPrefix(`/getBranchExpensById/${id}`),
};

export default banchExpens;
