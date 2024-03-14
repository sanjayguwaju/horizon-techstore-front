import { useEffect, useState } from "react";
import { getProduct } from "../functions/product";
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";

const Product = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

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

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};
export default Product;
