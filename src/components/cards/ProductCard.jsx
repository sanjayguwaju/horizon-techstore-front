import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../assets/images/computer/laptop.png";
import { Link } from "react-router-dom";
import _ from "lodash";
import showAverageRating from "../../functions/rating";
import { addToCart } from "../../pages/reducers/cartReducer";
import { setVisible } from "../../pages/reducers/drawerReducer";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [toolTip, setTooltip] = useState("Click to add");

  // redux
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
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
    dispatch(addToCart(unique));

    dispatch(setVisible(true));
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
          <>
            {product?.quantity > 0 ? (
              <Tooltip title={toolTip}>
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined className="text-danger" /> <br />
                  Add to Cart
                </a>
              </Tooltip>
            ) : (
              <a disabled>
                <ShoppingCartOutlined className="text-danger" /> <br />
                Out of stock
              </a>
            )}
          </>
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
