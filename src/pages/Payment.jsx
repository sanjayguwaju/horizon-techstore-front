// Import necessary dependencies
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css"; // Import CSS for styling

// Load Stripe with your public key (ensure you have REACT_APP_STRIPE_KEY in your .env)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY || "");

const Payment = () => {
  // Check if the Stripe key is missing and log an error or warning
  if (!process.env.REACT_APP_STRIPE_KEY) {
    console.error("Stripe key is missing in .env");
    return <p>Payment cannot be processed at this time.</p>;
  }

  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={stripePromise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
