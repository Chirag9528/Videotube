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

      const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/users/cover-image`,{
        method : 'PATCH',
        body : formData,
        credentials : "include"
      })
      .then(response => response.json())
      .catch(error => console.log(error))

      if (response && response.success){
        alert('coverImage Updated Successfully')
        navigate(0)
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
    <div className="form-panel-wrapper">
        <div className="card vt-form-card mt-2">
            <h3 className='mt-2 mb-4'>Update CoverImage</h3>
            <form>
                <div className="row mb-3">
                    <label htmlFor="updatecoverImage" className="col-12 col-sm-4 col-form-label text-sm-start">CoverImage</label>
                    <div className="col-12 col-sm-8">
                    <input type="file" onChange={(e)=>{setUpdatedCoverImage(e.target.files[0])}} className="form-control bg-black text-white" id="updatecoverImage"/>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <button onClick={updateImage} className='btn btn-secondary btn-submit'>
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateCoverImage
