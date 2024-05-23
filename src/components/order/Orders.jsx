import PropTypes from 'prop-types';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { Select, Descriptions, Table } from 'antd';

const { Option } = Select;

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => {
    const columns = [
      {
        title: 'Title',
        dataIndex: 'product',
        key: 'title',
        render: product => <b>{product?.title}</b>,
      },
      {
        title: 'Price',
        dataIndex: 'product',
        key: 'price',
        render: product => product?.price,
      },
      {
        title: 'Brand',
        dataIndex: 'product',
        key: 'brand',
        render: product => product?.brand,
      },
      {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
      },
      {
        title: 'Count',
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: 'Shipping',
        dataIndex: 'product',
        key: 'shipping',
        render: product => product?.shipping === "Yes" ? <CheckCircleOutlined style={{ color: "green" }} /> : <CloseCircleOutlined style={{ color: "red" }} />,
      },
    ];
  
    return (
      <>
       <Table columns={columns} dataSource={order?.products} rowKey={record => record.product._id} pagination={false} />
      </>
    );
  };

  return (
    <>
      {orders?.map((order) => (
        <div key={order?._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />

            <Descriptions title="Order Status" bordered>
              <Descriptions.Item label="Delivery Status">
                <Select
                  onChange={(value) => handleStatusChange(order?._id, value)}
                  defaultValue={order?.orderStatus}
                  name="status"
                >
                  <Option value="Not Processed">Not Processed</Option>
                  <Option value="Processing">Processing</Option>
                  <Option value="Dispatched">Dispatched</Option>
                  <Option value="Cancelled">Cancelled</Option>
                  <Option value="Completed">Completed</Option>
                </Select>
              </Descriptions.Item>
            </Descriptions>
            <br />
            {showOrderInTable(order)}
          </div>


        </div>
      ))}
    </>
  );
};


Orders.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      orderStatus: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          color: PropTypes.string.isRequired,
          count: PropTypes.number.isRequired,
          product: PropTypes.shape({
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            brand: PropTypes.string.isRequired,
            shipping: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  handleStatusChange: PropTypes.func.isRequired,
};

export default Orders;
