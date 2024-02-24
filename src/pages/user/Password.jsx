import { useState } from "react";
import { toast } from "react-toastify";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import UserNav from "../../components/nav/UserNav";

const Password = () => {
    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const auth = getAuth();
          const user = auth.currentUser;

          // Create credential object for reauthentication
          const credential = EmailAuthProvider.credential(user.email, currentPassword);

          // Reauthenticate the user
          await reauthenticateWithCredential(user, credential);

          // Update the password
          await updatePassword(user, password);

          setLoading(false);
          toast.success("Password updated successfully");
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }
    

    const passwordUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Current Password</label>
                        <input 
                            type="password" 
                            onChange={(e) => setCurrentPassword(e.target.value)} 
                            className="form-control"
                            placeholder="Enter your password"
                            disabled={loading}
                            value={currentPassword}
                        />
                    
                    <label>Change Your Password</label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="form-control"
                        placeholder="Enter your new password"
                        disabled={loading}
                        value={password}
                    />
                </div>
                <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>Reset Password</button> {/* Added text to the button */}
            </form>
        );
    }

  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
              <UserNav/>
            </div>
            <div className="col">
                {loading ? <h4>Password Update</h4> : <h4>Password Update</h4>}
                {passwordUpdateForm()}
            </div>
        </div>
    </div>
  )
}

export default Password;
