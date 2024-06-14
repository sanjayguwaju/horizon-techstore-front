import { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Laptop from "../../assets/images/computer/laptop.png";
import { bottom, left, right } from "@popperjs/core";
import "./SingleProduct.css";
import ProductListItems from "./ProductListItem";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import showAverageRating from "../../functions/rating";
import _ from 'lodash';
import { toast } from "react-toastify";
import { addToWishlist } from "../../functions/user";
import { addToCart } from "../../pages/reducers/cartReducer";

const { TabPane } = Tabs;

const { Meta } = Card;

const SingleProduct = ({ product, onStarClick, star }) => {
  const [toolTip, setTooltip] = useState("Click to add");

  let navigate = useNavigate();
  // redux
  const { user, cart } = useSelector((state) => state);
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
  };

  const { title, description, images, slug, _id } = product;

  const reactGalleryImages = images?.map((item) => ({
    original: item.url,
    thumbnail: item.url,
    originalHeight: 400, // Specify the height of the original image
    originalWidth: 800, // Specify the width of the original image
    thumbnailHeight: 60, // Specify the height of the thumbnail
    thumbnailWidth: 40, // Specify the width of the thumbnail
    srcSet: `${item.url} 1x, ${item.url} 2x`, // Specify srcSet with image URLs
    sizes: "(max-width: 1000px) 100vw, 50vw", // Specify sizes for different viewport widths
  }));

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    try {
      await addToWishlist(product?._id, user?.token);
      toast.success("Added to wishlist");
      navigate("/user/wishlist");
    } catch (error) {
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <>
      <div className="col-md-1"></div>
      <div className="col-md-6 single-product-gallery">
        {Array.isArray(images) && images.length > 0 ? (
          <ImageGallery
            items={reactGalleryImages}
            showThumbnails={true}
            thumbnailPosition={right}
            showNav={false}
            autoPlay={false}
            slideInterval={5000}
            showFullscreenButton={false} // Hide fullscreen button
            showPlayButton={false} // Hide pause/play button
            originalClass="custom-original"
            thumbnailClass="custom-thumbnail"
          />
        ) : (
          <Card
            cover={
              <img
                src={Laptop || ""}
                alt={title || ""}
                className="mb-3 card-image"
              />
            }
          />
        )}
        <div className="mt-3">
          <Tabs type="card">
            <TabPane tab="Description" key="1">
              {description}
            </TabPane>
            <TabPane tab="More" key="2">
              Call us learn more about this product.
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div className="col-md-4">
        <h1
          className="p-3 text-center"
          style={{
            backgroundColor: "rgb(209, 219, 235)",
            borderRadius: "10px",
          }}
        >
          <span>{title}</span>
        </h1>

        {product && product.ratings && product.ratings.length > 0
          ? showAverageRating(product)
          : "No rating yet"}
        <Card
          actions={[
            <Tooltip title={toolTip}>
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                Cart
              </a>
            </Tooltip>,
            ,
            <Link to="/">
              <a onClick={handleAddToWishlist}>
                <HeartOutlined className="text-info" /> <br /> Add to Wishlist
              </a>,
            </Link>,

            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
      <div className="col-md-1"></div>
    </>
  );
};

export default SingleProduct;
