import { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { defaults } from "lodash";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black","Brown","Sliver","White","Blue"],
  brands: ["Apple","Samsung","Microsoft","Lenevo","ASUS"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);

  const { 
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    // add handle in future
  };
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav/>
        </div>
        <div className="col-md-10">
          <h4>Product Create<//h4>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
