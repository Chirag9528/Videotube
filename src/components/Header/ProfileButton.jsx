import React, { useContext, useState} from "react";
import {useNavigate} from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import AuthContext from "../../contexts/Auth/AuthContext";
import LoadingBarContext from "../../contexts/LoadingBar/LoadingBar";

function ProfileButton(props){
  const {setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()

  const {setProgress} = useContext(LoadingBarContext)

  const logout = async ()=>{
    setProgress(20)
    const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/users/logout` , {
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

  const updateaccountdetails = ()=>{
    navigate("/settings/updateaccountdetails")
  }

  const changepassword = ()=>{
    navigate("/settings/changepassword")
  }

  const updateavatar = ()=>{
    navigate("/settings/updateavatar")
  }

  const updatecoverimage = ()=>{
    navigate("/settings/updatecoverimage")
  }

  return (
    <div className="dropdown">
      <button
        className="btn vt-btn-ghost d-flex align-items-center p-1"
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
      <ul className="dropdown-menu dropdown-menu-end vt-dropdown" aria-labelledby="dropdownMenuButton">
        <li>
          <button className="dropdown-item" onClick={updateaccountdetails}>
            Update Account Details
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={updateavatar}>
            Update Avatar
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={updatecoverimage}>
            Update CoverImage
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={changepassword}>
            Change Password
          </button>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
