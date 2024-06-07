import React from 'react';
import { Link } from 'react-router-dom';
import "./shopcollection.css"

const ShopSection = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-xs-6">
            <div className="shop">
              <div className="shop-img">
                <img src="https://res.cloudinary.com/dz3facqgc/image/upload/v1717764171/rwkqmfprgxy1pyqnifgh.png" alt="Laptop Collection" />
              </div>
              <div className="shop-body">
                <h3>Laptop<br />Collection</h3>
                <Link to="/shop/laptops" className="cta-btn">
                  Shop now <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-xs-6">
            <div className="shop">
              <div className="shop-img">
                <img src="https://res.cloudinary.com/dz3facqgc/image/upload/v1717764218/o2farmhzznddcmwm29uv.png" alt="Accessories Collection" />
              </div>
              <div className="shop-body">
                <h3>Accessories<br />Collection</h3>
                <Link to="/shop/accessories" className="cta-btn">
                  Shop now <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-xs-6">
            <div className="shop">
              <div className="shop-img">
                <img src="https://res.cloudinary.com/dz3facqgc/image/upload/v1717764272/zvpzu2yykrujtf1tdlup.png" alt="Cameras Collection" />
              </div>
              <div className="shop-body">
                <h3>Cameras<br />Collection</h3>
                <Link to="/shop/cameras" className="cta-btn">
                  Shop now <i className="fa fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSection;
