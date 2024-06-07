const AddPrefix = (url: string) => "/dashboard" + url;

const Service = {
  index:(id: string | number) => AddPrefix(`/getServiceById/${id}`),
  indexAll:AddPrefix(`/getService`),
  getServiceRate:AddPrefix(`/getServiceRate`),

  
  buttons: {
    add: AddPrefix(`/createService`),
    update:(id: string | number) => AddPrefix(`/updateService/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteService/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default Service;
