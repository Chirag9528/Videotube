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
        navigate(0) // to refresh the page
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
    <div style={{color : "white" , display : "flex" , flexDirection:"column" , justifyContent : "center" , alignItems : "center"}}>
        <div className="card mt-4" style={{backgroundColor : "black" , color :"white" , width:"40vw" , border:"2px solid white"}} >
            <h3 className='mt-2 mb-4'>Update Avatar</h3>
            <form  style={{display : "flex" , flexDirection:"column" , justifyContent : "center" , alignContent:"center"}}>
                <div className="row m-3" style={{}}>
                    <label htmlFor="updateavatar" className="col-sm-4 col-form-label" style={{textAlign:"left" , fontSize:"1.2rem"}}>Avatar</label>
                    <div className="col-sm-8">
                    <input type="file" onChange={(e)=>{setUpdatedAvatar(e.target.files[0])}} className="form-control" id="updateavatar"/>
                    </div>
                </div>
                <div className='row m-3' style={{display : "flex" , justifyContent:"center" , alignItems : "center"}}>
                    <button onClick={updateAvatar} className='btn btn-secondary' style={{width:"8vw"}}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateAvatar
