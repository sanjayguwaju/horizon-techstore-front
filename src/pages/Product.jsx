import { useEffect, useState } from "react";
import { getProduct, getRelated, productStar } from "../functions/product";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleProduct from "../components/cards/SingleProduct";
import ProductCard from "../components/cards/ProductCard";

const Product = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const { slug } = useParams();

  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);

  useEffect(() => {
    loadSingleProduct();

    if (product?.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  }, [slug, user]);

  const loadSingleProduct = async () => {
    try {
      const res = await getProduct(slug);
      setProduct(res);
      getRelated(res?._id).then((res) => setRelated(res));
    } catch (error) {
      console.error(error);
    }
  };

  const onStarClick = async (newRating, name) => {
    setStar(newRating);
    try {
      const res = await productStar(name, newRating, user.token);
      console.log("rating clicked", res);
      await loadSingleProduct(); // if you want to show updated rating in real time
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      <div className="row pb-5">
        {related.length ? (
          related.map((relatedProduct) => (
            <div key={relatedProduct?._id} className="col-md-4">
              <ProductCard product={relatedProduct} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Products Found</div>
        )}
      </div>
    </div>
  );
};
export default Product;
