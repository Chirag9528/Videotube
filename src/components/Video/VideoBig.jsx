import React, { useEffect, useRef, useState } from 'react'
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";

function VideoBig(props) {
    const [isSubscribed , setIsSubscribed] = useState(false)
    const [liked , setLiked] = useState(false)

    const videoRef = useRef(null)
    useEffect(()=>{
        videoRef.current.play()
    })

    const togglesubscription = async ()=>{
      try {
        const response = await fetch( `http://localhost:8000/api/v1/subscriptions/c/${props.obj.createdBy._id}` , {
          method : "POST",
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token')
          }
        })
        .then(response => response.json())
        
        if (response && response.success){
          setIsSubscribed(!isSubscribed)
        }
      } catch (error) {
        console.log("Error: ",error)
      }
    }

    const togglelike = async ()=>{
      try {
        const response = await fetch( `http://localhost:8000/api/v1/likes/toggle/v/${props.obj._id}` , {
          method : "POST",
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token')
          }
        })
        .then(response => response.json())
        
        if (response && response.success){
          setLiked(!liked)
        }
      } catch (error) {
        console.log("Error: ",error)
      }
    }

    useEffect(()=>{
      const checksubscription = async () => {
        try {
            const response = await fetch( `http://localhost:8000/api/v1/subscriptions/check/${props.obj.createdBy._id}` , {
              method : "GET",
              headers : {
                'Content-Type' : 'application/json',
                'Authorization' : localStorage.getItem('token')
              }
            })
            .then(response => response.json())
            
            if (response && response.success){
              if (response.data === true){
                setIsSubscribed(true)
              }else{
                setIsSubscribed(false)
              }

            }
        } catch (error) {
          console.log("Error: ",error)
        }
      };
      checksubscription()
    },[])

    useEffect(()=>{
      const checkLiked = async () => {
        try {
            const response = await fetch( `http://localhost:8000/api/v1/likes/checklike/v/${props.obj._id}` , {
              method : "GET",
              headers : {
                'Content-Type' : 'application/json',
                'Authorization' : localStorage.getItem('token')
              }
            })
            .then(response => response.json())
            
            if (response && response.success){
              if (response.data === true){
                setLiked(true)
              }else{
                setLiked(false)
              }
            }
            console.log(response)
        } catch (error) {
          console.log("Error: ",error)
        }
      };
      checkLiked()
    },[])

    

    return (
    <div className="card ms-4 p-0" style={{color:"white" , background: "rgb(0,0,0)"}}>
        <video
            ref={videoRef}
            style={{borderRadius : "15px" }}
            controls
        >
          <source src={props.obj.videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="card-body p-0 my-2">
          <div class="row g-0">
            <div class="col-md-2" style={{"display" : "flex" , "justify-content" : "center"}}>
              <img src={props.obj.createdBy.avatar} class="img-fluid rounded-circle" style={{height : "50px" , width: "50px" , objectFit : "cover" , borderRadius : "50%"}} width="60px" alt="..."/>
            </div>
            <div class="col-md-8" style={{display:"flex" , alignItems:"center"}}>
              <div class="col-md-4" style={{}}>
                <p class="card-text m-0 px-2 text-start">{props.obj.title}</p>
                <p class="card-text px-2 text-start" style={{color: "rgb(169 , 169 , 169)"}}>{props.obj.createdBy.username}</p>
              </div>
              <div class="" style={{}}>
                <button className={`btn ${isSubscribed? 'btn-dark' : 'btn-light'}`} onClick={togglesubscription}>{isSubscribed? "Subscribed" : "Subscribe"}</button>
              </div>
            </div>
            <div className="col-md-2" style={{display:"flex" , alignItems:"center" , justifyContent:"center"}}>
              {
                liked && <BiSolidLike style={{color:"white" ,fontSize:"2.5rem"}} onClick={togglelike}/>
              }
              {
                !liked && 
                <BiLike style={{color:"white" , fontSize:"2.5rem"}} onClick={togglelike}/>
              }
            </div>
        </div>
        </div>
    </div>
  )
}

export default VideoBig
