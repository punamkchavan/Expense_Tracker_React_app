import './UpdateProfile.css';
import { useRef, useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from '../../Context/auth-context';

const UpdateProfile=()=>{
    const authCtx = useContext(AuthContext);


    const nameRef = useRef();
  const photoRef = useRef();
   
  const [name, setName] = useState("");
const [photo, setPhoto] = useState("");

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDer0CNCdLE9IfrOJPgDtKPWr64ijhZgqc",
        {
          idToken: authCtx.token,
        }
      );

      const user = response.data.users[0];

      setName(user.displayName || "");
      setPhoto(user.photoUrl || "");

    } catch (error) {
      console.log(error);
    }
  };

  if (authCtx.token) {
    fetchProfile();
  }

}, [authCtx.token]);

  const submitHandler = (event) => {
    event.preventDefault()

    
    axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDer0CNCdLE9IfrOJPgDtKPWr64ijhZgqc",
      {
        idToken: authCtx.token,
        displayName:name,
        photoUrl:photo,
        returnSecureToken: true
      }
    )
    .then(()=>{
      console.log("Profile updated successfully");
    })
    .catch((error)=>{
      alert(error.message);
    });
};


    return(
   <section className="profile-page">
  <div className="top-bar">
    <p>Winners never quite, Quitters never win.</p>

    <div className="profile-progress">
      Your profile is 64% completed. A complete profile has higher chances of landing a job.
      <span>Complete now</span>
    </div>
  </div>

  <hr />

  <div className="contact-header">
    <h2>Contact Details</h2>
    <button className="cancel-btn">Cancel</button>
  </div>

  <form className="contact-form" onSubmit={submitHandler}>

    <div className="input-group">

      <div className="field">
        <label>👤 Full Name:</label>
        <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>🌐 Profile Photo URL</label>
        <input type="text" placeholder="Enter URL" value={photo}  onChange={(e) => setPhoto(e.target.value)}/>
      </div>

    </div>

    <button className="update-btn">Update</button>

  </form>

  <hr />

</section>
    )

}
export default UpdateProfile;