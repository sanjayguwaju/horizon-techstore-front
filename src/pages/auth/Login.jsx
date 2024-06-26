import { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch , useSelector} from "react-redux";
import { Link, useNavigate, useLocation} from "react-router-dom";
import {  } from "react-router-dom";
import { signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { createOrUpdateUser } from "../../functions/auth";
import { loggedInUser } from "../reducers/userReducer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  console.log("user ---->", user);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's an intended route in the location state
    const intended = location.state?.from;

    if (!intended && user && user.token) {
      navigate("/");
    }
  }, [user, navigate, location.state]);

  const roleBasedRedirect = (res) => {
    // Check if there's an intended route in the location state
    const intended = location.state?.from;
    if (intended) {
      navigate(intended);
    } else {
      // Assuming res.data.role is coming from an asynchronous operation
      if (res?.data?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth,email, password);
      const { user } = result;
      const idTokenResult = await user?.getIdTokenResult();
      createOrUpdateUser(idTokenResult?.token).then((res)=> {
        dispatch(loggedInUser({
          name: res?.data?.name,
          email: res?.data?.email,
          token: idTokenResult,
          role: res?.data?.role,
          _id: res?.data?._id
        }));
        roleBasedRedirect(res);
      }).catch(err => console.log(err));
     
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  
  const googleLogin = async () => {
    signInWithPopup(auth,googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token).then((res)=> {
          dispatch(loggedInUser({
            name: res?.data?.name,
            email: res?.data?.email,
            token: idTokenResult,
            role: res?.data?.role,
            _id: res?.data?._id
          }));
          roleBasedRedirect(res?.data?.role);
        }).catch(err => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="primary"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="float-right  text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;