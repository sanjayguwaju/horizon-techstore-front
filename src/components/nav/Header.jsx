// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom"; // Update import
import { getAuth, signOut } from "firebase/auth"; 
import "firebase/compat/auth";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
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
            token: null
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
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user?.email && user?.email.split("@")[0]}
          className="float-right"
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
