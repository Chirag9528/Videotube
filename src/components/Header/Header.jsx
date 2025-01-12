import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import ProfileButton from './ProfileButton';
import { FaBars } from 'react-icons/fa';
import AuthContext from '../contexts/Auth/AuthContext';
function Header(props) {
  const {isloggedIn , setIsLoggedIn} = useContext(AuthContext)

  const [credentials , setCredentials] = useState({email:"", password:""});
  const ref = useRef(null)
  const refClose = useRef(null)
  
  const loginhandle = ()=>{
    ref.current.click()
  }
  
  const OnChange = (e)=>{
    setCredentials({...credentials , [e.target.name] : e.target.value})
  }
  
  const dologin = async (e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/v1/users/login',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({email : credentials.email , password : credentials.password})
    });
    
    const json = await response.json()
    if (json.success){
      refClose.current.click()
      setIsLoggedIn(true)
      localStorage.setItem('token',json.data.accessToken) 
      localStorage.setItem('avatar' , json.data.user.avatar)
    }
    console.log(json)
  }
  
  useEffect(()=>{
    if (localStorage.getItem('token')){
      setIsLoggedIn(true)
    }
  },[setIsLoggedIn])

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
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">VideoTube</h1>
                <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                  <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-10">
                      <input type="email" value={credentials.email} onChange={OnChange} name="email" className="form-control" id="inputEmail3"/>
                      </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                      <div className="col-sm-10">
                      <input type="password" value={credentials.password} onChange={OnChange} name="password" className="form-control" id="inputPassword3"/>
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
    </>
    
  )
}

export default Header
