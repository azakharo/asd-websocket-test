import axios from 'axios';

const BACKEND_BASE_URL = 'https://work.vint-x.net';
const ACCESS_TOKEN_HEADER_NAME = 'x-test-app-jwt-token';

export default class ApiService {
  static axi = axios.create();

  //---------------------------------------------------------------------------
  // Initialization

  static requestInterceptor = null;

  static responseInterceptor = null;

  static init(unauthCallback) {
    // Add a request interceptor
    ApiService.requestInterceptor = ApiService.axi.interceptors.request.use(
      config => {
        // const url = config.url;
        //
        // if (something) {
        //   // Disable the following rule because need to update request data
        //   /* eslint-disable-next-line no-param-reassign */
        //   config.data = {
        //     ...config.data,
        //     ...something,
        //   };
        // }

        return config;
      },
    );

    // Add a response interceptor
    ApiService.responseInterceptor = ApiService.axi.interceptors.response.use(
      response => response,
      error => {
        if (error?.response.status === 401) {
          unauthCallback();
        }
      },
    );
  }

  static uninit() {
    if (ApiService.requestInterceptor) {
      ApiService.axi.interceptors.request.eject(ApiService.requestInterceptor);
      ApiService.requestInterceptor = null;
    }

    if (ApiService.responseInterceptor) {
      ApiService.axi.interceptors.response.eject(
        ApiService.responseInterceptor,
      );
      ApiService.responseInterceptor = null;
    }

    // AZA:
    // Looks like the ejects above do not work.
    // So, recreate axios instance from scratch.
    ApiService.axi = axios.create();
  }

  static setAccessToken(token) {
    if (token) {
      ApiService.axi.defaults.headers.common[ACCESS_TOKEN_HEADER_NAME] = token;
    }
  }

  static clearAccessToken() {
    delete ApiService.axi.defaults.headers.common[ACCESS_TOKEN_HEADER_NAME];
  }

  // Initialization
  //---------------------------------------------------------------------------

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Auth

  static async login(username, password) {
    let response;

    try {
      response = await ApiService.axi.post(`${BACKEND_BASE_URL}/api/login`, {
        username,
        password,
      });
    } catch (error) {
      const errorData = error.response.data;
      const message = errorData.description;

      throw new Error(message);
    }

    const token = response.headers[ACCESS_TOKEN_HEADER_NAME.toLowerCase()];
    ApiService.setAccessToken(token);

    return {
      name: username,
      token,
    };
  }

  static logout() {
    ApiService.clearAccessToken();
    return Promise.resolve();
  }

  // Auth
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //= =======================================
  // Request cancellation

  static createCancelToken() {
    const {CancelToken} = axios;

    return CancelToken.source();
  }

  static isRequestCancelled(error) {
    return axios.isCancel(error);
  }

  // Request cancellation
  //= =======================================
}
