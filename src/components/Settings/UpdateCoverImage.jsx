import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UpdateCoverImage(){
  const [updatedcoverImage , setUpdatedCoverImage] = useState("")
  const navigate = useNavigate()
  
  const updateImage = async (e)=>{
    e.preventDefault()
    const formData = new FormData()
    if (updatedcoverImage){
      formData.append('coverImage' , updatedcoverImage)

      const response = await fetch('http://localhost:8000/api/v1/users/cover-image',{
        method : 'PATCH',
        body : formData,
        credentials : "include"
      })
      .then(response => response.json())
      .catch(error => console.log(error))

      if (response && response.success){
        alert('coverImage Updated Successfully')
        navigate(0) // to refresh the page
      }
      else{
        alert('Please Try Again')
      }
    }
    else{
      alert("CoverImage Can't be empty")
    }
  }

  return (
    <div style={{color : "white" , display : "flex" , flexDirection:"column" , justifyContent : "center" , alignItems : "center"}}>
        <div className="card mt-4" style={{backgroundColor : "black" , color :"white" , width:"40vw" , border:"2px solid white"}} >
            <h3 className='mt-2 mb-4'>Update CoverImage</h3>
            <form  style={{display : "flex" , flexDirection:"column" , justifyContent : "center" , alignContent:"center"}}>
                <div className="row m-3" style={{}}>
                    <label htmlFor="updatecoverImage" className="col-sm-4 col-form-label" style={{textAlign:"left" , fontSize:"1.2rem"}}>CoverImage</label>
                    <div className="col-sm-8">
                    <input type="file" onChange={(e)=>{setUpdatedCoverImage(e.target.files[0])}} className="form-control" id="updatecoverImage"/>
                    </div>
                </div>
                <div className='row m-3' style={{display : "flex" , justifyContent:"center" , alignItems : "center"}}>
                    <button onClick={updateImage} className='btn btn-secondary' style={{width:"8vw"}}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateCoverImage
