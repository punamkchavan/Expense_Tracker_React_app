import { useState, useRef, useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import './SignUpForm.css';
import AuthContext from '../../Context/auth-context';

const SignUpForm= ()=>{

    const navigate = useNavigate();

    const authCtx= useContext(AuthContext)

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const [isSignUp, setIsSignUp] = useState(true);
    const [isLoding, setIsLoding] = useState(false);

    const switchModeHandler = () => {
          setIsSignUp((prevState) => !prevState);
            };

    const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current?.value;

     if(isSignUp && enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoding(true);
    let url;

    if (isSignUp) {
      url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDer0CNCdLE9IfrOJPgDtKPWr64ijhZgqc";
        
    } else {
      url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDer0CNCdLE9IfrOJPgDtKPWr64ijhZgqc";
    }

    axios
      .post(url, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      })
      .then((response) => {
      const token = response.data.idToken;
      authCtx.login(token);   
      navigate("/Welcome")
     })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error?.message || "Authentication failed!";
        alert(errorMessage);
      })
      .finally(() => {
        setIsLoding(false);
      });
  };

    

    return(
        <section className='container'>
            <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
            <form onSubmit={submitHandler}>
                <div className='control'>
                    <input 
                    type='email' 
                    placeholder='Enter Email'
                    ref={emailInputRef}  
                    required/>
                </div>
                <div className='control'>
                    <input 
                    type='password' 
                    placeholder='Enter Password'
                    ref={passwordInputRef}
                    required/>
                </div>
                <div className='control'>
                    {isSignUp &&
                    <input 
                    type='password'
                    placeholder='Confirm Password'
                    ref={confirmPasswordInputRef}
                    required/>
                    }
                </div>
                <div>
               </div>
                <div className='action'>
                    {!isLoding && <button type='submit'>{isSignUp ? 'Submit':'Login'}</button>}
                    {!isSignUp && <Link to="/forgotpassword">Forgot Password</Link>}
                    {isLoding &&<p>Sending Request...</p>}
                    <button type='button' onClick={switchModeHandler}>
                    {isSignUp ? 'Already have account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>  
            </form>
        </section>
    )
}
export default SignUpForm;