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
    <div style={{color : "white" , display : "flex" , flexDirection:"column" , justifyContent : "center" , alignItems : "center"}}>
        <div className="card mt-4" style={{backgroundColor : "black" , color :"white" , width:"40vw" , border:"2px solid white"}} >
            <h3 className='mt-2 mb-4'>Update Account Details</h3>
            <form  style={{display : "flex" , flexDirection:"column" , justifyContent : "center" , alignContent:"center"}}>
                <div className="row m-3" style={{}}>
                    <label htmlFor="updateEmail" className="col-sm-3 col-form-label" style={{textAlign:"left" , fontSize:"1.2rem"}}>Email</label>
                    <div className="col-sm-9">
                    <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" id="updateEmail"/>
                    </div>
                </div>
                <div className="row m-3" style={{}}>
                    <label htmlFor="inputFullName" className="col-sm-3 col-form-label" style={{textAlign:"left" , fontSize:"1.2rem"}}>Full Name</label>
                    <div className="col-sm-9">
                    <input type="text" name="fullName" value={fullName} onChange={(e)=>{setFullName(e.target.value)}} className="form-control" id="inputFullName"/>
                    </div>
                </div>
                <div className='row m-3' style={{display : "flex" , justifyContent:"center" , alignItems : "center"}}>
                    <button onClick={updateDetails} className='btn btn-secondary' style={{width:"8vw"}}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateAccDetails
