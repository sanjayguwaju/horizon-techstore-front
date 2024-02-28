/* eslint-disable no-undef */
import axios from "axios";

export const getCategories = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/categories`);
  return response.data;
}

export const getCategory = async (slug) => {
  const response = await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
  return response.data;
}

export const removeCategory = async (slug, authtoken) => {
  const response = await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
  return response.data;
}

export const updateCategory = async (slug, category, authtoken) => {
  const response = await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });
  return response.data;
}

export const createCategory = async (category, authtoken) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/category`, category, {
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