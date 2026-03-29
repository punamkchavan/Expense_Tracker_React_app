import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/auth-context";
import axios from "axios";


const Welcome =()=>{

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const verifyEmailHandler = async () => {
        try {
            const response = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDer0CNCdLE9IfrOJPgDtKPWr64ijhZgqc",
            {
                requestType: "VERIFY_EMAIL",
                idToken: authCtx.token,
            }
            );
            //console.log("Token:", authCtx.token);
            alert("Verification email sent! Check your inbox 📩");

        } catch (error) {
            const errorMessage =
            error.response?.data?.error?.message || "Something went wrong!";
            alert(errorMessage);
        }
        };

        const logoutHandler = () => {
                authCtx.logout();
                navigate("/");
            };
    return(
    <>
    <div>
    <h1>Welcome to Expense Tracker</h1>
        <button type="button" onClick={verifyEmailHandler}>Verify your Email</button>
    </div>    
    <div>
    <p>Your profile is incomplete.</p>
      <Link to="/profile">
        <button>Complete Profile</button>
      </Link>
    </div>
    <div>
      <button type='button' onClick={logoutHandler}>Logout</button>
    </div>
    </>
    )
}

export default Welcome;
