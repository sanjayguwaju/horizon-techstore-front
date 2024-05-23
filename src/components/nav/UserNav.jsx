import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const UserNav = () => {
  return (
    <Sider width={300} style={{ background: "#000" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0, lineHeight: "64px" }}
      >
        <Menu.Item key="1">
          <Link to="/user/history">History</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/user/password">Password</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/user/wishlist">Wishlist</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default UserNav;
