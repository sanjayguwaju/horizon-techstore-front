import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
import { loggedInUser } from "../reducers/userReducer";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      if (result?.user?.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");

        // Update the password
        await updatePassword(result?.user, password);
        const idTokenResult = result?.user?.accessToken;
        console.log("idTokenResult ==>", idTokenResult);

        createOrUpdateUser(idTokenResult).then((res)=> {
          dispatch(loggedInUser({
            name: res?.data?.name,
            email: res?.data?.email,
            token: idTokenResult,
            role: res?.data?.role,
            _id: res?.data?._id
          }));
        }).catch(err => console.log(err));
        
        // Redirect or further actions
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />

      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
