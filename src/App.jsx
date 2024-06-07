// React and third-party libraries
import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useDispatch } from "react-redux";
import { Spin } from "antd";

// Firebase
import { auth } from "./firebase";


// Components
const Header = lazy(() => import("./components/nav/Header"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));

// Pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Payment = lazy(() => import("./pages/Payment"));

// Routes
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token).then((res)=> {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res?.data?.name,
              email: res?.data?.email,
              token: idTokenResult?.token,
              role: res?.data?.role,
              _id: res?.data?._id
            },
          });
        }).catch( err => console.log(err));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<Spin size="large" />}>
        <div>
          <Header />
          <SideDrawer />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/complete" element={<RegisterComplete />} />
            <Route path="/forgot/password" element={<ForgotPassword />} />
            <Route path="/admin/*" element={<AdminRoute />} />
            <Route path="/user/*" element={<UserRoute />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/category/:slug" element={<CategoryHome />} />
            <Route path="/sub/:slug" element={<SubHome />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
};

export default App;
