import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const AdminNav = () => {
const menuItemStyle = { textTransform: "uppercase", fontSize: "16px", textDecoration: "none",}; // define the style

  return (
    <Sider width={300} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" style={menuItemStyle}>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" style={menuItemStyle}>
          <Link to="/admin/product">Product</Link>
        </Menu.Item>
        <Menu.Item key="3" style={menuItemStyle}>
          <Link to="/admin/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="4" style={menuItemStyle}>
          <Link to="/admin/password">Password</Link>
        </Menu.Item>
        <Menu.Item key="5" style={menuItemStyle}>
          <Link to="/admin/wishlist">Wishlist</Link>
        </Menu.Item>
        <Menu.Item key="6" style={menuItemStyle}>
          <Link to="/admin/category">Category</Link>
        </Menu.Item>
        <Menu.Item key="7" style={menuItemStyle}>
          <Link to="/admin/sub">Sub Category</Link>
        </Menu.Item>
        <Menu.Item key="8" style={menuItemStyle}>
          <Link to="/admin/coupon">Coupon</Link>
        </Menu.Item>
        <Menu.Item key="9" style={menuItemStyle}>
          <Link to="/user/password">Users Password</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;