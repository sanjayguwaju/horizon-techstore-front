import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Laptop from "../../assets/images/computer/laptop.png";
import { bottom, left, right } from "@popperjs/core";
import "./SingleProduct.css";
import ProductListItems from "./ProductListItem";

const { TabPane } = Tabs;

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;

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
              This is a dummy product. It's the best product you can find on the
              market. It has all the features you need and more. It's made from
              the highest quality materials and built to last. Whether you need
              it for personal use or business, this product will not disappoint
              {/* {description && description} */}
            </TabPane>
            <TabPane tab="More" key="2">
              Call use on xxxx xxx xxx to learn more about this product.
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
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
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
