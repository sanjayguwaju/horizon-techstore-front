// utils/axiosUtils.js

import axios from "axios";

export const axiosConfig = (authtoken) => ({
  headers: {
    authtoken,
  },
});

export const axiosRequest = async (method, url, data = null, authtoken ) => {
    console.log({
        method: method,
        url: url,
        data: data,
        authtoken: authtoken
    })
  try {
    const response = await axios({
      method,
      url: `${process.env.REACT_APP_API}${url}`,
      data,
      ...axiosConfig(authtoken),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
