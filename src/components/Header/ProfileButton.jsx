import React, { useContext, useState} from "react";
import {useNavigate} from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import AuthContext from "../contexts/Auth/AuthContext";
import LoadingBarContext from "../contexts/LoadingBar/LoadingBar";

function ProfileButton(props){
  const {setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()

  const {setProgress} = useContext(LoadingBarContext)

  const logout = async ()=>{
    setProgress(20)
    const response = await fetch('http://localhost:8000/api/v1/users/logout' , {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      credentials : "include"
    })
    .then(response => response.json())
    .catch(error => console.log("Error: ",error))
    setProgress(50)
    if (response && response.success){
      localStorage.removeItem('avatar')
      setIsLoggedIn(false)
      props.setCredentials({email: "" , password : ""})
      navigate(0);
    }
    else{
      alert("Please try again!")
    }
    setProgress(100)

  }
  return (
    <div className="dropdown">
      <button
        className="btn btn-black d-flex align-items-center"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {/* Display the uploaded avatar or a default icon */}
        {props.avatar ? (
          <img
            src={props.avatar}
            alt="User Avatar"
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
        ) : (
          <CgProfile/>
        )}
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
        <li>
          <a className="dropdown-item" href="#">
            Update Account Details
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Update Avatar
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Update CoverImage
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Change Password
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item" onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
