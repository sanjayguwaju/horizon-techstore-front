import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
const items = [
  {
    label: 'Home',
    key: 'home',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Register',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        label: 'Option 1',
        key: 'setting:1',
      },
      {
        label: 'Option 2',
        key: 'setting:2',
      },
    ],
  },
];
const Header = () => {
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;