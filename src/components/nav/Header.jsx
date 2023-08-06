import { AppstoreOutlined, MailOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [current, setCurrent] = useState('home');

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <div>
      <Menu.Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Register</Link>
      </Menu.Item>

      </div>
      <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default Header;