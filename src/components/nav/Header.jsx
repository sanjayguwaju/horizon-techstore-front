import { AppstoreOutlined, MailOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';

const Header = () => {
  const [current, setCurrent] = useState('home');

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
        Login
      </Menu.Item>
      <Menu.Item key="register" icon={<UserAddOutlined />} className="float-right">
        Register
      </Menu.Item>
      <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default Header;