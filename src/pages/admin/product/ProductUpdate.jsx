import { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const ProductUpdate = ({ match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  
  const navigate = useNavigate();
  const { slug } = useParams();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product update</h4>
          {JSON.stringify(slug)}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;