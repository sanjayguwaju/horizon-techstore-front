import { useState,useEffect } from "react";
import {auth} from '../../firebase';
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail} from "firebase/auth";


const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
      if (user && user?.token) {
        history.push("/")
      }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        const config = {
          url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
          handleCodeInApp: true,
        };
      
        try {
          await sendPasswordResetEmail(auth,email, config);
          setEmail('');
          setLoading(false);
          toast.success('Check your email for a password reset link');
        } catch (error) {
          setLoading(false);
          toast.error(error.message);
          console.error("ERROR MSG IN FORGOT PASSWORD", error);
        }
      };
      

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (
                <h4 className="text-danger">Loading...</h4>
            ) : (
                <h4>Forgot Password</h4>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Type your email"
                    autoFocus
                />
                <br/>
                <button className="btn btn-raised" disabled={!email}>Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword;
