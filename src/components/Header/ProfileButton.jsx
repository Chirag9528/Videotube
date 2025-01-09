import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

function ProfileButton(props) {
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
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
          <a className="dropdown-item" href="#">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
