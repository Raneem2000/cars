const AddPrefix = (url: string) => "/dashboard" + url;

const firstCheack = {
  index: AddPrefix(`/getFistCheack`),
  buttons: {
    add: AddPrefix(`/createFistCheack`),
    update:(id: string | number) => AddPrefix(`/updateFistCheack/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteFistCheack/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default firstCheack;
