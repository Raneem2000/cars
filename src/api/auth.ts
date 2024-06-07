const AddPrefix = (url: string) => "/dashboard" + url;

const auth = {
  login: AddPrefix(`/login`),
};

export default auth;
