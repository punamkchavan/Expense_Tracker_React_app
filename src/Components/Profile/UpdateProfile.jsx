import './UpdateProfile.css';
import { useRef } from "react";
import axios from "axios";

const UpdateProfile=()=>{

    const nameRef = useRef();
  const photoRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredPhoto = photoRef.current.value;

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDer0CNCdLE9IfrOJPgDtKPWr64ijhZgqc",
      {
        idToken: token,
        displayName: enteredName,
        photoUrl: enteredPhoto,
        returnSecureToken: true
      }
    )
    .then((response)=>{
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
        <input type="text" placeholder="Enter Name" ref={nameRef} />
      </div>

      <div className="field">
        <label>🌐 Profile Photo URL</label>
        <input type="text" placeholder="Enter URL"  ref={photoRef}/>
      </div>

    </div>

    <button className="update-btn">Update</button>

  </form>

  <hr />

</section>
    )

}
export default UpdateProfile;