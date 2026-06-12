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
      const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/users/change-password`,{
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
        navigate(0)
        alert('Password Update Successfully')
      }
      else{
        alert('Old Password doesn\'t match')
      }
    }
  }

  return (
    <div className="form-panel-wrapper">
        <div className="card vt-form-card mt-2">
            <h3 className='mt-2 mb-4'>Change Password</h3>
            <form>
                <div className="row mb-3">
                    <label htmlFor="oldpassword" className="col-12 col-sm-5 col-form-label text-sm-start">Old Password</label>
                    <div className="col-12 col-sm-7">
                    <input type="password" value={oldpassword} onChange={(e)=>{setOldPassword(e.target.value)}} className="form-control bg-black text-white" id="oldpassword"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="updatepassword" className="col-12 col-sm-5 col-form-label text-sm-start">New Password</label>
                    <div className="col-12 col-sm-7">
                    <input type="password" value={newpassword} onChange={(e)=>{setNewPassword(e.target.value)}} className="form-control bg-black text-white" id="updatepassword"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="updaterepassword" className="col-12 col-sm-5 col-form-label text-sm-start">Confirm Password</label>
                    <div className="col-12 col-sm-7">
                    <input type="password" value={repassword} onChange={(e)=>{setRePassword(e.target.value)}}  className="form-control bg-black text-white" id="updaterepassword"/>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <button onClick={updatepassword} className='btn btn-secondary btn-submit'>
                        Change
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePassword
