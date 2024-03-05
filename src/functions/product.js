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