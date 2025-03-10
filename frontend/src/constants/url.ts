const baseUrl = 'http://localhost:3200';

const urlBuilder = {
  extraInfo: {
    base: baseUrl + '/extra-info',
    shippingInfo: (): string => urlBuilder.extraInfo.base + '/getShippingInfo',
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
  }
}
export { baseUrl, urlBuilder, authUrlBuilder };