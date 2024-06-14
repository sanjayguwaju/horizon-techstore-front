import { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../assets/images/computer/laptop.png";

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const drawer = useSelector((state) => state.drawer);
  const cart = useSelector((state) => state.cart);
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");

  const imageStyle = {
    width: "150px",
    height: "100px",
    objectFit: "cover",
  };

  useEffect(() => {
    setVisible(drawer);
  }, [drawer]);

  const onClose = () => {
    dispatch(setVisible(false));
  };

  return (
    <Drawer
      title="Cart Items"
      placement={placement}
      width={500}
      onClose={onClose}
      open={visible}
    >
      {cart?.map((product) => (
        <div
          key={product?._id}
          className="row d-flex justify-content-center align-items-center"
        >
          <div className="col">
            {product?.images[0] ? (
              <>
                <div className="d-flex justify-content-center align-items-center">
                  <img src={product?.images[0]?.url} style={imageStyle} />
                </div>
                <p className="text-center bg-secondary text-light">
                  {product?.title} x {product?.count}
                </p>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-center align-items-center">
                  <img src={laptop} style={imageStyle} />
                </div>
                <p className="text-center bg-secondary text-light">
                  {product?.title} x {product?.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart" className="d-flex justify-content-center">
        <Button
          onClick={onClose}
          className="text-center btn btn-primary btn-raised btn-block"
        >
          Go To Cart
        </Button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
