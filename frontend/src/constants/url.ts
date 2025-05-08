const baseUrl = 'http://localhost:3200';
const imageUrl = 'https://mebliok-bucket.s3.us-east-1.amazonaws.com/';

const urlBuilder = {
  extraInfo: {
    base: baseUrl + '/extra-info',
    shippingInfo: (): string => urlBuilder.extraInfo.base + '/getShippingInfo',
  },
  furniture: {
    base: baseUrl + '/furniture',
    getAllFurniture: (): string => urlBuilder.furniture.base + '/getAllFurniture?currency=UAH', //todo Pagination
  },
  category: {
    base: baseUrl + '/categories',
    getCategories: (): string => urlBuilder.category.base + '/getCategoriesFurniture',
  },
};

const authUrlBuilder = {
  jwtAuth: {
    base: baseUrl + '/auth',
    signIn: (): string => authUrlBuilder.jwtAuth.base + '/sign-in',
    signUp: (): string => authUrlBuilder.jwtAuth.base + '/sign-up',
    logOut: (): string => authUrlBuilder.jwtAuth.base + '/log-out',
    refresh: (): string => authUrlBuilder.jwtAuth.base + '/refresh',
  },
  ouath: {
    base: baseUrl + '/auth/google',
    login: (): string => authUrlBuilder.ouath.base + '/login',
    callback: (): string => authUrlBuilder.ouath.base + '/callback',
  },
};
export { baseUrl, urlBuilder, authUrlBuilder, imageUrl };