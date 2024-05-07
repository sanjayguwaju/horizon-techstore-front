import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Tooltip} from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../assets/images/computer/laptop.png";
import { Link } from "react-router-dom";
import _ from 'lodash';
import showAverageRating  from "../../functions/rating";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [toolTip, setTooltip] = useState('Click to add');

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getCartFromLocalStorage = () => {
    if (typeof window !== "undefined" && localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
    return [];
  };

  const setCartInLocalStorage = (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleAddToCart = () => {
    let cart = getCartFromLocalStorage();
    cart.push({ ...product, count: 1 });
    let unique = _.uniqWith(cart, _.isEqual);
    setCartInLocalStorage(unique);
    setTooltip("Added");
    // add to reeux state
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });

    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };

  // destructure
  const { images, title, description, slug } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverageRating(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={toolTip}>
          <a onClick={handleAddToCart}>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to
            Cart
          </a>
        </Tooltip>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
