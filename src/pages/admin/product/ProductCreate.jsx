import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

const initialState = {
  title: "Macbook Pro",
  description: "This is the best Apple product",
  price: "45000",
  // categories: [],
  // category: "",
  // subs: [],
  shipping: "Yes",
  quantity: "50",
  // images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "White",
  brand: "Apple",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);

  useEffect(() => {
  console.log("values --->", values);
}, [values]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(values, user.token);
      console.log("res ---->",res);
      window.alert(`"${res.title}" is created`);
      window.location.reload();
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>

      <div className="col-md-10">
        <h4>Product create</h4>
        <hr />

        <ProductCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
        />
      </div>
    </div>
  </div>
  );
};

export default ProductCreate;
