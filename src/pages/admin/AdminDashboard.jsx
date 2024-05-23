import { useState, useEffect, useCallback } from "react";
import AdminNav from "../../components/nav/AdminNav";
import Orders from "../../components/order/Orders";
import { useSelector } from "react-redux";
import { changeStatus, getOrders } from "../../functions/admin";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const loadOrders = useCallback(() => {
    getOrders(user.token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load orders");
      });
  }, [user.token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusChange = useCallback(
    (orderId, orderStatus) => {
      changeStatus(orderId, orderStatus, user.token)
        .then((res) => {
          toast.success("Status updated");
          loadOrders();
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to update status");
        });
    },
    [loadOrders, user.token]
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
