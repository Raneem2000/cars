const AddPrefix = (url: string) => "/dashboard" + url;

const Brand = {
 index: AddPrefix(`/getBrand`),
 name:AddPrefix(`/getBrandName`),
  buttons: {
    add: AddPrefix(`/createBrand`),
     update: (id: string | number) => AddPrefix(`/updateBrand/${id}`),
    delete: (id: string | number) => AddPrefix(`/deleteBrand/${id}`),
  },
  show: (id: string) => AddPrefix(`/${id}`),
};

export default Brand;
