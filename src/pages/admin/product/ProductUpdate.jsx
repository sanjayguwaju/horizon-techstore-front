import { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { Flex, Spin } from "antd";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  // Function to load product details
  const loadProduct = async () => {
    try {
      // Fetch product data
      const product = await getProduct(slug);

      // Set product data to state
      setValues({ ...values, ...product });

      // Fetch subcategories related to this product's category
      const res = await getCategorySubs(product?.category?._id);

      // Set these subcategories as options for the 'Subs' field
      setSubOptions(res);

      // Prepare an array of subcategory IDs related to this product
      let arr = product.subs.map((s) => s._id);

      // Set this array to state, required for Ant Design's Select component
      setArrayOfSubs((prev) => arr);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCategories = async () => {
    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Function to handle category change
  const handleCategoryChange = async (e) => {
    e.preventDefault();

    // Reset subs and set the new category
    setValues({ ...values, subs: [] });

    // Set the selected category
    setSelectedCategory(e.target.value);

    try {
      // Fetch subcategories related to the selected category
      const res = await getCategorySubs(e.target.value);

      // Set these subcategories as options for the 'Subs' field
      setSubOptions(res);

      // If user reselects the original category, reload the product to show its subcategories by default
      if (values.category._id === e.target.value) {
        loadProduct();
      }

      // Clear old subcategory IDs
      setArrayOfSubs([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <div className="p-3">
            <h4>Product Update</h4>
            <hr />
            <FileUpload
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
          <hr />
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;