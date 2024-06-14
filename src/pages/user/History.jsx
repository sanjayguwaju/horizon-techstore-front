// src/pages/user/History.js
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { downloadInvoice } from '../../utils/invoice'; // Import the function
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, Table } from 'antd';

const History = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    loadUserOrders();
  }, [user.token]);

  const loadUserOrders = async () => {
    try {
      const res = await getUserOrders(user.token);
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to load user orders", error);
    }
  };

  const showOrderInTable = (order) => {
    const columns = [
      {
        title: "Title",
        dataIndex: "product",
        key: "title",
        render: (product) => <b>{product?.title}</b>,
      },
      {
        title: "Price",
        dataIndex: "product",
        key: "price",
        render: (product) => product?.price,
      },
      {
        title: "Brand",
        dataIndex: "product",
        key: "brand",
        render: (product) => product?.brand,
      },
      {
        title: "Color",
        dataIndex: "color",
        key: "color",
      },
      {
        title: "Count",
        dataIndex: "count",
        key: "count",
      },
      {
        title: "Shipping",
        dataIndex: "product",
        key: "shipping",
        render: (product) =>
          product?.shipping === "Yes" ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          ),
      },
    ];

    return (
      <>
        <Table
          columns={columns}
          dataSource={order?.products}
          rowKey={(record) => record.product._id}
          pagination={false}
        />
      </>
    );
  };

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="mb-5 p-3 card">
        <ShowPaymentInfo order={order} />
        <h5>Order Items</h5>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col m-3">
            <Button
              onClick={() => downloadInvoice(order)}
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size={"large"}
            >
              Download Invoice
            </Button>
          </div>
        </div>
      </div>
    ));
    
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col text-center">
            <br />
            <h4>
              {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
            </h4>
            {showEachOrders()}
          </div>
        </div>
      </div>
    </>
    
  );
};

export default History;
