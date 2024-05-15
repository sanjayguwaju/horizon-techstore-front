import PropTypes from 'prop-types';

const ShowPaymentInfo = ({ order }) => (
  <div>
    <p>
      <span>Order Id: {order.paymentIntent.id}</span>
      {" / "}
      <span>
        Amount:{" / "}
        {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      {" / "}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}
      <span>
        Orderd on:{" / "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "}
      <span className="badge bg-primary text-white">
        STATUS: {order.orderStatus}
      </span>
    </p>
  </div>
);

ShowPaymentInfo.propTypes = {
  order: PropTypes.shape({
    paymentIntent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      payment_method_types: PropTypes.arrayOf(PropTypes.string).isRequired,
      status: PropTypes.string.isRequired,
      created: PropTypes.number.isRequired,
    }).isRequired,
    orderStatus: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShowPaymentInfo;
