import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  applyCoupon,
  createCashOrderForUser,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from "../functions/user";

import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { addToCart } from "./reducers/cartReducer";
import { couponApplied } from "./reducers/couponReducer";
import { setCOD } from "./reducers/CODReducer";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [discountError, setDiscountError] = useState("");

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => state);
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const res = await getUserCart(user.token);
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      } catch (err) {
        console.error("Error fetching user cart", err);
      }
    };

    fetchUserCart();
  }, []);

  const clearLocalStorageCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  };

  const emptyCart = async () => {
    try {
      clearLocalStorageCart();
      dispatch(addToCart([]));
      await emptyUserCart(user?.token);
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue shopping.");
    } catch (err) {
      console.error("Error emptying cart", err);
      toast.error("Failed to empty cart. Please try again.");
    }
  };

  const saveAddressToDb = async () => {
    try {
      const res = await saveUserAddress(user?.token, address);
      if (res?.data?.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    } catch (err) {
      console.error("Error saving address", err);
    }
  };

  const applyDiscountCoupon = async () => {
    try {
      const res = await applyCoupon(user?.token, coupon);
      if (res?.data) {
        setTotalAfterDiscount(res?.data?.totalAfterDiscount);
        dispatch(couponApplied(true));
      }

      if (res?.data?.err) {
        setDiscountError(res.data.err);
        dispatch(couponApplied(false));
      }
    } catch (err) {
      console.error("Error applying coupon", err);
    }
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
      <p style={{ color: "red", marginLeft: "15px" }}>
        <strong>Don't forget to add address before place order</strong>
      </p>
    </>
  );

  const calculateTotalPrice = (price, count) => price * count;

  const showProductSummary = () =>
    products.map(({ product, color, count }, i) => (
      <div key={product?.id || i}>
        <p>
          {product?.title} ({color}) x {count} ={" "}
          {calculateTotalPrice(product?.price, count)}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  const handlePlaceOrder = () => {
    navigate("/payment"); // Navigate to the payment page
  };

  const createCashOrder = async () => {
    try {
      const res = await createCashOrderForUser(
        user.token,
        COD,
        couponTrueOrFalse
      );
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch(addToCart([]));

        // empty redux coupon
        dispatch(applyCoupon(false));

        // empty redux COD
        dispatch(setCOD(false));

        // empty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          navigate("/user/history");
        }, 1000);
      }
    } catch (error) {
      console.error("Error creating cash order", error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <br />
        <h4>Delivery Address</h4>
        {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <br />
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: {total}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            )}
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
