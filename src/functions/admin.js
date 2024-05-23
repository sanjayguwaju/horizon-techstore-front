// admin.js

import { axiosRequest } from '../utils/axiosUtils';

export const getOrders1 = (authtoken) => axiosRequest('get', '/admin/orders', null, authtoken);
export const changeStatus1 = (orderId, orderStatus, authtoken) => axiosRequest('put', '/admin/order-status', { orderId, orderStatus }, authtoken);

import axios from "axios";

export const getOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authtoken,
    },
  });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authtoken,
      },
    }
  );
