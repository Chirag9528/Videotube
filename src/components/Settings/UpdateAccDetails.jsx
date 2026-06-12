import React, { useEffect, useState } from 'react'

function UpdateAccDetails(){
    const [email , setEmail] = useState("")
    const [fullName , setFullName] = useState("")
    const updateDetails = async (e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/users/update-account`,{
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials : "include",
                body : JSON.stringify({fullName : fullName , email :  email})
            })
            const data = await response.json()
            if (data.success){
                alert("Account Details Updated Successfully")
            }
        } catch (error) {
            console.log("Error: ",error)
            alert("Please Try Again")
        }
    }
    useEffect(()=>{
        const fetchuser = async ()=> {
            try {
                const response = await fetch(`${import.meta.env.VITE_HOSTNAME}/api/v1/users/current-user`,{
                    method : "GET" ,
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    credentials : "include"
                })
                .then(response => response.json())
                if (response.success){
                    setEmail(response.data.email)
                    setFullName(response.data.fullName)
                }
            } catch (error) {
                console.log("Error: " , error)
            }
        }
        fetchuser()
    },[])
    return (
    <div className="form-panel-wrapper">
        <div className="card vt-form-card mt-2">
            <h3 className='mt-2 mb-4'>Update Account Details</h3>
            <form>
                <div className="row mb-3">
                    <label htmlFor="updateEmail" className="col-12 col-sm-3 col-form-label text-sm-start">Email</label>
                    <div className="col-12 col-sm-9">
                    <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control bg-black text-white" id="updateEmail"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputFullName" className="col-12 col-sm-3 col-form-label text-sm-start">Full Name</label>
                    <div className="col-12 col-sm-9">
                    <input type="text" name="fullName" value={fullName} onChange={(e)=>{setFullName(e.target.value)}} className="form-control bg-black text-white" id="inputFullName"/>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <button onClick={updateDetails} className='btn btn-secondary btn-submit'>
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateAccDetails
