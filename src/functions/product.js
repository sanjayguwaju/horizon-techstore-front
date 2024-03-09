import axios from "axios";

export const createProduct = async (product, authtoken) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/product`, product, {
      headers: {
        authtoken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating category', error);
    throw error;
  }
}


export const getProductsByCount = async (count) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
    return response;
  } catch (error) {
    console.error(`Failed to fetch products: ${error}`);
    throw error;
  }
};