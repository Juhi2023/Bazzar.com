import axios from "axios";
import { decryptData, encryptData } from "../utils/crypto";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.defaults.headers = {
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  //'Expires': '0',
};


//- Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    console.log("config", config.data);
    //- Do something before request is sent
    if (config.data) {
      const { data } = config.data
      if (config.data instanceof FormData === false) {
        config.data = { data: { newData: encryptData(data) } };
      }else{
        config.headers['Content-Type'] = `multipart/form-data`;
      }
    }
    return config;
  },
  function (error) {
      //- Do something with request error
      return Promise.reject(error);
  }
);

//- Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
      console.log("interceptorresponse", response);

      //- return response;
      return decryptData(response.data);
  },
  function (error) {
      return Promise.reject(error);
  }
);

export default axiosInstance;