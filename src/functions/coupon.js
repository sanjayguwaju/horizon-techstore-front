import axios from "axios";

export const getCoupons = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/coupons`);
    return response;
  } catch (error) {
    console.error("Error getting coupons", error);
    // Handle the error in some way, e.g., throw it, return a default value, etc.
    throw error;
  }
};

export const removeCoupon = async (couponId, authtoken) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
      headers: {
        authtoken,
      },
    });
    return response;
  } catch (error) {
    console.error("Error removing coupon", error);
    // Handle the error in some way, e.g., throw it, return a default value, etc.
    throw error;
  }
};

export const createCoupon = async (coupon, authtoken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/coupon`,
      { coupon },
      {
        headers: {
          authtoken,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating coupon", error);
    // Handle the error in some way, e.g., throw it, return a default value, etc.
    throw error;
  }
};
