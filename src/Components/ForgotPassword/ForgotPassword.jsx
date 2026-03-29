import './ForgotPassword';
import { useRef, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from '../../Context/auth-context';
const ForgotPassword=()=>{

    //const navigate = useNavigate();
    const emailRef = useRef();
    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

     const submitHandler = async (event) => {
          event.preventDefault();

    const email = emailRef.current.value;

    setIsLoading(true);

    try {
      await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDer0CNCdLE9IfrOJPgDtKPWr64ijhZgqc",
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      );

      alert("Password reset link sent to your email ✅");

    } catch (error) {
      alert(
        error.response?.data?.error?.message || "Something went wrong"
      );
    }finally{
        setIsLoading(false);
    }

    
  };

    return(
        <section className='container'>
                <h3 style={{color:'black'}}>Enter the email which you have register..</h3>
                <form  onSubmit={submitHandler}>
            <div className="control">
                <input
                type='email'
                placeholder='Enter email'
                ref={emailRef}
                minLength='7'
                required
                />
                {!isLoading && <button>Send Link</button>}
                {isLoading && <p>Sending...</p>}
            </div>
            </form>
        </section>
    )
}

export default ForgotPassword;