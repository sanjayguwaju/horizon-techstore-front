import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SideDrawer from "./components/drawer/SideDrawer";

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
      <div>
        <Header />
        <SideDrawer/>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/complete" element={<RegisterComplete />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/admin/*" element={<AdminRoute/>} /> 
          <Route path="/user/*" element={<UserRoute/>} />
          <Route path="/product/:slug" element={<Product/>}/>
          <Route path="/category/:slug" element={<CategoryHome/>}/>
          <Route path="/sub/:slug" element={<SubHome/>}/>
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </div>
    </>
  );
};

export default App;
