// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { ConfigProvider, Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom"; // Update import
import { getAuth, signOut } from "firebase/auth";
import "firebase/compat/auth";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";
import Search from "../forms/Search";
import { logout } from "../../pages/reducers/userReducer";

import logo from "../../../public/logo.png"

const { SubMenu, Item } = Menu;

const Header = () => {



  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  let navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      dispatch(logout());
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
            borderRadius: 2,
            colorBgContainer: '#f6ffed',
          },
          components: {
            Menu: {
              colorBgMenuItemHover: 'inherit', // Prevent background change on hover
              colorTextMenuItemHover: 'inherit', // Prevent text color change on hover
            },
            MenuItem: {
              colorBgMenuItemHover: 'inherit', // Prevent background change on hover
              colorTextMenuItemHover: 'inherit', // Prevent text color change on hover
            },
            Button: {
              colorPrimaryHover: '#007b50',
            },
            Input: {
              colorBorder: '#00b96b',
              colorBgContainer: '#f6ffed',
            },
          },
        }}
      >
        <div className="header">
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="header-left"
          >
            <Item></Item>
            <Item key="home" icon={<AppstoreOutlined />}>
              <Link to="/" className="custom-link">Home</Link>
            </Item>
            <Item key="shop" icon={<ShoppingOutlined />}>
              <Link to="/shop" className="custom-link">Shop</Link>
            </Item>
            <Item key="cart" icon={<ShoppingCartOutlined />}>
              <Link to="/cart">
                <Badge count={cart?.length} offset={[9, 0]}>
                  Cart
                </Badge>
              </Link>
            </Item>
          </Menu>
          <img src={logo} alt="horizon-store" width="200px" style={{ position: 'relative', zIndex: 1 }} />

          {/* <div className="header-center">
          <h4>Horizon Store</h4>
        </div> */}

          <div className="header-right">
            <div className="">
              <Menu
                onClick={handleClick}
                selectedKeys={[current]}
                mode="horizontal"
                className="box-right"
              >
                <Item></Item>
                {!user && (
                  <Item key="register" icon={<UserAddOutlined />}>
                    <Link to="/register">Register</Link>
                  </Item>
                )}

                {!user && (
                  <Item key="login" icon={<UserOutlined />}>
                    <Link to="/login">Login</Link>
                  </Item>
                )}

                {!user && (
                  <Item className="search">
                    <Search />
                  </Item>
                )}

                {user && (
                  <SubMenu
                    title={user?.email && user?.email?.split("@")[0]}
                    icon={<SettingOutlined />}
                    key="userSubMenu"
                  >
                    {user.role === "subscriber" && (
                      <Item key="dashboard">
                        <Link to="/user/history">Dashboard</Link>
                      </Item>
                    )}

                    {user?.role === "admin" && (
                      <Item key="adminDashboard">
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </Item>
                    )}
                    <Item
                      key="logout"
                      icon={<LogoutOutlined />}
                      onClick={handleLogout}
                    >
                      Logout
                    </Item>
                  </SubMenu>
                )}

                {user && (
                  <Item className="search">
                    <Search />
                  </Item>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </>
  );

};

export default Header;
