import axios from 'axios';

export const createPaymentIntent = async (authtoken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/create-payment-intent`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("error", err);
  }
};