import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UpdateAvatar() {
  const [updatedavatar , setUpdatedAvatar] = useState("")
  const navigate = useNavigate()
  
  const updateAvatar = async (e)=>{
    e.preventDefault()
    const formData = new FormData()
    if (updatedavatar){
      formData.append('avatar' , updatedavatar)

      const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/users/avatar`,{
        method : 'PATCH',
        body : formData,
        credentials : "include"
      })
      .then(response => response.json())
      .catch(error => console.log(error))

      if (response && response.success){
        localStorage.setItem('avatar' , response.data.avatar)
        alert('Avatar Updated Successfully')
        navigate(0)
      }
      else{
        alert('Please Try Again')
      }
    }
    else{
      alert("Avatar Can't be empty")
    }
  }
  return (
    <div className="form-panel-wrapper">
        <div className="card vt-form-card mt-2">
            <h3 className='mt-2 mb-4'>Update Avatar</h3>
            <form>
                <div className="row mb-3">
                    <label htmlFor="updateavatar" className="col-12 col-sm-4 col-form-label text-sm-start">Avatar</label>
                    <div className="col-12 col-sm-8">
                    <input type="file" onChange={(e)=>{setUpdatedAvatar(e.target.files[0])}} className="form-control bg-black text-white" id="updateavatar"/>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <button onClick={updateAvatar} className='btn btn-secondary btn-submit'>
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateAvatar
