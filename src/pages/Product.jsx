import { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import { useNavigate, useParams } from 'react-router-dom';

const Product = () => {
      const navigate = useNavigate();
      const { slug } = useParams();
      console.log("slug");
    
  const [product, setProduct] = useState({});

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

const loadSingleProduct = async () => {
  try {
    const res = await getProduct(slug);
    setProduct(res);
  } catch (error) {
    console.error(error);
  }
};

  return <>{JSON.stringify(product)}</>;
};
export default Product;
