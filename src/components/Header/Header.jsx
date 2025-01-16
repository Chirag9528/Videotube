import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import ProfileButton from './ProfileButton';
import { FaBars } from 'react-icons/fa';
import AuthContext from '../contexts/Auth/AuthContext';
function Header(props) {
  const {isloggedIn , setIsLoggedIn} = useContext(AuthContext)

  const [credentials , setCredentials] = useState({email:"", password:""});
  
  const [registercredentials , setRegisterCredentials] = useState({fullName:"" , email: "" , password:"" , username: "" , avatar: "" , coverImage: "" , confirmpassword: ""})

  const ref = useRef(null)
  const refClose = useRef(null)
  const registerref = useRef(null)
  const registerrefClose = useRef(null)
  
  const loginhandle = ()=>{
    ref.current.click()
  }
  
  const OnChange = (e)=>{
    setCredentials({...credentials , [e.target.name] : e.target.value})
  }
  
  const OnChangeRegister = (e)=>{
    setRegisterCredentials({...registercredentials , [e.target.name] : e.target.value})
  }

  const dologin = async (e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/v1/users/login',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({email : credentials.email , password : credentials.password})
    }).then(response => response.json())
    .catch(error => console.log("Error: ",error));
    
    if (response && response.success){
      refClose.current.click()
      setIsLoggedIn(true)
      localStorage.setItem('token',response.data.accessToken) 
      localStorage.setItem('avatar' , response.data.user.avatar)
    }
    else{
      alert("Invalid Credentials")
    }
    console.log(response)
  }
  
  useEffect(()=>{
    if (localStorage.getItem('token')){
      setIsLoggedIn(true)
    }
  },[setIsLoggedIn])

  const registerhandle = () => {
      registerref.current.click()
  }

  const doregister = async (e) => {
    e.preventDefault();

    if (registercredentials.password !== registercredentials.confirmpassword) {
        alert("Password and Confirm Password do not match");
        return;
    }

    try {
        // Prepare FormData
        const formData = new FormData();
        formData.set("email", registercredentials.email);
        formData.append("password", registercredentials.password);
        formData.append("fullName", registercredentials.fullName);
        formData.append("username", registercredentials.username);

        // Attach files (coverImage and avatar)
        if (registercredentials.avatar) {
            formData.append("avatar", registercredentials.avatar); // Avatar file
        }
        if (registercredentials.coverImage) {
            formData.append("coverImage", registercredentials.coverImage); // Cover image file
        }

        // Make the request
        const response = await fetch("http://localhost:8000/api/v1/users/register", {
            method: "POST",
            body: formData, // Send FormData directly
        });

        // Handle the response
        if (!response.ok) {
            console.error("Error:", response.status, response.statusText);
            alert(`Error: ${response.status} ${response.statusText}`);
            return;
        }

        const json = await response.json();
        if (json.success) {
            registerrefClose.current.click();
            alert("Registered Successfully! Kindly Login");
            ref.current.click();
        } else {
            alert(json.message || "Some Error Occurred! Try Again!!!");
        }
        console.log(json)
    } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again.");
    }
  };


  return (
    <>
        <nav className="navbar bg-black" style={{width : "100%"}}>
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
                <button className="btn btn-dark" onClick={registerhandle}> SignUp </button>
                <button className="btn btn-dark" onClick={loginhandle}> Login </button>
              </div>
            }
            {
              isloggedIn &&
              <div style={{display:'flex'}}>
                <button className="btn btn-dark" style={{height:'3rem'}}>
                  <GoPlus style={{fontSize:'1.5rem'}}/> Create
                </button>
                <ProfileButton avatar={localStorage.getItem('avatar')} setCredentials={setCredentials}/>
              </div>
            }
        </div>
        </nav>

        {/* Login Modal */}
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#loginModal">
        Launch demo modal
        </button>
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="loginModalLabel">VideoTube</h1>
                <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                  <div className="row mb-3">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-10">
                      <input type="email" value={credentials.email} onChange={OnChange} name="email" className="form-control" id="inputEmail"/>
                      </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                      <div className="col-sm-10">
                      <input type="password" value={credentials.password} onChange={OnChange} name="password" className="form-control" id="inputPassword"/>
                      </div>
                  </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={dologin}>Login</button>
            </div>
            </div>
        </div>
        </div>
        {/* Login Modal Ends here */}


        {/* Register Modal */}
        <button type="button" ref={registerref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#registerModal">
        Launch demo modal
        </button>
        <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">VideoTube</h1>
                <button type="button" ref={registerrefClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                  <div className="row mb-3">
                    <label htmlFor="FullName" className="col-sm-2 col-form-label">Fullname</label>
                      <div className="col-sm-10">
                      <input type="text" value={registercredentials.fullName} onChange={OnChangeRegister} name="fullName" className="form-control" id="FullName"/>
                      </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="UserName" className="col-sm-2 col-form-label">Username</label>
                      <div className="col-sm-10">
                      <input type="text" value={registercredentials.username} onChange={OnChangeRegister} name="username" className="form-control" id="UserName"/>
                      </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="avatar" className="col-sm-2 col-form-label">Avatar</label>
                      <div className="col-sm-10">
                      <input type="file"  onChange={(e) => setRegisterCredentials({ ...registercredentials,avatar: e.target.files[0]})} name="avatar" className="form-control" id="avatar"/>
                      </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="coverimage" className="col-sm-2 col-form-label">CoverImage</label>
                      <div className="col-sm-10">
                      <input type="file" onChange={(e) => setRegisterCredentials({ ...registercredentials,coverImage: e.target.files[0]})} name="coverImage" className="form-control" id="coverimage"/>
                      </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-10">
                      <input type="email" value={registercredentials.email} onChange={OnChangeRegister} name="email" className="form-control" id="inputEmail3"/>
                      </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                      <div className="col-sm-10">
                      <input type="password" value={registercredentials.password} onChange={OnChangeRegister} name="password" className="form-control" id="inputPassword3"/>
                      </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                      <div className="col-sm-10">
                      <input type="password" value={registercredentials.confirmpassword} onChange={OnChangeRegister} name="confirmpassword" className="form-control" id="confirmPassword"/>
                      </div>
                  </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={doregister}>Register</button>
            </div>
            </div>
        </div>
        </div>
        {/* Register Modal Ends here */}
    </>
    
  )
}

export default Header
