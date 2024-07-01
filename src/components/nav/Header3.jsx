import React, { useState } from 'react';
import { Row, Col, Menu, Dropdown } from 'antd';
import { BiHome, BiShoppingBag, BiCart, BiUser } from 'react-icons/bi';
import './Header2.scss';
import logo from "../../../public/logo.png";

const Header3 = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/dashboard">Dashboard</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/logout">Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Row align="middle" justify="space-between" className="px-5 pb-2 text-card-foreground">
      <Col>
        <Row align="middle">
          <a href="#" className="nav-link text-decoration-none d-flex align-items-center black-text">
            <BiHome className="mr-1 black-text" size={30} />
            <span>Home</span>
          </a>
          <a href="#" className="nav-link text-decoration-none d-flex align-items-center black-text">
            <BiShoppingBag className="mr-1 black-text" size={30} />
            <span>Shop</span>
          </a>
          <a href="#" className="nav-link text-decoration-none d-flex align-items-center black-text">
            <BiCart className="mr-1 black-text" size={30} />
            <span>Cart</span>
          </a>
        </Row>
      </Col>
      <Col>
        <div className="h3 font-weight-bold text-primary m-0">
          <a href="#" className="nav-link text-decoration-none d-flex align-items-center">
            <img src={logo} alt="shop-icon" width={200} className="mr-1" />
          </a>
        </div>
      </Col>
      <Col>
        <Row align="middle">
          <input placeholder="Search Products ..." className="bg-input text-input p-2 mr-3" />
          <Dropdown overlay={menu} visible={isDropdownVisible} onVisibleChange={toggleDropdown}>
            <div className="user-container d-flex align-items-center">
              <BiUser className="mr-1" size={30} />
              <span>sanjayguwaju</span>
            </div>
          </Dropdown>
        </Row>
      </Col>
    </Row>
  );
};

export default Header3;
