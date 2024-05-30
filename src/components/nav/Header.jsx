// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { Menu, Badge } from "antd";
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

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    const auth = getAuth(); // Get the auth instance and call signOut() to signOut from firebase.

    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: {
            email: null,
            token: null,
          },
        });
        navigate("/login"); // Use navigate instead of history.push
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="sticky-header"
      >
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/" className="header-nav-link">
            Home
          </Link>
        </Item>
        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">Shop</Link>
        </Item>

        <Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">
            <Badge count={cart?.length} offset={[9, 0]}>
              Cart
            </Badge>
          </Link>
        </Item>

        {!user && (
          <Item
            key="register"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link to="/register" className="header-nav-link">
              Register
            </Link>
          </Item>
        )}

        {!user && (
          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login" className="header-nav-link">
              Login
            </Link>
          </Item>
        )}

        {user && (
          <SubMenu
            title={user?.email && user?.email?.split("@")[0]}
            icon={<SettingOutlined />}
            className="float-right"
            key="userSubMenu" // Make sure to provide a unique key
          >
            {user.role === "subscriber" && (
              <Item key="dashboard">
                <Link to="/user/history" className="header-nav-link">
                  Dashboard
                </Link>
              </Item>
            )}

            {user.role === "admin" && (
              <Item key="adminDashboard">
                <Link to="/admin/dashboard" className="header-nav-link">
                  Dashboard
                </Link>
              </Item>
            )}
            <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}
        <span className="float-right p-1">
          <Search />
        </span>
      </Menu>
    </>
  );
};

export default Header;
