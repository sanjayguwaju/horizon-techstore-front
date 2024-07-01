import './Header2.scss';
import logo from "../../../public/logo.png";
import { FaHome, FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa'; // Importing icons from react-icons
import { BiCake, BiCart, BiHome, BiShoppingBag, BiSolidShoppingBag, BiUser } from "react-icons/bi";
import { useState } from 'react';
import { Dropdown, Menu } from 'antd';

const Header2 = () => {
    // State to manage dropdown visibility
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    console.log({ isDropdownVisible });

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

    const menu = (
        <Menu className="custom-menu">
          <Menu.Item className="custom-menu-item">
            <a href="/dashboard" className='custom-menu-link'>Dashboard</a>
          </Menu.Item>
          <Menu.Item className="custom-menu-item">
            <a href="/logout" className='custom-menu-link'>Logout</a>
          </Menu.Item>
        </Menu>
      );
    return (
        <>
            <nav className="d-flex align-items-center justify-content-between px-5 -pb-2 ">
                <div className="d-flex align-items-center">
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
                </div>
                <div className="h3 font-weight-bold text-primary m-0">
                    <a href="#" className="nav-link text-decoration-none d-flex align-items-center">
                        <img src={logo} alt="shop-icon" width={200} className="mr-1" /> {/* Shop icon with logo */}
                    </a>
                </div>
                <div className="d-flex align-items-center">
                    <div className="position-relative mr-3">
                        <input type="text" placeholder="Search Products ..." className="bg-input text-input p-2" />
                    </div>
                    <Dropdown
                        overlay={menu}
                        visible={isDropdownVisible}
                        onVisibleChange={toggleDropdown}
                    >
                        <div className="user-container d-flex align-items-center" onClick={e => e.preventDefault()}>
                            <BiUser className="mr-1" size={30} />
                            <span>sanjayguwaju</span>
                        </div>
                    </Dropdown>
                        {/* {isDropdownVisible && (
                            <div className="dropdown-menu bg-danger" style={{ position: 'absolute', top: '100%', zIndex: 1000, width: '200px', height: '200px' }}>
                                <a href="/dashboard" className="dropdown-item">Dashboard</a>
                                <a href="/logout" className="dropdown-item">Logout</a>
                            </div>
                        )} */}
                </div>
            </nav>
        </>
    );
}

export default Header2;
