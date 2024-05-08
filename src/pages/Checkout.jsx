import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { emptyUserCart, getUserCart, saveUserAddress } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const res = await getUserCart(user.token);
        console.log("res -->", res);
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      } catch (err) {
        console.error("Error fetching user cart", err);
        // Display error to user, or handle it in some other way
      }
    };

    fetchUserCart();
  }, []);

  const emptyCart = async () => {
    try {
      // remove from local storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
      // remove from redux
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      // remove from backend
      await emptyUserCart(user.token);
      setProducts([]);
      setTotal(0);
      toast.success("Cart is empty. Continue shopping.");
    } catch (err) {
      console.error("Error emptying cart", err);
      // Display error to user, or handle it in some other way
    }
  };

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <ReactQuill theme="snow" value={address} onChange={setAddress} />
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input and apply button
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p?.product?.title} ({p?.color}) x {p?.count} ={" "}
              {p?.product?.price * p?.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: {total}</p>

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
            >
              Place Order
            </button>
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
