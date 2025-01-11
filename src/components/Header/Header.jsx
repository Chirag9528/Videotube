import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import ProfileButton from './ProfileButton';
import { FaBars } from 'react-icons/fa';
function Header(props) {
  const [isloggedIn , setisloggedIn] = useState(true)
  return (
    <>
        <nav className="navbar bg-black">
        <div className="container-fluid" style={{display:'flex'}}>
            <div style={{display:"flex"}}>
              <div className="top_section" style={{marginRight:"10px"}}>
                  <FaBars onClick={props.togglefxn}/>
              </div>
              <a className="navbar-brand text-light fs-2">VideoTube</a>
            </div>
            <form className="d-flex" style={{flex:1,width:'100%',maxWidth:'50%'}} role="search">
            <input className="form-control me-2 bg-black text-light"  type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-dark" type="submit">
              <IoIosSearch style={{fontSize:'1.5rem'}}/>
            </button>
            </form>
            {
              !isloggedIn &&
              <div>
                <button className="btn btn-dark"> SignUp </button>
                <button className="btn btn-dark"> Login </button>
              </div>
            }
            {
              isloggedIn &&
              <div style={{display:'flex'}}>
                <button className="btn btn-dark" style={{height:'3rem'}}>
                  <GoPlus style={{fontSize:'1.5rem'}}/> Create
                </button>
                <ProfileButton avatar={"https://res.cloudinary.com/harharmahadev/image/upload/v1734514427/r7vi1vjbbryxezk2rjbm.jpg"}/>
              </div>
            }
        </div>
        </nav>
    </>
    
  )
}

export default Header
