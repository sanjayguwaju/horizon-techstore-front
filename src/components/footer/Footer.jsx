import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faCreditCard, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcPaypal, faCcMastercard, faCcDiscover, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import "./footer.css"

const Footer = () => {
  return (
    <>
      <footer id="footer">
        {/* top footer */}
        <div className="section">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-md-3 col-xs-6">
                <div className="footer">
                  <h3 className="footer-title">About Us</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
                  <ul className="footer-links">
                    <li><Link to="#"><FontAwesomeIcon icon={faMapMarkerAlt} /> 1734 Stonecoal Road</Link></li>
                    <li><Link to="#"><FontAwesomeIcon icon={faPhone} /> +021-95-51-84</Link></li>
                    <li><Link to="#"><FontAwesomeIcon icon={faEnvelope} /> email@email.com</Link></li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-xs-6">
                <div className="footer">
                  <h3 className="footer-title">Categories</h3>
                  <ul className="footer-links">
                    <li><Link to="#">Hot deals</Link></li>
                    <li><Link to="#">Laptops</Link></li>
                    <li><Link to="#">Smartphones</Link></li>
                    <li><Link to="#">Cameras</Link></li>
                    <li><Link to="#">Accessories</Link></li>
                  </ul>
                </div>
              </div>

              <div className="clearfix visible-xs"></div>

              <div className="col-md-3 col-xs-6">
                <div className="footer">
                  <h3 className="footer-title">Information</h3>
                  <ul className="footer-links">
                    <li><Link to="#">About Us</Link></li>
                    <li><Link to="#">Contact Us</Link></li>
                    <li><Link to="#">Privacy Policy</Link></li>
                    <li><Link to="#">Orders and Returns</Link></li>
                    <li><Link to="#">Terms & Conditions</Link></li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-xs-6">
                <div className="footer">
                  <h3 className="footer-title">Service</h3>
                  <ul className="footer-links">
                    <li><Link to="#">My Account</Link></li>
                    <li><Link to="#">View Cart</Link></li>
                    <li><Link to="#">Wishlist</Link></li>
                    <li><Link to="#">Track My Order</Link></li>
                    <li><Link to="#">Help</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /top footer */}

        {/* bottom footer */}
        <div id="bottom-footer" className="section">
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="col-md-12 text-center">
                <ul className="footer-payments">
                  <li><Link to="#"><FontAwesomeIcon icon={faCcVisa} /></Link></li>
                  <li><Link to="#"><FontAwesomeIcon icon={faCreditCard} /></Link></li>
                  <li><Link to="#"><FontAwesomeIcon icon={faCcPaypal} /></Link></li>
                  <li><Link to="#"><FontAwesomeIcon icon={faCcMastercard} /></Link></li>
                  <li><Link to="#"><FontAwesomeIcon icon={faCcDiscover} /></Link></li>
                  <li><Link to="#"><FontAwesomeIcon icon={faCcAmex} /></Link></li>
                </ul>
                <span className="copyright">
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved  <FontAwesomeIcon icon={faHeart} aria-hidden="true" /> by <Link to="#" target="_blank" rel="noopener noreferrer">Sanjay Guwaju</Link>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </span>
              </div>
            </div>
            {/* /row */}
          </div>
          {/* /container */}
        </div>
        {/* /bottom footer */}
      </footer>
    </>
  );
}

export default Footer;
