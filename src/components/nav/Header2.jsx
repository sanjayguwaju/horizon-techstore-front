import './Header2.scss';
import logo from "../../../public/logo.png";
import { FaHome, FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa'; // Importing icons from react-icons
import { BiCake, BiCart, BiHome, BiShoppingBag, BiSolidShoppingBag, BiUser, BiLogIn } from "react-icons/bi";
import { useState } from 'react';
import { Badge, Dropdown, Menu } from 'antd';
import { MdOutlineAccountBox } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import "firebase/compat/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../pages/reducers/userReducer";
import { getAuth, signOut } from 'firebase/auth';
import Search from '../forms/Search';


const Header2 = () => {

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
    // State to manage dropdown visibility
    ; const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    // Toggle dropdown visibility
    const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible)

    const menu = (
        <Menu className="custom-menu">

            {user?.role === "subscriber" && (
                <>
                    <Menu.Item className="custom-menu-item">
                        <a href="/user/history" className='custom-menu-link'>Dashboard</a>
                    </Menu.Item>
                </>
            )}
            {user?.role === "admin" && (
                <>
                    <Menu.Item className="custom-menu-item">
                        <a href="/admin/dashboard" className='custom-menu-link'>Dashboard</a>
                    </Menu.Item>
                </>
            )}

            <Menu.Item className="custom-menu-item" key="logout" onClick={handleLogout}>
               Logout
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <nav className="d-flex align-items-center justify-content-between px-5 -pb-2 ">
                <div className="d-flex align-items-center">
                    <Link to="/" className="nav-link text-decoration-none d-flex align-items-center black-text">
                        <BiHome className="mr-1 black-text" size={30} />
                        <span>Home</span>
                    </Link>
                    <Link to="/shop" className="nav-link text-decoration-none d-flex align-items-center black-text">
                        <BiShoppingBag className="mr-1 black-text" size={30} />
                        <span>Shop</span>
                    </Link>

                    <Link to="/cart" className="nav-link text-decoration-none d-flex align-items-center black-text">
                        <BiCart className="mr-1 black-text" size={30} />
                        
                        <Badge count={cart?.length} offset={[9, 0]}>
                            <span style={{ fontSize: 'larger' }}>Cart</span>
                        </Badge>
                    </Link>
                </div>
                <div className="h3 font-weight-bold text-primary m-0">
                    <a href="#" className="nav-link text-decoration-none d-flex align-items-center">
                        <img src={logo} alt="shop-icon" width={200} className="mr-1" /> {/* Shop icon with logo */}
                    </a>
                </div>
                <div className="d-flex align-items-center">
                    <Search/>
                    {!user && (
                        <>
                            <div className="user-container d-flex align-items-center mr-3">
                                <BiLogIn className="mr-1" size={30} />
                                <Link to="/login" className='text-decoration-none d-flex align-items-center black-text'>
                                    <span>Login</span>
                                </Link>
                            </div>
                            <div className="user-container d-flex align-items-center">
                                <MdOutlineAccountBox className="mr-1" size={30} />
                                <Link to="/register" className='text-decoration-none d-flex align-items-center black-text'>
                                    <span>Register</span>
                                </Link>
                            </div>
                        </>
                    )}
        
                    {user && (<Dropdown
                        overlay={menu}
                        visible={isDropdownVisible}
                        onVisibleChange={toggleDropdown}
                    >
                        <div className="user-container d-flex align-items-center" onClick={e => e.preventDefault()}>
                            <BiUser className="mr-1" size={30} />
                            <span>{user?.email && user?.email?.split("@")[0]}</span>
                        </div>
                    </Dropdown>)}
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
