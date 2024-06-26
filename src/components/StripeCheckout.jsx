import { useState, useEffect, useCallback } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { Link } from "react-router-dom";
import { Card } from "antd";
import Laptop from "../assets/images/computer/laptop.png"
import { CheckOutlined, DollarOutlined } from "@ant-design/icons";
import { createOrder, emptyUserCart } from "../functions/user";
import { addToCart } from "../pages/reducers/cartReducer";
import { couponApplied } from "../pages/reducers/couponReducer";

// Moved outside the component to prevent re-creation on each render
const cartStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => state);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user?.token, coupon).then((res) => {
      console.log("create payment intent", res.clientSecret);
      setClientSecret(res.clientSecret);
      setCartTotal(res.cartTotal);
      setTotalAfterDiscount(res.totalAfterDiscount);
      setPayable(res.payable);
    });
  }, [user?.token]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: e.target.name.value,
          },
        },
      });

      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        // here you get result after successful payment
        // create order and save in database for admin to process
        // empty user cart from redux store and local storage

        createOrder(payload, user.token).then((res) => {
          if (res.data.ok) {
            // empty cart from local storage
            if (typeof window !== "undefined") localStorage.removeItem("cart");
            // empty cart from redux
            dispatch(addToCart([]));
            // reset coupon to false
            dispatch(couponApplied(false))
            // empty cart from database
            emptyUserCart(user.token);
          }
        });

        console.log(JSON.stringify(payload, null, 4));
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }

          // if (succeeded) {
      //   // Clear the CardElement
      //   elements.getElement(CardElement).clear();
      //   // Additional success logic (e.g., updating UI state)
      // }
    },
    [stripe, elements, clientSecret]
  );

  const handleChange = useCallback(async (e) => {
    // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  }, []);

  return (
    <>
    {!succeeded && (
      <div>
        {coupon && totalAfterDiscount !== undefined ? (
          <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
        ) : (
          <p className="alert alert-danger">No coupon applied</p>
        )}
      </div>
    )}
    <div className="text-center pb-5">
      <Card
        cover={
          <img
            src={Laptop}
            style={{
              height: "200px",
              objectFit: "cover",
              marginBottom: "-50px",
            }}
          />
        }
        actions={[
          <>
            <DollarOutlined className="text-info" /> <br /> Total: $
            {cartTotal}
          </>,
          <>
            <CheckOutlined className="text-info" /> <br /> Total payable : $
            {(payable / 100).toFixed(2)}
          </>,
        ]}
      />
    </div>

    <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cartStyle}
        onChange={handleChange}
      />
      <button
        className="stripe-button"
        disabled={processing || disabled || succeeded}
      >
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
        </span>
      </button>
      <br />
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <br />
      <p>Use this fake card no. for test purpose now</p>
      <p style={{ color: 'red', fontSize: '20px' }}>4242 4242 4242 4242 04/42 222 2222</p>
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment Successful.{" "}
        <Link to="/user/history">See it in your purchase history.</Link>
      </p>
    </form>
  </>
  );
};

export default StripeCheckout;
