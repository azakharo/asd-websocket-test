import axios from 'axios';

const BASE_URL = 'https://reqres.in';

export default class ApiService {
  static axi = axios.create();

  //---------------------------------------------------------------------------
  // Initialization

  static requestInterceptor = null;

  static responseInterceptor = null;

  static init(/* unauthCallback */) {
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
      response => {
        // if (not authorized here or in the error handler) {
        //   const {data} = response;
        //   const {
        //     extract some data
        //   } = data;
        //
        //   if (INVALID_SESSION) {
        //     unauthCallback();
        //   }
        //
        //   throw normalizedError;
        // }

        return response;
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

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Auth

  static async login(username, password) {
    let response;

    try {
      // For successful login use:
      // "username": "eve.holt@reqres.in",
      // "password": "cityslicka"
      response = await ApiService.axi.post(`${BASE_URL}/api/login`, {
        email: username,
        password,
      });
    } catch (error) {
      const errorData = error.response.data;
      const message = errorData.error;

      throw new Error(message);
    }

    // Get something from the response's data or headers
    // Store it in ApiService if necessary for later usage

    const {token} = response.data;

    return {
      name: 'alexey',
      token,
    };
  }

  static logout() {
    return Promise.resolve();
  }

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
