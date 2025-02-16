import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ChangePassword(){
  const [oldpassword , setOldPassword] = useState("")
  const [newpassword , setNewPassword] = useState("")
  const [repassword , setRePassword] = useState("")
  const navigate = useNavigate()

  const updatepassword = async (e)=>{
    e.preventDefault();
    if (repassword !== newpassword){
      alert("Password and Confirm Password do not match");
    }
    else{
      const response = await fetch('http://localhost:8000/api/v1/users/change-password',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({oldPassword : oldpassword , newPassword : newpassword}),
        credentials : "include"
      })
      .then(response => response.json())
      .catch(error => console.log(error))

      if (response && response.success){
        navigate(0) // to refresh page
        alert('Password Update Successfully')
      }
      else{
        alert('Old Password doesn\'t match')
      }
    }
  }

  return (
    <div style={{color : "white" , display : "flex" , flexDirection:"column" , justifyContent : "center" , alignItems : "center"}}>
        <div className="card mt-4" style={{backgroundColor : "black" , color :"white" , width:"40vw" , border:"2px solid white"}} >
            <h3 className='mt-2 mb-4'>Change Password</h3>
            <form  style={{display : "flex" , flexDirection:"column" , justifyContent : "center" , alignContent:"center"}}>
                <div className="row m-3" style={{}}>
                    <label htmlFor="oldpassword" className="col-sm-5 col-form-label" style={{textAlign:"left" , fontSize:"1.2rem"}}>Old Password</label>
                    <div className="col-sm-7">
                    <input type="password" value={oldpassword} onChange={(e)=>{setOldPassword(e.target.value)}} className="form-control" id="oldpassword"/>
                    </div>
                </div>
                <div className="row m-3" style={{}}>
                    <label htmlFor="updatepassword" className="col-sm-5 col-form-label" style={{textAlign:"left" , fontSize:"1.2rem"}}>New Password</label>
                    <div className="col-sm-7">
                    <input type="password" value={newpassword} onChange={(e)=>{setNewPassword(e.target.value)}} className="form-control" id="updatepassword"/>
                    </div>
                </div>
                <div className="row m-3" style={{}}>
                    <label htmlFor="updaterepassword" className="col-sm-5 col-form-label" style={{textAlign:"left" , fontSize:"1.2rem"}}>Confirm Password</label>
                    <div className="col-sm-7">
                    <input type="password" value={repassword} onChange={(e)=>{setRePassword(e.target.value)}}  className="form-control" id="updaterepassword"/>
                    </div>
                </div>
                <div className='row m-3' style={{display : "flex" , justifyContent:"center" , alignItems : "center"}}>
                    <button onClick={updatepassword} className='btn btn-secondary' style={{width:"8vw"}}>
                        Change
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePassword
