import { Link } from "react-router-dom";

const Welcome =()=>{
    return(
    <>
    <h1>Welcome to Expense Tracker</h1>
    <p>Your profile is incomplete.</p>
      <Link to="/profile">
        <button>Complete Profile</button>
      </Link>
    </>
    )
}

export default Welcome;
