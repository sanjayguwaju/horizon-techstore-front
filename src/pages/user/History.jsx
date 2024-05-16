// src/pages/user/History.js
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { downloadInvoice } from '../../utils/invoice'; // Import the function

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, [user.token]);

  const loadUserOrders = async () => {
    try {
      const res = await getUserOrders(user.token);
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to load user orders", error);
    }
  };

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order?.products?.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p?.product?.title}</b>
            </td>
            <td>{p?.product?.price}</td>
            <td>{p?.product?.brand}</td>
            <td>{p?.color}</td>
            <td>{p?.count}</td>
            <td>
              {p?.product?.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            <button onClick={() => downloadInvoice(order)}>PDF Download</button>
          </div>
        </div>
      </div>
    ));

  console.log("orders ---->", orders);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
