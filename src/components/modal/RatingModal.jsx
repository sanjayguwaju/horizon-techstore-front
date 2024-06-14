import { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom"; 

const RatingModal = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.user);

  let navigate = useNavigate();
    const { slug } = useParams();

const handleModal = () => {
  if (user && user.token) {
    setModalVisible(true);
  } else {
    navigate("/login", { state: { from: `/product/${slug}` } });
  }
};

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
    toast.success("Thanks for your review. It will appear soon");
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        onClick={showModal}
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
