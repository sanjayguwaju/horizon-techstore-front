import PropTypes from "prop-types";
import { Descriptions, Badge } from "antd";

const ShowPaymentInfo = ({ order }) => {
  const {
    paymentIntent: {
      id,
      amount,
      currency,
      payment_method_types,
      status,
      created,
    },
    orderStatus,
  } = order;

  return (
    <>
      <Descriptions title="Order Info" bordered>
        <Descriptions.Item label="Order Id">{id}</Descriptions.Item>
        <Descriptions.Item label="Amount">
          {amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Descriptions.Item>
        <Descriptions.Item label="Currency">
          {currency.toUpperCase()}
        </Descriptions.Item>
        <Descriptions.Item label="Method">
          {payment_method_types[0]}
        </Descriptions.Item>
        <Descriptions.Item label="Payment">
          {status.toUpperCase()}
        </Descriptions.Item>
        <Descriptions.Item label="Orderd on">
          {new Date(created * 1000).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Badge status="processing" text={orderStatus} />
        </Descriptions.Item>
      </Descriptions>
      <br />
    </>
  );
};

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
