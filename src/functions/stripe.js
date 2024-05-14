import axios from 'axios';

export const createPaymentIntent = async (authtoken, coupon) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/create-payment-intent`,
      { couponApplied: coupon },
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