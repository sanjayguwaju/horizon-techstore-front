import { useState, useEffect, useCallback } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { Link } from "react-router-dom";

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
  const { user } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      console.log("create payment intent", res.clientSecret);
      setClientSecret(res.clientSecret);
    });
  }, [user.token]);

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
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment Successful.{" "}
        <Link to="/user/history">See it in your purchase history.</Link>
      </p>
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
          {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default StripeCheckout;
